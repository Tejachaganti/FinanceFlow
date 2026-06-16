/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        display: ["Poppins", "sans-serif"],
        body: ["Manrope", "sans-serif"]
      },
      boxShadow: {
        glass: "0 20px 45px rgba(15, 23, 42, 0.22)"
      },
      colors: {
        brand: {
          50: "#f1f5ff",
          100: "#dbe7ff",
          500: "#2563eb",
          600: "#1d4ed8",
          700: "#1e40af"
        }
      },
      backgroundImage: {
        mesh: "radial-gradient(circle at top left, rgba(14,165,233,0.15), transparent 30%), radial-gradient(circle at 80% 20%, rgba(59,130,246,0.18), transparent 25%), radial-gradient(circle at bottom right, rgba(16,185,129,0.12), transparent 30%)"
      }
    }
  },
  plugins: []
};
