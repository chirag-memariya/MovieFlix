# MovieFlix Dashboard

A full-stack web application providing a responsive dashboard for searching, viewing, and analyzing movie data. The backend fetches data from the OMDb API and caches it in MongoDB, while the frontend, built with React and Vite, offers search, filter, movie detail views, and interactive analytics charts.

---

## 📚 Table of Contents
1. [Features](#features)
2. [Prerequisites](#prerequisites)
3. [Repository Structure](#repository-structure)
4. [Setup & Installation](#setup--installation)
5. [Backend Usage](#backend-usage)
6. [Frontend Usage](#frontend-usage)
7. [API Endpoints](#api-endpoints)
8. [Authentication](#authentication)
9. [Data Models](#data-models)
10. [Technologies & Libraries](#technologies--libraries)
11. [License](#license)

---

## Features
- **Search Movies** by title using OMDb API
- **Cache Layer**: MongoDB caching with 24h TTL
- **Movie Details** view with full metadata
- **Analytics**: Genre distribution, average ratings, runtime trends
- **JWT Authentication** for protected actions
- **Responsive UI**: React + Tailwind CSS

---

## Prerequisites
- Node.js (v18+)
- npm or yarn
- MongoDB (local or Atlas)
- OMDb API key

---

## Repository Structure
```
backend/         # Express.js API server
  ├─ models/     # Mongoose schemas
  ├─ routes/     # Express routers
  ├─ utils.js    # API fetch & cache logic
  ├─ auth.js     # JWT functions
  ├─ config.js   # environment config
  ├─ db.js       # MongoDB connection
  └─ server.js   # app entrypoint
frontend/        # Vite + React client
  ├─ public/     # static assets
  ├─ src/        # React components & context
  ├─ styles.css  # Tailwind imports + custom styles
  └─ main.jsx    # React entrypoint
.env.example     # sample environment variables
README.md        # this file
```

---

## Setup & Installation

1. **Clone the repo**
   ```bash
   git clone https://github.com/<your-username>/movieflix-dashboard.git
   cd movieflix-dashboard
   ```

2. **Backend**
   ```bash
   cd backend
   cp .env.example .env
   # Fill in OMDB_API_KEY, MONGO_URI, JWT_SECRET, PORT
   npm install
   npm start
   ```

3. **Frontend**
   ```bash
   cd ../frontend
   npm install
   npm run dev
   ```

4. Visit the frontend at `http://localhost:5173` and backend at `http://localhost:3000` (or your PORT).

---

## Backend Usage
- **Health Check**: `GET /`
- **Search Movies**: `GET /movies?search=Batman`
- **Movie Details**: `GET /movies/:id`
- **Genre Stats**: `GET /stats/genres`
- **Rating Stats**: `GET /stats/ratings`
- **Runtime Stats**: `GET /stats/runtime`

---

## Frontend Usage
- **Login**: `/login` (use admin/admin for demo)
- **Home**: `/` search and view movie cards
- **Detail**: `/movie/:id`
- **Stats**: `/stats` charts dashboard

---

## API Endpoints
| Method | Endpoint              | Description                   |
| ------ | --------------------- | ----------------------------- |
| GET    | `/`                   | Health check                  |
| POST   | `/auth/token`         | Get JWT token (admin only)    |
| GET    | `/movies`             | Search movies by title        |
| GET    | `/movies/:id`         | Fetch full movie details      |
| GET    | `/stats/genres`       | Genre distribution counts     |
| GET    | `/stats/ratings`      | Average rating per genre      |
| GET    | `/stats/runtime`      | Average runtime by year       |

---

## Authentication
- Uses JWT with 1h expiry
- Demo credentials: **admin / admin**
- Include `Authorization: Bearer <token>` header for protected routes

---

## Data Models
`Movie` schema fields:
- imdbID
- Title
- Year
- Genre[]
- Director
- Actors[]
- Runtime_minutes
- imdbRating
- cachedAt

---

## Technologies & Libraries
- **Backend**: Node.js, Express.js, Mongoose, Axios, JSONWebToken
- **Frontend**: React, Vite, Tailwind CSS, Chart.js, React Router
- **Database**: MongoDB

---

## License
This project is licensed under the MIT License. Feel free to use and modify!

---


### File Listings

#### File: `.env.example`
```env
OMDB_API_KEY=your_omdb_api_key
MONGO_URI=mongodb://localhost:27017/movieflix
JWT_SECRET=your_jwt_secret
PORT=3000
```  

---

*(Rest of file listings follow as previously documented)*

