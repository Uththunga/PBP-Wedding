import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import AdminLayout from './components/layout/AdminLayout';
import Home from './pages/Home';
import Gallery from './pages/Gallery';
import Booking from './pages/Booking';
import BookingConfirmation from './pages/BookingConfirmation';
import Login from './pages/members/Login';
import Register from './pages/members/Register';
import Dashboard from './pages/members/Dashboard';
import About from './pages/About';
import Contact from './pages/Contact';
import PackageDetails from './pages/PackageDetails';
import AdminDashboard from './pages/admin/Dashboard';
import GalleryManager from './pages/admin/GalleryManager';
import PackageManager from './pages/admin/PackageManager';
import AdminRoute from './components/auth/AdminRoute';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <Router basename="/PBP">
      <Layout>
        <div className="relative">
          <Toaster position="bottom-center" />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/booking-confirmation" element={<BookingConfirmation />} />
            <Route path="/packages/:packageId" element={<PackageDetails />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            
            {/* Admin Routes */}
            <Route path="/admin/*" element={
              <AdminRoute>
                <AdminLayout>
                  <Routes>
                    <Route path="/" element={<AdminDashboard />} />
                    <Route path="/gallery" element={<GalleryManager />} />
                    <Route path="/packages" element={<PackageManager />} />
                  </Routes>
                </AdminLayout>
              </AdminRoute>
            } />
          </Routes>
        </div>
      </Layout>
    </Router>
  );
}

export default App;