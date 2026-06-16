import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    const success = await login(form);
    setSubmitting(false);

    if (success) {
      navigate("/app/dashboard");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-mesh p-4">
      <form onSubmit={handleSubmit} className="glass-card w-full max-w-md space-y-4 p-6">
        <div>
          <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">FinanceFlow</p>
          <h1 className="mt-3 font-display text-3xl font-bold text-white">Welcome back</h1>
        </div>
        <input className="field" type="email" placeholder="Email" value={form.email} onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))} required />
        <input className="field" type="password" placeholder="Password" value={form.password} onChange={(e) => setForm((prev) => ({ ...prev, password: e.target.value }))} required />
        <button type="submit" className="btn-primary w-full" disabled={submitting}>{submitting ? "Signing in..." : "Login"}</button>
        <p className="text-sm text-slate-400">No account? <Link to="/register" className="text-cyan-300">Create one</Link></p>
      </form>
    </div>
  );
};

export default LoginPage;
