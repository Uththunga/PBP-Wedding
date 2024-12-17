import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Gallery from './pages/Gallery';
import CategoryGallery from './pages/gallery/CategoryGallery';
import Packages from './pages/Packages';
import Booking from './pages/Booking';
import Admin from './pages/Admin';
import Login from './pages/members/Login';
import Register from './pages/members/Register';
import Dashboard from './pages/members/Dashboard';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/gallery/:category" element={<CategoryGallery />} />
          <Route path="/packages" element={<Packages />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;