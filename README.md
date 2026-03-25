# FaceTrack

A modern, minimal face attendance tracking system with Google OAuth authentication and PostgreSQL storage.

## Features

- Face recognition attendance (check-in/check-out)
- Google OAuth authentication
- Admin-only user registration
- Attendance history with export
- Modern, responsive UI

## Tech Stack

- **Frontend**: Vanilla JS, face-api.js (browser-based face recognition)
- **Backend**: Node.js, Express, Passport.js
- **Database**: PostgreSQL
- **Auth**: Google OAuth

## Setup

### 1. Database (PostgreSQL)

Create a free PostgreSQL database at [Neon](https://neon.tech) or [Supabase](https://supabase.com).

### 2. Google OAuth App

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Go to APIs & Services → Credentials
4. Create OAuth Client ID (Web application)
5. Set:
   - Authorized JavaScript origins: `http://localhost:3001`
   - Authorized redirect URIs: `http://localhost:3000/auth/google/callback`
6. Copy Client ID and Client Secret

### 3. Backend Setup

```bash
cd face-attendance-backend
cp .env.example .env
```

Edit `.env`:
```
DATABASE_URL=postgresql://user:password@host:5432/face_attendance
GOOGLE_CLIENT_ID=your-client-id
GOOGLE_CLIENT_SECRET=your-client-secret
ADMIN_EMAILS=your-email@gmail.com
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

Open http://localhost:3001 and sign in with Google.

Only users listed in `ADMIN_EMAILS` can register new employees.

## Deployment

### Backend (Railway/Render/Heroku)

1. Deploy backend code
2. Set environment variables
3. Update Google OAuth redirect URI to your production URL

### Frontend (GitHub Pages)

Update `API_URL` in `index.html` to point to your backend.

## API Endpoints

- `GET /auth/google` - Google login
- `GET /auth/google/callback` - OAuth callback
- `GET /auth/logout` - Logout
- `GET /api/me` - Current user
- `GET /api/users` - List users (auth required)
- `POST /api/users` - Create user (admin only)
- `DELETE /api/users/:id` - Delete user (admin only)
- `GET /api/attendance` - Get attendance records
- `POST /api/attendance/record` - Record attendance
