import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import SectionHeading from "../components/common/SectionHeading";
import ProfileForm from "../components/settings/ProfileForm";
import useAuth from "../hooks/useAuth";
import api from "../services/api";
import { DEFAULT_CURRENCY } from "../utils/formatters";

const SettingsPage = () => {
  const { user, setUser, applyTheme } = useAuth();
  const [profile, setProfile] = useState({ name: "", currency: DEFAULT_CURRENCY, theme: "dark", monthlySavingsGoal: 0, avatar: null });

  useEffect(() => {
    if (user) {
      setProfile({
        name: user.name || "",
        currency: user.currency || DEFAULT_CURRENCY,
        theme: user.theme || "dark",
        monthlySavingsGoal: user.monthlySavingsGoal || 0,
        avatar: null
      });
    }
  }, [user]);

  const handleChange = (event) => {
    const { name, value, files } = event.target;
    setProfile((prev) => ({ ...prev, [name]: files ? files[0] : value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const payload = new FormData();
    Object.entries(profile).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        payload.append(key, value);
      }
    });

    try {
      const { data } = await api.put("/profile", payload, { headers: { "Content-Type": "multipart/form-data" } });
      setUser((prev) => ({ ...prev, ...data.profile }));
      applyTheme(data.profile.theme);
      toast.success("Profile updated");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Unable to update profile");
    }
  };

 return (
  <div className="min-h-screen bg-[#0B1120]">

    <div className="mx-auto max-w-7xl space-y-8 p-6 lg:p-8">

      {/* Hero */}

      <div className="rounded-3xl border border-slate-700/40 bg-[#131A2A] p-8">

        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

          <div>

            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-400">

              Settings

            </p>

            <h1 className="mt-3 text-4xl font-bold text-white">

              Profile & Preferences

            </h1>

            <p className="mt-3 max-w-2xl text-lg text-slate-400">

              Personalize your FinanceFlow experience by
              managing your profile, theme, currency and
              savings preferences.

            </p>

          </div>

          <div className="rounded-3xl bg-gradient-to-br from-cyan-500 to-blue-600 px-8 py-6 shadow-lg shadow-cyan-500/20">

            <p className="text-cyan-100">

              Active Theme

            </p>

            <h2 className="mt-2 text-4xl font-bold text-white">

              {profile.theme}

            </h2>

          </div>

        </div>

      </div>

      {/* Main Layout */}

      <section className="grid gap-8 xl:grid-cols-[1.4fr_0.6fr]">

        {/* Form */}

        <div className="rounded-3xl border border-slate-700/40 bg-[#131A2A] p-8">

          <ProfileForm
            profile={profile}
            onChange={handleChange}
            onSubmit={handleSubmit}
          />

        </div>

        {/* Preview */}

        <div className="rounded-3xl border border-slate-700/40 bg-[#131A2A] p-8">

          <div className="flex flex-col items-center">

            <div className="flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 text-4xl font-bold text-white">

              {profile.name
                ? profile.name.charAt(0).toUpperCase()
                : "U"}

            </div>

            <h2 className="mt-6 text-2xl font-bold text-white">

              {profile.name || "FinanceFlow User"}

            </h2>

            <p className="mt-2 text-slate-400">

              Personal Finance Dashboard

            </p>

          </div>

          <div className="mt-10 space-y-5">

            <div className="rounded-2xl bg-slate-900/60 p-5">

              <p className="text-sm text-slate-400">

                Currency

              </p>

              <h3 className="mt-2 text-xl font-semibold text-white">

                {profile.currency}

              </h3>

            </div>

            <div className="rounded-2xl bg-slate-900/60 p-5">

              <p className="text-sm text-slate-400">

                Theme

              </p>

              <h3 className="mt-2 text-xl font-semibold text-white">

                {profile.theme}

              </h3>

            </div>

            <div className="rounded-2xl bg-slate-900/60 p-5">

              <p className="text-sm text-slate-400">

                Savings Goal

              </p>

              <h3 className="mt-2 text-xl font-semibold text-green-400">

                ₹{profile.monthlySavingsGoal}

              </h3>

            </div>

          </div>

        </div>

      </section>

    </div>

  </div>
);
};

export default SettingsPage;
