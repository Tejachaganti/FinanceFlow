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
    <div className="space-y-4">
      <SectionHeading title="Profile & preferences" subtitle="Control theme, currency, avatar, and savings targets for a personalized workspace." />
      <ProfileForm profile={profile} onChange={handleChange} onSubmit={handleSubmit} />
    </div>
  );
};

export default SettingsPage;
