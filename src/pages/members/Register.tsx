import React from 'react';
import RegisterForm from '../../components/auth/RegisterForm';

export default function Register() {
  return (
    <div className="min-h-screen bg-brand-dark pt-24">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex min-h-[60vh] items-center justify-center">
          <RegisterForm />
        </div>
      </div>
    </div>
  );
}
