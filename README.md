# 🔗 URL Shortener

A production-ready **full-stack URL Shortener** built with **React, Node.js, Express.js, PostgreSQL, Redis, and JWT Authentication**. The application allows users to securely create, manage, and analyze shortened URLs through a modern dashboard with real-time analytics.

🌐 **Live Demo:** https://urlfrontend-six.vercel.app/

---

## ✨ Features

- 🔐 JWT Authentication with Access & Refresh Tokens
- 🍪 Secure Cookie-based Session Management
- 🔄 Refresh Token Rotation for Seamless Login Experience
- 🔗 Shorten Long URLs using Base62 Encoding
- ⚡ Redis Caching for Faster URL Redirection
- 📊 Analytics Dashboard with Click Tracking
- 📋 Copy Short URL to Clipboard
- 🔍 Search URLs
- 🗑️ Delete Shortened URLs
- 🌙 Dark / Light Theme
- 📱 Fully Responsive UI
- 🚀 Production Deployment (Vercel + Render)

---

# 📸 Screenshots

> Add screenshots here

### Dashboard

![Dashboard](screenshots/dashboard.png)

### Analytics

![Analytics](screenshots/analytics.png)

### Login

![Login](screenshots/login.png)

---

# 🛠 Tech Stack

## Frontend

- React.js
- Redux Toolkit
- React Router
- Axios
- Tailwind CSS
- DaisyUI
- Lucide React

## Backend

- Node.js
- Express.js
- PostgreSQL (Neon)
- Redis
- JWT Authentication
- Cookie Parser
- bcrypt

## Deployment

- Frontend → Vercel
- Backend → Render
- Database → Neon PostgreSQL
- Cache → Redis Cloud

---

# 🚀 System Architecture

```text
React (Vercel)
       │
       ▼
Express.js API (Render)
       │
 ┌─────┴─────┐
 ▼           ▼
PostgreSQL   Redis
   (Neon)   (Cache)
```

---

# 🔑 Authentication Flow

- User Login
- JWT Access Token generated
- Refresh Token stored securely
- HTTP-only Secure Cookies
- Automatic Access Token Refresh
- Refresh Token Rotation
- Redis Token Blacklisting on Logout

---

# ⚡ URL Shortening Flow

1. User submits a long URL.
2. URL is stored in PostgreSQL.
3. Auto Increment ID is converted into Base62.
4. Base62 value becomes the Short Code.
5. Short URL is generated.
6. Redis caches the mapping.
7. Future redirects are served directly from Redis.

---

# 📊 Dashboard Features

- View All URLs
- Search URLs
- Copy Short URL
- Delete URL
- View Click Analytics
- Total Click Count
- Responsive Dashboard
- Dark / Light Theme

---

# 📂 Project Structure

```text
url_shortener/
│
├── frontend/
│   └── vite/
│       ├── src/
│       ├── public/
│       ├── package.json
│       └── vite.config.js
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   └── utils/
│   │
│   ├── server.js
│   └── package.json
```

---

# ⚙ Environment Variables

## Backend

```env
DATABASE_URL=

REDIS_PASS=

ACCESS_TOKEN_SECRET=

REFRESH_TOKEN_SECRET=

ACCESS_TOKEN_EXPIRY=15m

REFRESH_TOKEN_EXPIRY=7d

BASE_URL=

FRONTEND_URL=

NODE_ENV=production
```

---

## Frontend

```env
VITE_API_URL=
```

---

# 📈 Performance

- ⚡ Redis reduces redirect latency by **5–10×**
- 🔗 Supports **50+ shortened URLs**
- 👥 Used by **10+ users**
- 📊 Tracks **200+ URL redirects/clicks**

---

# 🧪 Running Locally

## Clone Repository

```bash
git clone https://github.com/jkrahu2005/url_shortener.git
```

---

## Backend

```bash
cd backend

npm install

npm run dev
```

---

## Frontend

```bash
cd frontend/vite

npm install

npm run dev
```

---

# Future Improvements

- QR Code Generation
- Custom Short URLs
- Link Expiration
- Password Protected Links
- Geo-location Analytics
- Device & Browser Analytics
- Bulk URL Shortening
- Rate Limiting
- Admin Dashboard

---

# 👨‍💻 Author

**Rahul Kumar**

- GitHub: https://github.com/jkrahu2005

---

## ⭐ If you found this project useful, consider giving it a star!
