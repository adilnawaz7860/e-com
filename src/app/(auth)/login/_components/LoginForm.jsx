"use client";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Mail, Lock } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';
import AuthService from '@/services/authService';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

const LoginForm = ({onForgot}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email').required('Email is required'),
      password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    }),
    onSubmit: async (values) => {
      setIsSubmitting(true);
      try {
        const res = await AuthService.logIn(values);
        console.log(res ,"response");
           sessionStorage.setItem("token", res.token); // Store token
     // Redirect after successful login
     
       toast.success("User LoggedIn Successfully")
      setTimeout(() => {
        router.push('/'); 
        
      }, 1000);
     
      } catch (err) {
        console.error(err);
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  return (
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-md space-y-6">
        <h2 className="text-2xl font-bold text-center text-gray-800">Login to Your Account</h2>
        <form onSubmit={formik.handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <div className="mt-1 relative">
              <input
                id="email"
                name="email"
                type="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:border-cyan-500"
                placeholder="you@example.com"
              />
              <Mail className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
            </div>
            <div className="h-2 mt-1">
              {formik.touched.email && formik.errors.email && (
                <p className="text-red-500 text-xs">{formik.errors.email}</p>
              )}
            </div>
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <div className="mt-1 relative">
              <input
                id="password"
                name="password"
                type="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:border-cyan-500"
                placeholder="••••••••"
              />
              <Lock className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
            </div>
            <div className="h-2 mt-1">
              {formik.touched.password && formik.errors.password && (
                <p className="text-red-500 text-xs">{formik.errors.password}</p>
              )}
            </div>
         
               <Link href="/forgot-password" className="text-sm text-cyan-600 hover:underline">
                Forgot password?
              </Link>
            
          </div>

          {/* Submit */}
          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-cyan-600 text-white py-2 rounded-lg font-semibold hover:bg-cyan-700 transition duration-200 disabled:opacity-50"
            >
              {isSubmitting ? 'Logging in...' : 'Login'}
            </button>
          </div>

          {/* Redirect to Register */}
          <div className="text-center text-sm text-gray-600">
            Don't have an account?{' '}
            <Link href="/register" className="text-cyan-600 hover:underline">
              Register here
            </Link>
          </div>
        </form>
      
    </div>
  );
};

export default LoginForm;
