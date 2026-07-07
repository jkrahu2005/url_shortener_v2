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

          <h1 className="mt-8 text-4xl font-bold">
            Welcome Back
          </h1>

          <p className="mt-3 text-center text-base-content/60">
            Sign in to continue managing your links.
          </p>

        </div>

        <Card className="p-8">

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5"
          >

            <div>
              <label className="mb-2 block text-sm font-medium">
                Email
              </label>

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
              <label className="mb-2 block text-sm font-medium">
                Password
              </label>

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
              <p className="text-center text-sm text-error">
                {error}
              </p>
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