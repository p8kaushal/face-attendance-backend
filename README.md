# FaceTrack

A modern, minimal face attendance tracking system with multiple authentication options and PostgreSQL storage.

## Features

- Face recognition attendance (check-in/check-out)
- **Multiple auth options**: Local username/password, Google OAuth, GitHub OAuth
- Admin-only user registration
- Attendance history with export
- Modern, responsive UI

## Tech Stack

- **Frontend**: Vanilla JS, face-api.js (browser-based face recognition)
- **Backend**: Node.js, Express, Passport.js
- **Database**: PostgreSQL
- **Auth**: Local, Google OAuth & GitHub OAuth

## Setup

### 1. Database (PostgreSQL)

Create a free PostgreSQL database at [Neon](https://neon.tech) or [Supabase](https://supabase.com).

### 2. OAuth Apps (Optional)

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
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your-secure-password
SESSION_SECRET=random-secret-key
# Optional OAuth:
# GOOGLE_CLIENT_ID=...
# GITHUB_CLIENT_ID=...
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

Open http://localhost:3001

**Login Options:**
- **Local**: Click Login → create account or login with username/password
- **OAuth**: Click Login → use Google or GitHub

## Deployment

### Backend (CloudPanel/Railway/Render)

1. Deploy backend code
2. Set environment variables
3. Update OAuth redirect URIs to your production URL

### Frontend (GitHub Pages)

Update `API_URL` in `index.html` to point to your backend.

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | PostgreSQL connection string | Yes |
| `ADMIN_USERNAME` | Default admin username | Yes |
| `ADMIN_PASSWORD` | Default admin password | Yes |
| `SESSION_SECRET` | Random string for sessions | Yes |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID | No |
| `GITHUB_CLIENT_ID` | GitHub OAuth client ID | No |

## API Endpoints

- `POST /auth/local/login` - Local login
- `POST /auth/local/register` - Local registration
- `GET /auth/google` - Google login
- `GET /auth/github` - GitHub login
- `GET /auth/logout` - Logout
- `GET /api/me` - Current user
- `GET /api/users` - List users (auth required)
- `POST /api/users` - Create user (admin only)
- `DELETE /api/users/:id` - Delete user (admin only)
- `GET /api/attendance` - Get attendance records
- `POST /api/attendance/record` - Record attendance
