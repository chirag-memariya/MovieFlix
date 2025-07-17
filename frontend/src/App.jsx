import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home.jsx';
import MovieDetail from './components/MovieDetail.jsx';
import StatsDashboard from './components/StatsDashboard.jsx';
import Login from './components/Login.jsx';
import Navbar from './components/Navbar.jsx';
import { AuthProvider } from './contexts/AuthContext.jsx';
import { MovieProvider } from './contexts/MovieContext.jsx';
import { StatsProvider } from './contexts/StatsContext.jsx';

export default function App() {
  return (
    <AuthProvider>
      <MovieProvider>
        <StatsProvider>
          <BrowserRouter>
            <Navbar />
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<Home />} />
              <Route path="/movie/:id" element={<MovieDetail />} />
              <Route path="/stats" element={<StatsDashboard />} />
            </Routes>
          </BrowserRouter>
        </StatsProvider>
      </MovieProvider>
    </AuthProvider>
  );
}
