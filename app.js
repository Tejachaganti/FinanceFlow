const THEME_KEY = "financeflow_workspace_theme";
const toggleButton = document.getElementById("theme-toggle");

const applyTheme = (theme) => {
  document.body.classList.toggle("light", theme === "light");
  localStorage.setItem(THEME_KEY, theme);
  if (toggleButton) {
    toggleButton.textContent = theme === "light" ? "Switch to Dark" : "Switch to Light";
  }
};

const initialTheme = localStorage.getItem(THEME_KEY) || "dark";
applyTheme(initialTheme);

toggleButton?.addEventListener("click", () => {
  const isLight = document.body.classList.contains("light");
  applyTheme(isLight ? "dark" : "light");
});
