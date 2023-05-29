# movie-db

## How to run the project

- Make sure that you have installed postgresql and nodejs in your system.

- Go to the backend directory 

- Create a .env file with the following fields:

    - PORT=3001 (make sure that this port is not in use to run the project)

    - DB_HOST="localhost"

    - DB_USER=*your-choice-of-username-for-postgres*

    - DB_PASSWORD=*your-choice-of-password-for-postgres*

    - DB_PORT=*your-choice-of-port-for-postgres* (make sure to select an unused port, we have used 5432)

    - DB_NAME=*your-choice-of-database-name-for-postgres* (we have used movies)

    - BASE_URL="api"

    - SECRET_KEY="F7DD3C04D6F486CE4C4962D97141487660F7B817D704C9BC8B86D4C0319D526F"

- Log in into postgre shell (sudo -u postgres psql in linux / postgres -U psql in windows)

- CREATE USER *username-you-have-chosen-previously* WITH PASSWORD *password-you-have-chosen-previously*;

- ALTER USER *username-you-have-chosen-previously* CREATEDB;

- CREATE DATABASE *username-you-have-chosen-previously* OWNER *username-you-have-chosen-previously*;

- \q (to quit)

- Now try logging in to make sure database and user created successfully

- psql *username-you-have-chosen-previously* *username-you-have-chosen-previously*

- In this step if you have encountered a peer authentication problem in linux it may be caused because of postgres configuration.
In such a case check the end of your /var/lib/pgsql/data/pg_hba.conf file, the authentication method should be md5 instead of peer.

- If you have logged in successfully postgres setup is now complete exit with \q

- Run npm i

- Run node app.js & (& is for running it in the background, alternatively you can use another temrinal after starting the backend)

- Go to frontend directory (cd ../frontend)

- Run npm i again

- Run npm start

- The frontend will open in you default browser in a second

## How to add the initial data 

- There are no functions to add manager, genre and platform in the UI

- To add these you can still use the backend api.

- To add manager use http://localhost:3001/api/manager/add_manager with body fields db_name and password

- To add platforms first login as a manager from http://localhost:3001/api/user/db_login with body fields db_name and password

- Then use http://localhost:3001/api/manager/add_platform with header authorization=*token-you-got-from-the-response-of-login* and body fields platform_id and platform_name

- To add genres first login as a director from http://localhost:3001/api/user/login with body fields username and password

- Then use http://localhost:3001/api/director/add_genre with header authorization=*token-you-got-from-the-response-of-login* and body fields genre_name and genre_id

- For all other data input you can use the UI.
