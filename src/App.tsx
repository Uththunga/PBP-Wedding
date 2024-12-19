import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Gallery from './pages/Gallery';
import Booking from './pages/Booking';
import BookingConfirmation from './pages/BookingConfirmation';
import Admin from './pages/Admin';
import Login from './pages/members/Login';
import Register from './pages/members/Register';
import Dashboard from './pages/members/Dashboard';
import Wedding from './pages/Wedding';
import Fashion from './pages/Fashion';
import Family from './pages/Family';
import Portraits from './pages/Portraits';
import Commercial from './pages/Commercial';
import About from './pages/About';
import Contact from './pages/Contact';
import PackageDetails from './pages/PackageDetails';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <Router>
      <Layout>
        <div className="relative">
          <Toaster position="bottom-center" />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/wedding" element={<Wedding />} />
            <Route path="/fashion" element={<Fashion />} />
            <Route path="/family" element={<Family />} />
            <Route path="/portraits" element={<Portraits />} />
            <Route path="/commercial" element={<Commercial />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/booking-confirmation" element={<BookingConfirmation />} />
            <Route path="/package/:id" element={<PackageDetails />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </div>
      </Layout>
    </Router>
  );
}

export default App;