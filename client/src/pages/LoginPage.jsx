import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext.jsx";
import FormInput from "../components/FormInput.jsx";
import { getErrorMessage } from "../utils/errors.js";

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await login(form);
      toast.success("Welcome back");
      navigate("/dashboard");
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-16 px-4">
      <h1 className="text-2xl font-semibold mb-6 text-text-primary">Log in</h1>
      <form onSubmit={handleSubmit}>
        <FormInput label="Email" name="email" type="email" value={form.email} onChange={handleChange} />
        <FormInput label="Password" name="password" type="password" value={form.password} onChange={handleChange} />
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-2 rounded-md bg-accent hover:bg-accent-hover disabled:opacity-50 transition-colors font-medium"
        >
          {isSubmitting ? "Logging in..." : "Log In"}
        </button>
      </form>
      <p className="text-sm text-text-secondary mt-4">
        Don't have an account?{" "}
        <Link to="/signup" className="text-accent hover:underline">
          Sign up
        </Link>
      </p>
    </div>
  );
};

export default LoginPage;
