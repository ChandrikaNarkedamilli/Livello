import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Admin from './pages/Admin';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Home from './pages/Home';
import NavBar from './components/NavBar';
import './App.css'

const App = () => {
  const { user } = useSelector(state => state.auth);

  const ProtectedRoute = ({ children, adminOnly = false }) => {
    if (!user) return <Navigate to="/login" replace />;
    if (adminOnly && user.role !== 'admin') return <Navigate to="/" replace />;
    return children;
  };

  return (
    <BrowserRouter>
      <NavBar />
      <div maxwidth="lg" sx={{ mt: 2 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={
            <ProtectedRoute adminOnly>
              <Admin />
            </ProtectedRoute>
          } />
          <Route path="/profile" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />
          <Route path="/profile/:id" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
