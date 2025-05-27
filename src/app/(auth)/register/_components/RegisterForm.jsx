"use client";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Mail, Lock, User, Phone } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';
import AuthService from '@/services/authService';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

const RegisterForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      email: Yup.string().email('Invalid email').required('Email is required'),
      phone: Yup.string()
        .matches(/^[0-9]{10}$/, 'Phone number must be 10 digits')
        .required('Phone number is required'),
      password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords must match')
        .required('Confirm your password'),
    }),
   onSubmit: async (values) => {
  setIsSubmitting(true);
  const { confirmPassword, ...userData } = values; // exclude confirmPassword here
  try {
    const res = await AuthService.register(userData); // send userData, not full values
    toast.success("User Registered Successfully");
    router.push('/login');
  } catch (error) {
    const message =
      error.response?.data?.message || error.message || "Something went wrong";
    toast.error(message);
    console.error("Error fetching data:", error);
  } finally {
    setIsSubmitting(false);
  }
},

  });

  const renderField = (id, type, label, icon, placeholder) => (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">{label}</label>
      <div className="mt-1 relative">
        <input
          id={id}
          name={id}
          type={type}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values[id]}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:border-cyan-500"
          placeholder={placeholder}
        />
        <div className="absolute left-3 top-2.5 w-5 h-5 text-gray-400">
          {icon}
        </div>
      </div>
      <div className="h-2 mt-1">
        {formik.touched[id] && formik.errors[id] && (
          <p className="text-red-500 text-xs">{formik.errors[id]}</p>
        )}
      </div>
    </div>
  );

  return (
    <div className="max-w-md w-full mx-auto bg-white p-8 rounded-xl shadow-md space-y-6">
      <h2 className="text-2xl font-bold text-center text-gray-800">Create an Account</h2>
      <form onSubmit={formik.handleSubmit} className="space-y-5">
        {renderField('name', 'text', 'Full Name', <User />, 'John Doe')}
        {renderField('email', 'email', 'Email Address', <Mail />, 'you@example.com')}
        {renderField('phone', 'tel', 'Phone Number', <Phone />, '1234567890')}
        {renderField('password', 'password', 'Password', <Lock />, '••••••••')}
        {renderField('confirmPassword', 'password', 'Confirm Password', <Lock />, '••••••••')}

      

        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-cyan-600 cursor-pointer text-white py-2 rounded-lg font-semibold hover:bg-cyan-700 transition duration-200 disabled:opacity-50"
          >
            {isSubmitting ? 'Registering...' : 'Register'}
          </button>
        </div>
          <div className="text-center text-sm text-gray-600">
          Already registered?{' '}
          <Link href="/login" className="text-cyan-600 hover:underline">
            Login here
          </Link>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
