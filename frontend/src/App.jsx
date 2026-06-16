import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import AppShell from "./components/layout/AppShell.jsx";
import ProtectedRoute from "./components/layout/ProtectedRoute.jsx";
import Loader from "./components/common/Loader.jsx";

const LandingPage = lazy(() => import("./pages/LandingPage.jsx"));
const LoginPage = lazy(() => import("./pages/LoginPage.jsx"));
const RegisterPage = lazy(() => import("./pages/RegisterPage.jsx"));
const DashboardPage = lazy(() => import("./pages/DashboardPage.jsx"));
const ExpensesPage = lazy(() => import("./pages/ExpensesPage.jsx"));
const AnalyticsPage = lazy(() => import("./pages/AnalyticsPage.jsx"));
const BudgetPage = lazy(() => import("./pages/BudgetPage.jsx"));
const SettingsPage = lazy(() => import("./pages/SettingsPage.jsx"));

const App = () => (
  <Suspense fallback={<Loader fullScreen label="Loading FinanceFlow" />}>
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route
        path="/app"
        element={
          <ProtectedRoute>
            <AppShell />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="expenses" element={<ExpensesPage />} />
        <Route path="analytics" element={<AnalyticsPage />} />
        <Route path="budget" element={<BudgetPage />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </Suspense>
);

export default App;
