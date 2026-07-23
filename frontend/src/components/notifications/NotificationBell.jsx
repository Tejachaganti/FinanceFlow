import { Bell } from "lucide-react";

const NotificationBell = () => {
  return (
    <button className="relative rounded-xl p-2 hover:bg-slate-800 transition">
      <Bell className="text-white" size={22} />

      <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
        0
      </span>
    </button>
  );
};

export default NotificationBell;