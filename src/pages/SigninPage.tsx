
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { SigninForm } from '@/components/auth/SigninForm';

const SigninPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="container py-12 md:py-24">
          <SigninForm />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SigninPage;
