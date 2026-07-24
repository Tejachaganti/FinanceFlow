import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  User,
  Wallet,
  Palette,
  Shield,
  Camera,
  Mail,
  Phone,
  Save,
} from "lucide-react";

import useAuth from "../hooks/useAuth";
import api from "../services/api";
import { DEFAULT_CURRENCY } from "../utils/formatters";

const SettingsPage = () => {
  const { user, setUser, applyTheme } = useAuth();

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    currency: DEFAULT_CURRENCY,
    theme: "dark",
    monthlySavingsGoal: 0,
    avatar: null,
  });
  const [passwordData, setPasswordData] = useState({
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
});

  useEffect(() => {
    if (user) {
      setProfile({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        currency: user.currency || DEFAULT_CURRENCY,
        theme: user.theme || "dark",
        monthlySavingsGoal: user.monthlySavingsGoal || 0,
        avatar: null,
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setProfile((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handlePasswordChange = (e) => {
  setPasswordData({
    ...passwordData,
    [e.target.name]: e.target.value,
  });
};

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = new FormData();

    Object.entries(profile).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        payload.append(key, value);
      }
    });

    try {
      const { data } = await api.put("/profile", payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setUser((prev) => ({
        ...prev,
        ...data.profile,
      }));

      applyTheme(data.profile.theme);

      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Unable to update profile."
      );
    }
  };

  const changePassword = async () => {
  try {
    await api.put("/auth/change-password", passwordData);

    toast.success("Password changed successfully.");

    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  } catch (error) {
    toast.error(
      error.response?.data?.message ||
      "Unable to change password."
    );
  }
};

  return (
    <div className="min-h-screen bg-[#0B1120]">

      <div className="mx-auto max-w-7xl p-6 lg:p-8 space-y-8">

        {/* ================= HERO ================= */}

<div className="rounded-3xl border border-slate-700/40 bg-[#131A2A] p-8">

  <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

    <div>

      <span className="rounded-full bg-cyan-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-cyan-400">
        Account Settings
      </span>

      <h1 className="mt-5 text-4xl font-bold text-white">
        Manage Your Account
      </h1>

      <p className="mt-3 max-w-2xl text-lg leading-8 text-slate-400">
        Update your profile, customize FinanceFlow,
        manage security, and control your financial
        preferences from one place.
      </p>

    </div>

    {/* Profile Summary */}

    <div className="w-full max-w-sm rounded-3xl bg-gradient-to-br from-cyan-500 to-blue-600 p-6 shadow-xl shadow-cyan-500/20">

      <div className="flex items-center gap-4">

        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20 text-2xl font-bold text-white">

          {profile.name
            ? profile.name.charAt(0).toUpperCase()
            : "U"}

        </div>

        <div>

          <h2 className="text-2xl font-bold text-white">
            {profile.name || "FinanceFlow User"}
          </h2>

          <p className="mt-1 text-cyan-100">
            {profile.email || "No email added"}
          </p>

        </div>

      </div>

      {/* Progress */}

      <div className="mt-8">

        <div className="mb-2 flex items-center justify-between text-sm text-cyan-100">

          <span>Profile Completion</span>

          <span>80%</span>

        </div>

        <div className="h-2 overflow-hidden rounded-full bg-white/20">

          <div className="h-full w-4/5 rounded-full bg-white"></div>

        </div>

      </div>

    </div>

  </div>

</div>

       {/* ================= PROFILE ================= */}

<div className="rounded-3xl border border-slate-700/40 bg-[#131A2A] p-8">

  <div className="mb-10 flex items-center gap-4">

    <div className="rounded-2xl bg-cyan-500/10 p-4">

      <User className="h-7 w-7 text-cyan-400" />

    </div>

    <div>

      <h2 className="text-3xl font-bold text-white">
        Profile
      </h2>

      <p className="text-slate-400">
        Update your personal information and account details.
      </p>

    </div>

  </div>

  <form
    onSubmit={handleSubmit}
    className="grid gap-10 xl:grid-cols-[320px_1fr]"
  >

    {/* LEFT */}

    <div className="rounded-3xl border border-slate-700 bg-slate-900/40 p-8">

      <div className="flex flex-col items-center">

        <div className="flex h-40 w-40 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 text-6xl font-bold text-white">

          {profile.name
            ? profile.name.charAt(0).toUpperCase()
            : "U"}

        </div>

        <label className="mt-6 cursor-pointer rounded-xl bg-cyan-500 px-5 py-3 font-medium text-white transition hover:bg-cyan-600">

          Upload Photo

          <input
            hidden
            type="file"
            name="avatar"
            onChange={handleChange}
          />

        </label>

        <p className="mt-5 text-center text-sm text-slate-500">
          JPG, PNG or WEBP
          <br />
          Maximum size 5 MB
        </p>

      </div>

    </div>

    {/* RIGHT */}

    <div className="grid gap-6 md:grid-cols-2">

      <div>

        <label className="mb-2 block text-sm font-medium text-slate-300">
          Full Name
        </label>

        <input
          type="text"
          name="name"
          value={profile.name}
          onChange={handleChange}
          className="w-full rounded-2xl border border-slate-700 bg-slate-900 px-5 py-3 text-white focus:border-cyan-500 focus:outline-none"
        />

      </div>

      <div>

        <label className="mb-2 block text-sm font-medium text-slate-300">
          Email Address
        </label>

        <input
          type="email"
          value={profile.email}
          readOnly
          className="w-full rounded-2xl border border-slate-700 bg-slate-800 px-5 py-3 text-slate-400"
        />

      </div>

      <div>

        <label className="mb-2 block text-sm font-medium text-slate-300">
          Phone Number
        </label>

        <input
          type="text"
          name="phone"
          value={profile.phone}
          onChange={handleChange}
          placeholder="+91 XXXXX XXXXX"
          className="w-full rounded-2xl border border-slate-700 bg-slate-900 px-5 py-3 text-white focus:border-cyan-500 focus:outline-none"
        />

      </div>

      <div>

        <label className="mb-2 block text-sm font-medium text-slate-300">
          Member Since
        </label>

        <input
          type="text"
          value="July 2026"
          readOnly
          className="w-full rounded-2xl border border-slate-700 bg-slate-800 px-5 py-3 text-slate-400"
        />

      </div>

      <div className="md:col-span-2">

        <label className="mb-2 block text-sm font-medium text-slate-300">
          Bio
        </label>

        <textarea
          rows={4}
          placeholder="Tell us something about yourself..."
          className="w-full resize-none rounded-2xl border border-slate-700 bg-slate-900 px-5 py-4 text-white focus:border-cyan-500 focus:outline-none"
        />

      </div>

      <div className="md:col-span-2 flex justify-end">

        <button
          type="submit"
          className="rounded-2xl bg-cyan-500 px-8 py-3 font-semibold text-white transition hover:bg-cyan-600"
        >
          Save Profile
        </button>

      </div>

    </div>

  </form>

</div>
{/* ================= FINANCIAL PREFERENCES ================= */}

<div className="rounded-3xl border border-slate-700/40 bg-[#131A2A] p-8">

  <div className="mb-8 flex items-center gap-4">

    <div className="rounded-2xl bg-emerald-500/10 p-4">

      <Wallet className="h-7 w-7 text-emerald-400" />

    </div>

    <div>

      <h2 className="text-3xl font-bold text-white">
        Financial Preferences
      </h2>

      <p className="text-slate-400">
        Personalize how FinanceFlow manages your finances.
      </p>

    </div>

  </div>

  <div className="grid gap-6 lg:grid-cols-2">

    {/* Currency */}

    <div>

      <label className="mb-2 block text-sm font-medium text-slate-300">
        Default Currency
      </label>

      <select
        name="currency"
        value={profile.currency}
        onChange={handleChange}
        className="w-full rounded-2xl border border-slate-700 bg-slate-900 px-5 py-3 text-white focus:border-cyan-500 focus:outline-none"
      >
        <option value="INR">🇮🇳 Indian Rupee (INR)</option>
        <option value="USD">🇺🇸 US Dollar (USD)</option>
        <option value="EUR">🇪🇺 Euro (EUR)</option>
        <option value="GBP">🇬🇧 British Pound (GBP)</option>
      </select>

    </div>

    {/* Goal */}

    <div>

      <label className="mb-2 block text-sm font-medium text-slate-300">
        Monthly Savings Goal
      </label>

      <input
        type="number"
        name="monthlySavingsGoal"
        value={profile.monthlySavingsGoal}
        onChange={handleChange}
        placeholder="10000"
        className="w-full rounded-2xl border border-slate-700 bg-slate-900 px-5 py-3 text-white focus:border-cyan-500 focus:outline-none"
      />

    </div>

    {/* Budget Reset */}

    <div>

      <label className="mb-2 block text-sm font-medium text-slate-300">
        Budget Reset Day
      </label>

      <select
        className="w-full rounded-2xl border border-slate-700 bg-slate-900 px-5 py-3 text-white"
      >
        <option>1st Day of Month</option>
        <option>5th Day</option>
        <option>10th Day</option>
        <option>15th Day</option>
      </select>

    </div>

    {/* Notifications */}

    <div>

      <label className="mb-2 block text-sm font-medium text-slate-300">
        Monthly Reminder
      </label>

      <select
        className="w-full rounded-2xl border border-slate-700 bg-slate-900 px-5 py-3 text-white"
      >
        <option>Enabled</option>
        <option>Disabled</option>
      </select>

    </div>

  </div>

  <div className="mt-8 flex justify-end">

    <button
      className="rounded-2xl bg-emerald-500 px-8 py-3 font-semibold text-white transition hover:bg-emerald-600"
    >
      Save Preferences
    </button>

  </div>

</div>

       {/* ================= APPEARANCE ================= */}

<div className="rounded-3xl border border-slate-700/40 bg-[#131A2A] p-8">

  <div className="mb-8 flex items-center gap-4">

    <div className="rounded-2xl bg-purple-500/10 p-4">

      <Palette className="h-7 w-7 text-purple-400" />

    </div>

    <div>

      <h2 className="text-3xl font-bold text-white">
        Appearance
      </h2>

      <p className="text-slate-400">
        Choose how FinanceFlow looks.
      </p>

    </div>

  </div>

  <div className="grid gap-8 lg:grid-cols-2">

    {/* Light */}

    <button
      type="button"
      onClick={() =>
        setProfile((prev) => ({
          ...prev,
          theme: "light",
        }))
      }
      className={`group rounded-3xl border p-6 text-left transition-all duration-300 hover:scale-[1.02]
      ${
        profile.theme === "light"
          ? "border-cyan-500 shadow-lg shadow-cyan-500/20"
          : "border-slate-700"
      }`}
    >

      <div className="rounded-2xl bg-white p-5">

        <div className="mb-4 flex gap-2">

          <div className="h-3 w-3 rounded-full bg-red-400" />
          <div className="h-3 w-3 rounded-full bg-yellow-400" />
          <div className="h-3 w-3 rounded-full bg-green-400" />

        </div>

        <div className="space-y-2">

          <div className="h-4 w-3/4 rounded bg-slate-300" />
          <div className="h-4 w-full rounded bg-slate-200" />
          <div className="h-4 w-2/3 rounded bg-slate-300" />

        </div>

      </div>

      <h3 className="mt-5 text-xl font-bold text-white">
        ☀ Light Theme
      </h3>

      <p className="mt-2 text-slate-400">
        Clean appearance for daytime productivity.
      </p>

    </button>

    {/* Dark */}

    <button
      type="button"
      onClick={() =>
        setProfile((prev) => ({
          ...prev,
          theme: "dark",
        }))
      }
      className={`group rounded-3xl border p-6 text-left transition-all duration-300 hover:scale-[1.02]
      ${
        profile.theme === "dark"
          ? "border-cyan-500 shadow-lg shadow-cyan-500/20"
          : "border-slate-700"
      }`}
    >

      <div className="rounded-2xl bg-slate-900 p-5 border border-slate-700">

        <div className="mb-4 flex gap-2">

          <div className="h-3 w-3 rounded-full bg-red-400" />
          <div className="h-3 w-3 rounded-full bg-yellow-400" />
          <div className="h-3 w-3 rounded-full bg-green-400" />

        </div>

        <div className="space-y-2">

          <div className="h-4 w-3/4 rounded bg-slate-600" />
          <div className="h-4 w-full rounded bg-slate-700" />
          <div className="h-4 w-2/3 rounded bg-slate-600" />

        </div>

      </div>

      <h3 className="mt-5 text-xl font-bold text-white">
        🌙 Dark Theme
      </h3>

      <p className="mt-2 text-slate-400">
        Perfect for long work sessions and low-light environments.
      </p>

    </button>

  </div>

</div>
{/* ================= SECURITY ================= */}

<div className="rounded-3xl border border-slate-700/40 bg-[#131A2A] p-8">

  <div className="mb-8 flex items-center gap-4">

    <div className="rounded-2xl bg-red-500/10 p-4">

      <Shield className="h-7 w-7 text-red-400" />

    </div>

    <div>

      <h2 className="text-3xl font-bold text-white">
        Security
      </h2>

      <p className="text-slate-400">
        Update your password to keep your account secure.
      </p>

    </div>

  </div>

  <div className="space-y-6">

    <input
  type="password"
  name="currentPassword"
  placeholder="Current Password"
  value={passwordData.currentPassword}
  onChange={handlePasswordChange}
  className="w-full rounded-2xl border border-slate-700 bg-slate-900 px-5 py-3 text-white focus:border-red-400 focus:outline-none"
/>

<input
  type="password"
  name="newPassword"
  placeholder="New Password"
  value={passwordData.newPassword}
  onChange={handlePasswordChange}
  className="w-full rounded-2xl border border-slate-700 bg-slate-900 px-5 py-3 text-white focus:border-red-400 focus:outline-none"
/>

<input
  type="password"
  name="confirmPassword"
  placeholder="Confirm Password"
  value={passwordData.confirmPassword}
  onChange={handlePasswordChange}
  className="w-full rounded-2xl border border-slate-700 bg-slate-900 px-5 py-3 text-white focus:border-red-400 focus:outline-none"
/>

<button
  type="button"
  onClick={changePassword}
  className="rounded-2xl bg-red-500 px-8 py-3 font-semibold text-white transition hover:bg-red-600"
>
  Change Password
</button>
    </div>

  </div>

</div>

       {/* ================= ACCOUNT INFORMATION ================= */}

<div className="rounded-3xl border border-slate-700/40 bg-[#131A2A] p-8">

  <div className="mb-8 flex items-center gap-4">

    <div className="rounded-2xl bg-blue-500/10 p-4">

      <Mail className="h-7 w-7 text-blue-400" />

    </div>

    <div>

      <h2 className="text-3xl font-bold text-white">
        Account Information
      </h2>

      <p className="text-slate-400">
        View your account details and verification status.
      </p>

    </div>

  </div>

  <div className="grid gap-6 md:grid-cols-2">

    <div className="rounded-2xl border border-slate-700 bg-slate-900/40 p-5">

      <p className="text-sm text-slate-400">
        Email Address
      </p>

      <h3 className="mt-2 text-lg font-semibold text-white">
        {profile.email || "Not Available"}
      </h3>

    </div>

    <div className="rounded-2xl border border-slate-700 bg-slate-900/40 p-5">

      <p className="text-sm text-slate-400">
        Phone Number
      </p>

      <h3 className="mt-2 text-lg font-semibold text-white">
        {profile.phone || "Not Added"}
      </h3>

    </div>

    <div className="rounded-2xl border border-slate-700 bg-slate-900/40 p-5">

      <p className="text-sm text-slate-400">
        Email Verification
      </p>

      <h3 className="mt-2 font-semibold text-green-400">
        ✓ Verified
      </h3>

    </div>

    <div className="rounded-2xl border border-slate-700 bg-slate-900/40 p-5">

      <p className="text-sm text-slate-400">
        Member Since
      </p>

      <h3 className="mt-2 text-lg font-semibold text-white">
        July 2026
      </h3>

    </div>

  </div>

</div>
       {/* ================= DANGER ZONE ================= */}

<div className="rounded-3xl border border-red-500/30 bg-gradient-to-br from-red-950/30 to-red-900/10 p-8">

  <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">

    <div>

      <div className="flex items-center gap-3">

        <div className="rounded-2xl bg-red-500/20 p-4">

          <Shield className="h-7 w-7 text-red-400" />

        </div>

        <div>

          <h2 className="text-3xl font-bold text-red-400">
            Danger Zone
          </h2>

          <p className="mt-1 text-slate-400">
            These actions are permanent and cannot be undone.
          </p>

        </div>

      </div>

      <div className="mt-8 rounded-2xl border border-red-500/20 bg-slate-900/40 p-6">

        <h3 className="text-lg font-semibold text-white">
          Deleting your account will permanently remove:
        </h3>

        <ul className="mt-5 space-y-3 text-slate-300">

          <li>• All transactions</li>
          <li>• Budgets and financial goals</li>
          <li>• Analytics & reports</li>
          <li>• AI assistant conversation history</li>
          <li>• Profile and personal preferences</li>

        </ul>

      </div>

    </div>

    <div className="flex lg:items-end">

      <button
        type="button"
        className="rounded-2xl bg-red-600 px-8 py-3 font-semibold text-white transition hover:bg-red-700"
      >
        Delete Account
      </button>

    </div>

  </div>

</div>
{/* ================= FOOTER ================= */}

<div className="rounded-3xl border border-slate-700/40 bg-[#131A2A] p-6">

  <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

    <div>

      <h3 className="text-lg font-semibold text-white">
        FinanceFlow Settings
      </h3>

      <p className="text-slate-400">
        Your preferences are securely stored and synchronized across your account.
      </p>

    </div>

    <span className="rounded-full bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-400">
      Version 1.0
    </span>

  </div>

</div>
     </div>
  
);

};

export default SettingsPage;