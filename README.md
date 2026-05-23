# Node.js Authentication System

Secure authentication system built with Node.js, Express.js, MongoDB, JWT, and OTP email verification.

---

## Features

- User Registration
- Email OTP Verification
- Resend OTP
- User Login
- JWT Authentication
- Access & Refresh Tokens
- HTTP Only Cookie Authentication
- Forgot Password
- Change Password
- MongoDB Database
- Nodemailer Email Service

---

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- Nodemailer

---

## Installation

```bash
git clone <https://github.com/aminharoon/nodejs-auth-system.git>
cd nodejs-auth-system
npm install
```

---

## Environment Variables

Create a `.env` file in the root directory:

```env
PORT=5000

MONGO_URI=

JWT_SECRET=
JWT_REFRESH_SECRET=

EMAIL_USER=

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_REFRESH_TOKEN=
```

---

## Run Server

Development mode:

```bash
npm run dev
```

Production mode:

```bash
npm start
```

---

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

### Login User

```http
POST /api/auth/login
```

### Forgot Password

```http
POST /api/auth/forget-password
```

### Change Password

```http
POST /api/auth/change-password
```

---

## Authentication Flow

1. User registers
2. OTP sent to email
3. User verifies OTP
4. User logs in
5. Access & Refresh tokens generated
6. Tokens stored in HTTP-only cookies

---

## Security Features

- Password Hashing
- JWT Authentication
- HTTP-only Cookies
- OTP Expiration
- Protected Password Change
- Email Verification

---

## Upcoming Features

- Google OAuth
- Refresh Token Rotation
- Rate Limiting
- Two Factor Authentication (2FA)
- Docker Deployment
- Role Based Authorization

---

## Author

Haroon Amin
