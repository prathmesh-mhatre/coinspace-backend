# Coinspace Backend

A Node.js backend API built with Express.js and PostgreSQL.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env` file in the root directory and add the following variables:
   ```
   PORT=3000
   NODE_ENV=development
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=coinspace_db
   DB_USER=postgres
   DB_PASSWORD=your_password_here
   ```

3. Create the PostgreSQL database:
   ```sql
   CREATE DATABASE coinspace_db;
   ```

4. Start the server:
   ```bash
   npm start
   ```

## Features

- Express.js server with middleware setup
- PostgreSQL database connection
- Environment variable configuration
- Basic error handling
- Security middleware (helmet, cors)
- Request logging (morgan)

## Tech Stack

- Node.js
- Express.js
- PostgreSQL
- pg (PostgreSQL client)
- dotenv
- cors
- helmet
- morgan
