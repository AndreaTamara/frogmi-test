require 'sinatra'
require 'sinatra/reloader'
require 'sinatra/activerecord'
require_relative 'models/feature'
require_relative 'models/comment'

before do
    headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS'
    headers['Access-Control-Allow-Origin'] = '*'
    headers['Access-Control-Allow-Headers'] = 'accept, authorization, origin'
end

options '*' do
    response.headers['Allow'] = 'HEAD,GET,PUT,DELETE,OPTIONS,POST'
    response.headers['Access-Control-Allow-Headers'] =
      'X-Requested-With, X-HTTP-Method-Override, Content-Type, Cache-Control, Accept'
end

get '/api/features' do
    content_type :json

    if params['mag_type']
      mag_types = params['mag_type'].split(',').select do |type|
        %w[md ml ms mw me mi mb mlg].include?(type)
      end
    end
    page = params['page'].to_i.positive? ? params['page'].to_i : 1
    per_page = params['per_page'].to_i
    per_page = per_page > 1000 ? 1000 : per_page
    per_page = per_page.positive? ? per_page : 10

    features = Feature.all
    features = features.where(mag_type: mag_types) if mag_types
    features = features.paginate(page: page, per_page: per_page)
  
    {
      data: features.map do |feature|
        {
          id: feature.id,
          type: 'feature',
          attributes: {
            external_id: feature.external_id,
            magnitude: feature.magnitude,
            place: feature.place,
            time: feature.time,
            tsunami: feature.tsunami,
            mag_type: feature.mag_type,
            title: feature.title,
            coordinates: {
              longitude: feature.longitude,
              latitude: feature.latitude
            }
          },
          links: {
            external_url: feature.external_url
          }
        }
      end,
      pagination: {
      current_page: features.current_page,
      total: features.total_entries,
      per_page: features.per_page
    }
    }.to_json
end

post '/api/features/:feature_id/comments' do
    content_type :json
  
    feature_id = params[:feature_id]
  
    request_body = JSON.parse(request.body.read)
    body = request_body['body']
  
    if body.nil?
      status 400
      return { error: 'Missing body parameter' }.to_json
    end
  
    feature = Feature.find_by(id: feature_id)
  
    if feature.nil?
      status 404
      return { error: 'Feature not found' }.to_json
    end
  
    comment = Comment.create(feature_id: feature_id, body: body)
  
    if comment.valid?
      status 201
      return { message: 'Comment created successfully' }.to_json
    else
      status 422
      return { error: "Failed to create comment. #{comment.errors.full_messages[0]}"}.to_json
    end
end

get '/api/features/:feature_id/comments' do
    content_type :json
  
    feature = Feature.find(params[:feature_id])
  
    if feature
      comments = feature.comments
      {
        data: comments.map do |comment|
          {
            id: comment.id,
            type: 'comment',
            body: comment.body,
            created_at: comment.created_at,
            updated_at: comment.updated_at
          }
        end
      }.to_json
    else
      status 404
      { error: 'Feature not found' }.to_json
    end
end