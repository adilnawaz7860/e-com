"use client";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Mail } from 'lucide-react';
import { useState } from 'react';
import AuthService from '@/services/authService';
import { toast } from 'sonner';

const ForgotPasswordForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email').required('Email is required'),
    }),
     onSubmit: async (values) => {
      setIsSubmitting(true);
      try {
        const res = await AuthService.forgotPassword(values);
        console.log(res?.message ,"response");
     // Redirect after successful login
     
       toast.success(res?.message)
     
     
      } catch (err) {
        toast.error(err?.response?.data?.message)
        console.error(err);
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  return (
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-md space-y-6">
        <h2 className="text-2xl font-bold text-center text-gray-800">Forgot Password</h2>

        {submitted ? (
          <p className="text-center text-green-600 font-medium">
            If the email exists, a password reset link has been sent.
          </p>
        ) : (
          <form onSubmit={formik.handleSubmit} className="space-y-5">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
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
              <div className="h-5 mt-1">
                {formik.touched.email && formik.errors.email && (
                  <p className="text-red-500 text-sm">{formik.errors.email}</p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-cyan-600 text-white py-2 rounded-lg font-semibold hover:bg-cyan-700 transition duration-200 disabled:opacity-50"
              >
                {isSubmitting ? 'Sending...' : 'Send Reset Link'}
              </button>
            </div>
          </form>
        )}
      </div>
      );
};

export default ForgotPasswordForm;
