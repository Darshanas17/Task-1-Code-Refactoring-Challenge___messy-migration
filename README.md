# User Management System API

A secure, modular RESTful API for managing users, built with Node.js, Express, SQLite, and JWT authentication.

## Features

- User registration and login with hashed passwords
- JWT-based authentication for protected routes
- Input validation for user data
- Centralized error handling
- Rate limiting and HTTP security headers
- Modular code structure (controllers, routes, middleware, validators)
- SQLite database with initialization script

## Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- npm

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/Darshanas17/Task-1-Code-Refactoring-Challenge___messy-migration.git
   cd messy-migration-(task-1-code-refactoring-challenge)
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:

   ```
   PORT=5000
   JWT_SECRET=your_jwt_secret
   JWT_EXPIRES_IN=1h
   SALT_ROUNDS=10
   NODE_ENV=development
   ```

4. Initialize the database with sample users:
   ```sh
   node init-db.js
   ```

### Running the Server

```sh
node server.js
```

The API will be available at `http://localhost:5000/`.

## API Endpoints

### Public

- `POST /users` — Register a new user
- `POST /users/login` — Login and receive JWT token

### Protected (require JWT in `Authorization: Bearer <token>` header)

- `GET /users` — List all users
- `GET /users/:id` — Get user by ID
- `PUT /users/:id` — Update user name or email
- `DELETE /users/:id` — Delete user
- `GET /users/search/name?name=<query>` — Search users by name

## Project Structure

- `controllers/` — Route handlers
- `routes/` — Express route definitions
- `middleware/` — Auth and error handling
- `validators/` — Input validation
- `db.js` — Database connection
- `init-db.js` — DB initialization script

## Security

- Passwords are hashed using bcrypt
- All sensitive config in `.env`
- JWT authentication for protected routes
- Rate limiting and secure HTTP headers
