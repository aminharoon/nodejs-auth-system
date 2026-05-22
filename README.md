# Node.js Auth System

Authentication system built with Node.js, Express, MongoDB, and JWT.

## Features

- User Registration
- Email OTP Verification
- Resend OTP
- JWT Authentication
- MongoDB Database
- Nodemailer Email Service

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- Nodemailer

## Installation

```bash
git clone <repo-url>
cd nodejs-auth-system
npm install
```

## Environment Variables

Create a `.env` file:

```env
PORT=5000

MONGO_URI=

JWT_SECRET=

EMAIL_USER=

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_REFRESH_TOKEN=
```

## Run Server

```bash
npm run dev
```

## API Endpoints

### Register User

```http
POST /api/auth/register
```

### Verify Email OTP

```http
POST /api/auth/verify-email
```

### Resend OTP

```http
POST /api/auth/resend-otp
```

## Upcoming Features

- Login
- Forgot Password
- Reset Password
- Refresh Token
- Protected Routes

## Author

Haroon Amin
