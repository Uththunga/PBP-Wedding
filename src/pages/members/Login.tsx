import React, { useState } from 'react';
import LoginModal from '../../components/auth/LoginModal';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const navigate = useNavigate();

  const handleClose = () => {
    setIsModalOpen(false);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-brand-beige">
      <LoginModal isOpen={isModalOpen} onClose={handleClose} />
    </div>
  );
}