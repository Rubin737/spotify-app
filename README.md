# 🎵 Spotify Clone

A full-stack music streaming web application inspired by Spotify — built from scratch with a MERN + TypeScript stack. Includes an admin dashboard for content management, Cloudinary-powered media uploads, Clerk authentication, and a custom audio player built with React and Zustand.

> ⚠️ **Status:** Actively in development. Core song/album management and playback are functional. Real-time features (friend activity, chat via Socket.io) are in progress — see [Roadmap](#-roadmap) below.

---

## ✨ Features

### 🎧 Core
- Browse songs and albums with a Spotify-style UI
- Custom audio player (play/pause, next/previous, seek) built with the browser Audio API + `useRef`
- Resizable three-panel layout (sidebar, main content, now-playing) using shadcn/ui `ResizablePanel`
- Responsive song table with hover-to-play interaction

### 🔐 Authentication
- Secure auth powered by [Clerk](https://clerk.com/) (`@clerk/react` v6)
- Short-lived JWT tokens refreshed automatically via an Axios interceptor pattern

### 🛠️ Admin Dashboard
- Upload and manage songs and albums
- Cloudinary integration for audio and image storage
- Automatic audio duration extraction from Cloudinary's upload response
- Stat cards for content overview
- Delete functionality for songs/albums

### 🗄️ Backend
- RESTful API built with Node.js + Express
- MongoDB + Mongoose for data modeling
- Signed media uploads to Cloudinary (audio + images)

---

## 🧰 Tech Stack

| Layer          | Technology                                      |
|----------------|--------------------------------------------------|
| Frontend       | React, Vite, TypeScript                          |
| State          | Zustand                                          |
| UI Components  | shadcn/ui, Radix UI, Tailwind CSS                |
| Backend        | Node.js, Express                                 |
| Database       | MongoDB, Mongoose                                |
| Authentication | Clerk                                            |
| Media Storage  | Cloudinary                                       |
| File Uploads   | express-fileupload                               |

---

## 📁 Project Structure

```
spotify-clone/
├── frontend/          # React + Vite + TypeScript client
│   ├── src/
│   └── ...
├── backend/           # Node.js + Express API
│   ├── src/
│   └── ...
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- MongoDB Atlas account (or local MongoDB instance)
- Cloudinary account
- Clerk account

### 1. Clone the repo
```bash
git clone https://github.com/Rubin737/spotify-app.git
cd spotify-app
```

### 2. Backend setup
```bash
cd back-end
npm install
```

Create a `.env` file in `back-end/` based on `.env.example`:
```
MONGODB_URI=your_mongodb_connection_string
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
CLERK_SECRET_KEY=your_clerk_secret_key
```

Run the backend:
```bash
npm run dev
```

### 3. Frontend setup
```bash
cd ../front-end
npm install
```

Create a `.env` file in `front-end/` based on `.env.example`:
```
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
VITE_API_BASE_URL=http://localhost:5000
```

Run the frontend:
```bash
npm run dev
```

The app should now be running locally — check your terminal output for the exact ports.

---

## 🗺️ Roadmap

- [ ] Deploy frontend (Vercel/Netlify) and backend (Render/Railway)
- [ ] Real-time "friends activity" — see what friends are currently playing (Socket.io)
- [ ] Real-time chat between friends (Socket.io)
- [ ] Full mobile responsiveness

---

## 🎓 What I Learned Building This

- Signed media uploads and resource-type handling with Cloudinary's SDK
- Clerk v6 authentication architecture, including token refresh patterns
- State management with Zustand and avoiding stale closures/state bugs
- Debugging async race conditions in the browser Audio API (`AbortError`)
- Building accessible, controlled components with Radix/shadcn primitives

---

## 👤 Author

**Rubin**
- Portfolio: [rubinwebdev.netlify.app](https://rubinwebdev.netlify.app)
- GitHub: [@Rubin737](https://github.com/Rubin737)
- LinkedIn: [linkedin.com/in/rubisten](https://linkedin.com/in/rubisten/)

---

## 📄 License

This project is for personal/portfolio use.
