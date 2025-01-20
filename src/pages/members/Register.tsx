import React, { useState } from 'react';
import SignUpModal from '../../components/auth/SignUpModal';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const navigate = useNavigate();

  const handleClose = () => {
    setIsModalOpen(false);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-brand-beige">
      <SignUpModal isOpen={isModalOpen} onClose={handleClose} />
    </div>
  );
}
