import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RegisterPage = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event) => {
  event.preventDefault();

  console.log("Submit clicked");
  console.log(form);

  setSubmitting(true);

  const success = await register(form);

  console.log("Register result:", success);

  setSubmitting(false);

  if (success) {
    navigate("/app/dashboard");
  }
};
  return (
    <div className="flex min-h-screen items-center justify-center bg-mesh p-4">
      <form onSubmit={handleSubmit} className="glass-card w-full max-w-md space-y-4 p-6">
        <div>
          <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">Launch your workspace</p>
          <h1 className="mt-3 font-display text-3xl font-bold text-white">Create your account</h1>
        </div>
        <input className="field" placeholder="Full name" value={form.name} onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))} required />
        <input className="field" type="email" placeholder="Email" value={form.email} onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))} required />
        <input className="field" type="password" placeholder="Password" value={form.password} onChange={(e) => setForm((prev) => ({ ...prev, password: e.target.value }))} required minLength={6} />
        <button type="submit" className="btn-primary w-full" disabled={submitting}>{submitting ? "Creating account..." : "Register"}</button>
        <p className="text-sm text-slate-400">Already have an account? <Link to="/login" className="text-cyan-300">Login</Link></p>
      </form>
    </div>
  );
};

export default RegisterPage;
