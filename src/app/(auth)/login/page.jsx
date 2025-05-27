"use client"
import { useState } from 'react';
import ForgotPasswordModal from './_components/ForgotPassword';
import LoginForm from './_components/LoginForm'

export default function LoginPage() {
    const [open ,setOpen] = useState(false);
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <LoginForm onForgot={() => setOpen(true)}/>
            <ForgotPasswordModal open={open} onClose={() => setOpen(false)} />

    </div>
  );
}
