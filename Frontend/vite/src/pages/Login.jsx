import { Mail, Lock } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useDispatch, useSelector } from "react-redux";

import { loginSchema } from "../schemas/authSchema";
import { loginUser } from "../redux/auth/authThunk";
import toast from "react-hot-toast";

import Card from "../components/common/Card";
import Button from "../components/common/Button";
import Input from "../components/common/Input";
import Logo from "../components/common/Logo";
import GradientBackground from "../components/common/GradientBackground";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    const payload = {
      email: data.email.trim().toLowerCase(),
      password: data.password,
    };

    const result = await dispatch(loginUser(payload));

    if (loginUser.fulfilled.match(result)) {
      toast.success("Welcome back!");
      navigate("/", { replace: true });
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-base-100 px-4">
      <GradientBackground />

      <div className="relative z-10 w-full max-w-md">
        <div className="mb-10 flex flex-col items-center">
          <Logo />
          <h1 className="mt-8 text-4xl font-bold">Welcome Back</h1>
          <p className="mt-3 text-center text-base-content/60">
            Sign in to continue managing your links.
          </p>
        </div>

        <Card className="p-8">
          {/* ✅ GOOGLE BUTTON */}
          <div className="mb-5">
            <button
              type="button"
              onClick={() => {
                const backendUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";
                window.location.href = `${backendUrl}/auth/google`;
              }}
              className="flex h-12 w-full items-center justify-center gap-3 rounded-lg border border-base-300 bg-base-100 font-medium text-base-content transition hover:bg-base-200"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
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
              Continue with Google
            </button>
            <div className="divider my-5 text-base-content/30">OR</div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label className="mb-2 block text-sm font-medium">Email</label>
              <Input
                icon={<Mail size={18} />}
                autoComplete="email"
                placeholder="rahul@gmail.com"
                {...register("email")}
              />
              {errors.email && (
                <p className="mt-2 text-sm text-error">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">Password</label>
              <Input
                type="password"
                autoComplete="current-password"
                icon={<Lock size={18} />}
                placeholder="••••••••"
                {...register("password")}
              />
              {errors.password && (
                <p className="mt-2 text-sm text-error">
                  {errors.password.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              loading={loading}
              disabled={loading}
              className="w-full"
            >
              Sign In
            </Button>

            {error && (
              <p className="text-center text-sm text-error">{error}</p>
            )}
          </form>

          <p className="mt-6 text-center text-sm text-base-content/60">
            Don't have an account?
            <Link
              to="/register"
              className="ml-1 font-semibold text-primary hover:underline"
            >
              Register
            </Link>
          </p>
        </Card>
      </div>
    </div>
  );
}

export default Login;