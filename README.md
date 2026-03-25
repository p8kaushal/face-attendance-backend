# FaceTrack

A modern, minimal face attendance tracking system with social authentication and PostgreSQL storage.

## Features

- Face recognition attendance (check-in/check-out)
- Google & GitHub OAuth authentication
- Admin-only user registration
- Attendance history with export
- Modern, responsive UI

## Tech Stack

- **Frontend**: Vanilla JS, face-api.js (browser-based face recognition)
- **Backend**: Node.js, Express, Passport.js
- **Database**: PostgreSQL
- **Auth**: Google OAuth & GitHub OAuth

## Setup

### 1. Database (PostgreSQL)

Create a free PostgreSQL database at [Neon](https://neon.tech) or [Supabase](https://supabase.com).

### 2. OAuth Apps

**Google:**
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. APIs & Services → Credentials → Create OAuth Client ID
3. Authorized origins: `http://localhost:3001`
4. Redirect URI: `http://localhost:3000/auth/google/callback`

**GitHub:**
1. Go to GitHub Settings → Developer settings → OAuth Apps
2. Homepage URL: `http://localhost:3001`
3. Callback URL: `http://localhost:3000/auth/github/callback`

### 3. Backend Setup

```bash
cd face-attendance-backend
cp .env.example .env
```

Edit `.env`:
```
DATABASE_URL=postgresql://user:password@host:5432/face_attendance
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret
ADMIN_USERS=your-email@gmail.com,your-github-username
```

```bash
npm install
npm start
```

### 4. Frontend Setup

```bash
cd face-attendance
python3 -m http.server 3001
```

### 5. Access

Open http://localhost:3001 and sign in with Google or GitHub.

Only users/emails/usernames listed in `ADMIN_USERS` can register new employees.

## Deployment

### Backend (Railway/Render/Heroku)

1. Deploy backend code
2. Set environment variables
3. Update OAuth redirect URIs to your production URL

### Frontend (GitHub Pages)

Update `API_URL` in `index.html` to point to your backend.

## API Endpoints

- `GET /auth/google` - Google login
- `GET /auth/google/callback` - Google OAuth callback
- `GET /auth/github` - GitHub login
- `GET /auth/github/callback` - GitHub OAuth callback
- `GET /auth/logout` - Logout
- `GET /api/me` - Current user
- `GET /api/users` - List users (auth required)
- `POST /api/users` - Create user (admin only)
- `DELETE /api/users/:id` - Delete user (admin only)
- `GET /api/attendance` - Get attendance records
- `POST /api/attendance/record` - Record attendance
