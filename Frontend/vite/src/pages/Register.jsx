import { User, Mail, Lock } from "lucide-react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

import { registerSchema } from "../schemas/authSchema";
import { registerUser } from "../redux/auth/authThunk";

import Card from "../components/common/Card";
import Button from "../components/common/Button";
import Input from "../components/common/Input";
import Logo from "../components/common/Logo";
import GradientBackground from "../components/common/GradientBackground";

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  // ✅ Trim and normalize input
const onSubmit = async (data) => {
  const payload = {
    name: data.name.trim(),
    email: data.email.trim().toLowerCase(),
    password: data.password,
  };

  const result = await dispatch(registerUser(payload));

  if (registerUser.fulfilled.match(result)) {
    toast.success("Account created successfully!");
     navigate("/", { replace: true });
  }
};

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-base-100 px-4">
      
      <GradientBackground />

      <div className="relative z-10 w-full max-w-md">
        
        <div className="mb-10 flex flex-col items-center">
          <Logo />
          <h1 className="mt-8 text-4xl font-bold text-base-content">
            Create your account
          </h1>
          <p className="mt-3 text-center text-base-content/60">
            Join thousands of developers building smarter links.
          </p>
        </div>

        <Card className="p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            
            <div>
              <label className="mb-2 block text-sm font-medium text-base-content">
                Full Name
              </label>
              <Input
                icon={<User size={18} />}
                placeholder="Rahul Kumar"
                autoComplete="name"
                {...register("name")}
              />
              {errors.name && (
                <p className="mt-2 text-sm text-error">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-base-content">
                Email
              </label>
              <Input
                icon={<Mail size={18} />}
                placeholder="rahul@gmail.com"
                autoComplete="email"
                {...register("email")}
              />
              {errors.email && (
                <p className="mt-2 text-sm text-error">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-base-content">
                Password
              </label>
              <Input
                type="password"
                icon={<Lock size={18} />}
                placeholder="••••••••"
                autoComplete="new-password"
                {...register("password")}
              />
              {errors.password && (
                <p className="mt-2 text-sm text-error">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-base-content">
                Confirm Password
              </label>
              <Input
                type="password"
                icon={<Lock size={18} />}
                placeholder="••••••••"
                autoComplete="new-password"
                {...register("confirmPassword")}
              />
              {errors.confirmPassword && (
                <p className="mt-2 text-sm text-error">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              loading={loading}
              disabled={loading}
              className="mt-2 h-12 w-full"
            >
              Create Account
            </Button>

            {error && (
              <p className="mt-3 text-center text-sm text-error">
                {error}
              </p>
            )}
          </form>

          {/* ✅ OR Divider removed */}

          <p className="mt-6 text-center text-sm text-base-content/60">
            Already have an account?
            <Link
              to="/login"
              className="ml-1 font-semibold text-primary hover:underline"
            >
              SignIn
            </Link>
          </p>

        </Card>

      </div>

    </div>
  );
}

export default Register;