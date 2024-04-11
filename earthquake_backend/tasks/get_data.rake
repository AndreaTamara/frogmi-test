require 'rest-client'
require 'json'
require_relative '../models/feature'

namespace :data do
  desc 'get earthquake data of past 30 days from USGS'
  task :get_earthquake_data do
    url = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson'

    begin
      response = RestClient.get(url)
      json_data = JSON.parse(response.body)

      features = json_data['features']

      features.each do |feature|
        properties = feature['properties']

        id = feature['id']
        magnitude = properties['mag']
        place = properties['place']
        time = properties['time']
        url = properties['url']
        tsunami = properties['tsunami']
        mag_type = properties['magType']
        title = properties['title']
        coordinates = feature['geometry']['coordinates']
        longitude = coordinates[0]
        latitude = coordinates[1]

        Feature.create(
          external_id: id,
          magnitude: magnitude,
          place: place,
          time: time,
          external_url: url,
          tsunami: tsunami,
          mag_type: mag_type,
          title: title,
          longitude: longitude,
          latitude: latitude
        )
      end

      puts 'Earthquake data successfully obtained and saved'

    rescue RestClient::ExceptionWithResponse => e
      puts "Error getting data: #{e.response}"
    rescue StandardError => e
      puts "Error: #{e.message}"
    end
  end
end
