# FSO-Relaatiotietokannat

Backend for managing users and blogs, built with JavaScript using the Sequelize library and a PostgreSQL database. The database can be run via Docker Compose.

After cloning the repository you can use the backend with following instructions

# Running the database

PostgreSQL can be started by running `docker compose up -d` in the project root.  
**Note:** Docker must be installed (Docker Desktop on Windows/macOS or Docker Engine on Linux).

# Running the backend and seeding it with dummy data

In the project root run:

`npm install` # to install necessary dependencies 

`npm start` # to start the server

`npm run seed` # Seed the database with demo users and blogs 

After seeding, you can view the added data at:
- Users: http://localhost:3001/api/users
- Blogs: http://localhost:3001/api/blogs

