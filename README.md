# Frogmi technical test

[![Slide1.jpg](https://i.postimg.cc/C53b1CLK/Slide1.jpg)](https://postimg.cc/wRk14mNK)

This project is a fullstack web application built whit:
- Sinatra 
- React

## Requirements

Before you begin, ensure you have met the following requirements:
- [Node.js](https://nodejs.org) installed.
- [Ruby](https://www.ruby-lang.org/) installed.
- [Visual Studio Code](https://code.visualstudio.com) with SQLite Viewer extension installed if you want to check the database.

## How to Run Locally

To run this project locally, follow these steps:

1. Clone the repository to your local machine:

    ```bash
    git clone https://github.com/AndreaTamara/frogmi-test
    ```

2. **Configure Backend**

    2.1. Navigate to the backend folder:

    ```bash
    cd frogmi-test/earthquake_backend
    ```

    2.2. Install dependencies:

    ```bash
    bundle install
    ```

    2.3. Migrate the database:

    ```bash
    bundle exec rake db:migrate
    ```

    2.4. Run task to obtain the data and populate the database:

    ```bash
    rake data:get_earthquake_data
    ```

    2.5. Start the Sinatra server:

    ```bash
    rackup
    ```

    Now you should have your server running in port:9292

3. **Configure Frontend**

    3.1. In a new terminal window, navigate to the frontend folder:

    ```bash
    cd frogmi-test/earthquake_frontend
    ```

    3.2. Install dependencies:

    ```bash
    npm install
    ``` 
    3.3. Start the React development server:

    ```bash
    npm run dev
    ```

4. Open your web browser and go to  http://localhost:5173/ to view the application.


