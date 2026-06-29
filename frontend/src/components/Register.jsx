import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import Swal from "sweetalert2";
import Button from "./common/Button.jsx";
import Input from "./common/Input.jsx";
import { Mail, Lock, UserPlus, Github } from "lucide-react";

const Register = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { registerUser, signInWithGoogle } = useAuth();
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      await registerUser(data.email, data.password);
      Swal.fire({
        title: "Registration Successful!",
        text: "Your account has been created successfully.",
        icon: "success",
        confirmButtonColor: "#2563eb",
      }).then(() => navigate("/"));
    } catch (error) {
      Swal.fire({
        title: "Registration Failed",
        text: "Please check your email and password.",
        icon: "error",
        confirmButtonColor: "#dc2626",
      });
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSignInWithGoogle = async () => {
    try {
      await signInWithGoogle();
      navigate("/");
    } catch (error) {
      Swal.fire({
        title: "Google Sign-In Failed",
        text: "Please try again later.",
        icon: "error",
        confirmButtonColor: "#dc2626",
      });
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex flex-row-reverse">
      {/* Left side - Branding/Story (Reversed for Register) */}
      <div className="hidden lg:flex lg:w-1/2 bg-slate-50 flex-col justify-center px-12 relative border-l border-border">
        <div className="relative z-10 max-w-lg ml-auto mr-12">
          <Link to="/" className="flex items-center gap-2 focus:outline-none mb-12 w-max">
            <div className="w-10 h-10 rounded bg-primary flex items-center justify-center text-white font-bold text-lg">
              IL
            </div>
            <span className="font-bold text-2xl tracking-tight text-slate-900">
              InfoLand <span className="text-primary">AI</span>
            </span>
          </Link>
          <h1 className="text-3xl font-bold text-slate-900 mb-6 leading-tight">
            Join the leading Property Intelligence network.
          </h1>
          <p className="text-lg text-slate-600 mb-8 leading-relaxed">
            Create an account to track properties, receive risk alerts, and access enterprise dataset insights.
          </p>
          <div className="p-6 bg-white rounded-xl shadow-sm border border-slate-200">
            <p className="italic text-slate-600 mb-4 text-sm">
              "InfoLand AI has fundamentally transformed how we evaluate property risk before finalizing acquisitions."
            </p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-slate-200"></div>
              <div>
                <p className="text-sm font-semibold text-slate-900">Data Verification Team</p>
                <p className="text-xs text-slate-500">Enterprise Partner</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 lg:px-20 xl:px-24 bg-white">
        <div className="mx-auto w-full max-w-sm lg:max-w-md">
          <div className="lg:hidden flex justify-center mb-8">
            <Link to="/" className="flex items-center gap-2 focus:outline-none">
              <div className="w-8 h-8 rounded bg-primary flex items-center justify-center text-white font-bold text-sm">
                IL
              </div>
              <span className="font-bold text-xl tracking-tight text-slate-900">
                InfoLand <span className="text-primary">AI</span>
              </span>
            </Link>
          </div>
          
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">Create your account</h2>
          <p className="mt-2 text-sm text-slate-500">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-primary hover:text-primary-hover focus:outline-none focus:underline">
              Sign in
            </Link>
          </p>

          <div className="mt-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <Input
                label="Email address"
                id="email"
                type="email"
                icon={Mail}
                placeholder="name@company.com"
                autoComplete="email"
                {...register("email", { required: "Email is required" })}
                error={errors.email?.message}
              />

              <Input
                label="Password"
                id="password"
                type="password"
                icon={Lock}
                placeholder="••••••••"
                autoComplete="new-password"
                helpText="Must be at least 8 characters."
                {...register("password", { 
                  required: "Password is required",
                  minLength: { value: 8, message: "Password must be at least 8 characters" }
                })}
                error={errors.password?.message}
              />

              <div className="flex items-start">
                <div className="flex h-5 items-center">
                  <input
                    id="terms"
                    name="terms"
                    type="checkbox"
                    required
                    className="h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="terms" className="text-slate-500">
                    I agree to the{' '}
                    <a href="#" className="font-medium text-slate-700 hover:text-slate-900 underline">Terms of Service</a>
                    {' '}and{' '}
                    <a href="#" className="font-medium text-slate-700 hover:text-slate-900 underline">Privacy Policy</a>.
                  </label>
                </div>
              </div>

              <Button 
                type="submit" 
                variant="primary" 
                className="w-full"
                isLoading={isSubmitting}
                icon={UserPlus}
              >
                Create account
              </Button>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-white px-2 text-slate-500">Or continue with</span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={handleSignInWithGoogle}
                  className="inline-flex w-full justify-center rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-500 shadow-sm hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>
                  <span className="sr-only">Sign in with Google</span>
                </button>
                <button
                  type="button"
                  className="inline-flex w-full justify-center items-center rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-500 shadow-sm hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-primary opacity-50 cursor-not-allowed"
                  title="Coming soon"
                >
                  <Github className="h-5 w-5 text-slate-700" />
                  <span className="sr-only">Sign in with GitHub</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
