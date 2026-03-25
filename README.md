# FaceTrack

A modern, minimal face attendance tracking system with GitHub OAuth authentication and PostgreSQL storage.

## Features

- Face recognition attendance (check-in/check-out)
- GitHub OAuth authentication
- Admin-only user registration
- Attendance history with export
- Modern, responsive UI

## Tech Stack

- **Frontend**: Vanilla JS, face-api.js (browser-based face recognition)
- **Backend**: Node.js, Express, Passport.js
- **Database**: PostgreSQL
- **Auth**: GitHub OAuth

## Setup

### 1. Database (PostgreSQL)

Create a free PostgreSQL database at [Neon](https://neon.tech) or [Supabase](https://supabase.com).

### 2. GitHub OAuth App

1. Go to GitHub Settings → Developer settings → OAuth Apps
2. Create New OAuth App
3. Set:
   - Homepage URL: `http://localhost:3001`
   - Callback URL: `http://localhost:3000/auth/github/callback`
4. Copy Client ID and generate Client Secret

### 3. Backend Setup

```bash
cd face-attendance-backend
cp .env.example .env
```

Edit `.env`:
```
DATABASE_URL=postgresql://user:password@host:5432/face_attendance
GITHUB_CLIENT_ID=your-client-id
GITHUB_CLIENT_SECRET=your-client-secret
ADMIN_USERS=your-github-username
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

Open http://localhost:3001 and login with GitHub.

Only users listed in `ADMIN_USERS` can register new employees.

## Deployment

### Backend (Railway/Render/Heroku)

1. Deploy backend code
2. Set environment variables
3. Update GitHub OAuth callback URL to your production URL

### Frontend (GitHub Pages)

Update `API_URL` in `index.html` to point to your backend.

## API Endpoints

- `GET /auth/github` - GitHub login
- `GET /auth/github/callback` - OAuth callback
- `GET /auth/logout` - Logout
- `GET /api/me` - Current user
- `GET /api/users` - List users (auth required)
- `POST /api/users` - Create user (admin only)
- `DELETE /api/users/:id` - Delete user (admin only)
- `GET /api/attendance` - Get attendance records
- `POST /api/attendance/record` - Record attendance
