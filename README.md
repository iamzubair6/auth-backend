# Project Documentation

## Overview

This project is an authentication backend built with Node.js, Express, and Prisma. It provides user authentication functionalities, including token generation and verification using JWT (JSON Web Tokens).

## Project Structure

```
.env
.gitignore
package.json
prisma/
    migrations/
        20240916170528_init/
            migration.sql
        migration_lock.toml
    schema.prisma
src/
    controllers/
        authcontroller.js
    middlewares/
        authenticateToken.js
    routes/
        authRoutes.js
    server.js
    utils/
        tokenUtils.js
```

### Key Files and Directories

- **.env**: Contains environment variables such as database connection strings and JWT secrets.
- **.gitignore**: Specifies files and directories to be ignored by Git.
- **package.json**: Lists project dependencies and scripts.
- **prisma/**: Contains Prisma schema and migration files.
- **src/**: Contains the source code for the application.

### Environment Variables

The `.env` file contains the following environment variables:

```
DATABASE_URL="postgresql://postgres:zubair123@localhost:5432/auth_db"
JWT_ACCESS_SECRET="VjA6a8b4dXrJZ+4d3Yd1$2k5&3L7f9%M@T5m^E8Z#1J6qR^d9p!K+0s"
JWT_REFRESH_SECRET="G3aL6vQ!8m0Tz%5r9x&1\*J7V2@k+3D6^B^8yR!4W9p2+1X$5K6l7Z"
ACCESS_TOKEN_EXPIRY="10m" # 10 minutes
REFRESH_TOKEN_EXPIRY="7d" # 7 days
PORT=5000
```

### Scripts

The `package.json` file defines the following scripts:

- **start**: Starts the server.
- **dev**: Starts the server with nodemon for development.

### Database

The project uses PostgreSQL as the database. The Prisma schema is defined in `prisma/schema.prisma`:

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  username  String   @unique
  password  String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

### JWT Token Utilities

The `src/utils/tokenUtils.js` file contains utility functions for generating and verifying JWT tokens:

```javascript
const jwt = require("jsonwebtoken");

const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;

const generateAccessToken = (user) => {
  return jwt.sign(user, JWT_ACCESS_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
  });
};

const generateRefreshToken = (user) => {
  return jwt.sign(user, JWT_REFRESH_SECRET, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
  });
};

const verifyAccessToken = (token) => {
  return jwt.verify(token, JWT_ACCESS_SECRET);
};

const verifyRefreshToken = (token) => {
  return jwt.verify(token, JWT_REFRESH_SECRET);
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
};
```

### Running the Project

Install dependencies:

```sh
yarn install
```

Start the server:

```sh
yarn start
```

or

```sh
npm run start
```

For development, use:

```sh
yarn dev
```

or

```sh
npm run dev
```

### Migrations

Prisma migrations are stored in the `prisma/migrations/` directory. To apply migrations, use:

```sh
npx prisma migrate deploy
```

### License

This project is licensed under the MIT License. See the LICENSE file for details.
