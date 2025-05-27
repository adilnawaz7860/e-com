"use client";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Lock } from "lucide-react";
import { useState } from "react";
import AuthService from "@/services/authService";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";

const ChangePasswordForm = ({token}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      newPassword: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("New password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("newPassword")], "Passwords must match")
        .required("Confirm your password"),
    }),
    onSubmit: async (values) => {
      setIsSubmitting(true);
      try {
        const res = await AuthService.resetPassword({
          token,
          password: values.newPassword,
        });

        toast.success("Password changed successfully");
        router.push("/login");
      } catch (err) {
        toast.error(err?.response?.data?.message || "Something went wrong");
        console.error(err);
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  return (
    <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-md space-y-6">
      <h2 className="text-2xl font-bold text-center text-gray-800">Reset Password</h2>
      <form onSubmit={formik.handleSubmit} className="space-y-5">
        {/* New Password */}
        <div>
          <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
            New Password
          </label>
          <div className="mt-1 relative">
            <input
              id="newPassword"
              name="newPassword"
              type="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.newPassword}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:border-cyan-500"
              placeholder="••••••••"
            />
            <Lock className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
          </div>
          <div className="h-5 mt-1">
            {formik.touched.newPassword && formik.errors.newPassword && (
              <p className="text-red-500 text-sm">{formik.errors.newPassword}</p>
            )}
          </div>
        </div>

        {/* Confirm Password */}
        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
            Confirm Password
          </label>
          <div className="mt-1 relative">
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.confirmPassword}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:border-cyan-500"
              placeholder="••••••••"
            />
            <Lock className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
          </div>
          <div className="h-5 mt-1">
            {formik.touched.confirmPassword && formik.errors.confirmPassword && (
              <p className="text-red-500 text-sm">{formik.errors.confirmPassword}</p>
            )}
          </div>
        </div>

        {/* Submit */}
        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-cyan-600 text-white py-2 rounded-lg font-semibold hover:bg-cyan-700 transition duration-200 disabled:opacity-50"
          >
            {isSubmitting ? "Resetting..." : "Change Password"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChangePasswordForm;
