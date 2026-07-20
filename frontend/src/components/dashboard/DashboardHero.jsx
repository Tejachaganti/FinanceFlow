import {
  Wallet,
  ArrowDown,
  PieChart,
  CreditCard,
} from "lucide-react";

const DashboardHero = ({ user, snapshot }) => {
  const hour = new Date().getHours();

  let greeting = "Good Evening";

  if (hour < 12) greeting = "Good Morning";
  else if (hour < 18) greeting = "Good Afternoon";

  const items = [
    {
      label: "Savings",
      value: snapshot?.savings || 0,
      icon: Wallet,
      color: "from-blue-500 to-cyan-500",
    },
    {
      label: "Spent",
      value: snapshot?.spent || 0,
      icon: ArrowDown,
      color: "from-pink-500 to-rose-500",
    },
    {
      label: "Remaining",
      value: snapshot?.remaining || 0,
      icon: PieChart,
      color: "from-orange-400 to-amber-500",
    },
    {
      label: "Total Balance",
      value: snapshot?.balance || 0,
      icon: CreditCard,
      color: "from-green-500 to-emerald-500",
    },
  ];

  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#4F46E5] via-[#5B3DF5] to-[#2563EB] p-8 shadow-2xl">

      {/* Background decoration */}
      <div className="absolute right-0 top-0 h-full w-96 opacity-10">
        <div className="absolute right-0 top-0 h-80 w-80 rounded-full bg-white blur-3xl" />
      </div>

      <div className="relative z-10">

        <h1 className="text-4xl font-bold text-white">
          {greeting}, {user?.name?.split(" ")[0]} 👋
        </h1>

        <p className="mt-2 text-indigo-100">
          Here's your financial overview.
        </p>

        <div className="mt-10 grid grid-cols-2 gap-6 md:grid-cols-4">

          {items.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.label}
                className="flex items-center gap-4"
              >
                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${item.color} shadow-lg`}
                >
                  <Icon size={24} className="text-white" />
                </div>

                <div>
                  <p className="text-sm text-indigo-100">
                    {item.label}
                  </p>

                  <h2 className="mt-1 text-3xl font-bold text-white">
                    ₹{item.value}
                  </h2>
                </div>
              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
};

export default DashboardHero;