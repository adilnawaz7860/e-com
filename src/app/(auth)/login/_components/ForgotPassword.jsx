"use client";
import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Mail, KeyRound, Lock } from "lucide-react";
import { toast } from "sonner";




export default function ForgotPasswordModal({ open, onClose }) {
  const [step, setStep] = useState("email");
  const [email, setEmail] = useState("");
  const [serverToken, setServerToken] = useState(""); // demo only

  /* ───────────────── STEP 1 – EMAIL ───────────────── */
  const emailForm = useFormik({
    initialValues: { email: "" },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email").required("Required"),
    }),
    onSubmit: async ({ email }) => {
      // hit backend
      const res = await fetch("/api/auth/send-otp", {
        method: "POST",
        body: JSON.stringify({ email }),
        headers: { "Content-Type": "application/json" },
      });
      if (res.ok) {
        toast.success(res?.message)
        setEmail(email);
        setStep("otp");
      }else{
        toast.error('error')
      }
    },
  });

  /* ───────────────── STEP 2 – OTP ───────────────── */
  const otpForm = useFormik({
    initialValues: { otp: "" },
    validationSchema: Yup.object({
      otp: Yup.string().length(6, "6-digit code").required("Required"),
    }),
    onSubmit: async ({ otp }) => {
      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        body: JSON.stringify({ email, otp }),
        headers: { "Content-Type": "application/json" },
      });
      if (res.ok) {
        const { token } = await res.json(); // password-reset token
        setServerToken(token);              // store for step 3
        setStep("reset");
      }
    },
  });

  /* ───────────────── STEP 3 – RESET PW ───────────── */
  const resetForm = useFormik({
    initialValues: { password: "", confirm: "" },
    validationSchema: Yup.object({
      password: Yup.string().min(6).required(),
      confirm: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords must match")
        .required(),
    }),
    onSubmit: async ({ password }) => {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        body: JSON.stringify({ token: serverToken, password }),
        headers: { "Content-Type": "application/json" },
      });
      if (res.ok) {
        setStep("email"); // done → back to login
        onClose();
      }
    },
  });

  /* ───────────────── RENDER ───────────────── */
  const Field = ({
    id,
    type,
    placeholder,
    icon,
    form,
}) => (
    <div>
      <div className="relative mt-1">
        <input
          id={id}
          name={id}
          type={type}
          onChange={form.handleChange}
          onBlur={form.handleBlur}
          value={form.values[id]}
          placeholder={placeholder}
          className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-cyan-500"
        />
        <span className="absolute left-3 top-2.5 text-gray-400 h-5 w-5">
          {icon}
        </span>
      </div>
      <p className="h-5 mt-1 text-xs text-red-500">
        {form.touched[id] && (form.errors)[id]}
      </p>
    </div>
  );

  const Title = {
    email: "Enter Email",
    otp:   "Enter OTP",
    reset: "Set New Password",
  }[step];

  const CurrentForm =
    step === "email" ? emailForm : step === "otp" ? otpForm : resetForm;

  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
<div className="fixed inset-0 bg-black/30 backdrop-blur-md" />
        </Transition.Child>

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-150"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg">
              <Dialog.Title className="text-lg font-semibold text-gray-800">
                {Title}
              </Dialog.Title>

              <form
                onSubmit={CurrentForm.handleSubmit}
                className="mt-4 space-y-4"
              >
                {step === "email" && (
                  <>
                    <Field
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      icon={<Mail />}
                      form={emailForm}
                    />
                    <button className="w-full rounded-lg bg-cyan-600 py-2 font-semibold text-white hover:bg-cyan-700">
                      Send OTP
                    </button>
                  </>
                )}

                {step === "otp" && (
                  <>
                    <Field
                      id="otp"
                      type="text"
                      placeholder="6-digit code"
                      icon={<KeyRound />}
                      form={otpForm}
                    />
                    <button className="w-full rounded-lg bg-cyan-600 py-2 font-semibold text-white hover:bg-cyan-700">
                      Verify
                    </button>
                  </>
                )}

                {step === "reset" && (
                  <>
                    <Field
                      id="password"
                      type="password"
                      placeholder="New password"
                      icon={<Lock />}
                      form={resetForm}
                    />
                    <Field
                      id="confirm"
                      type="password"
                      placeholder="Confirm password"
                      icon={<Lock />}
                      form={resetForm}
                    />
                    <button className="w-full rounded-lg bg-cyan-600 py-2 font-semibold text-white hover:bg-cyan-700">
                      Save Password
                    </button>
                  </>
                )}
              </form>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
