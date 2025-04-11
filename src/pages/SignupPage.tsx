
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { SignupForm } from '@/components/auth/SignupForm';

const SignupPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="container py-12 md:py-24">
          <SignupForm />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SignupPage;
