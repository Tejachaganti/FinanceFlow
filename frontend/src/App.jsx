import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import AppShell from "./components/layout/AppShell.jsx";
import ProtectedRoute from "./components/layout/ProtectedRoute.jsx";
import Loader from "./components/common/Loader.jsx";
import ErrorBoundary from "./components/common/ErrorBoundary.jsx";

const LandingPage = lazy(() => import("./pages/LandingPage.jsx"));
const LoginPage = lazy(() => import("./pages/LoginPage.jsx"));
const RegisterPage = lazy(() => import("./pages/RegisterPage.jsx"));
const DashboardPage = lazy(() => import("./pages/DashboardPage.jsx"));
const ExpensesPage = lazy(() => import("./pages/ExpensesPage.jsx"));
const AnalyticsPage = lazy(() => import("./pages/AnalyticsPage.jsx"));
const BudgetPage = lazy(() => import("./pages/BudgetPage.jsx"));
const AIAssistantPage = lazy(() => import("./pages/AIAssistantPage.jsx"));
const SettingsPage = lazy(() => import("./pages/SettingsPage.jsx"));
const NotificationCenterPage = lazy(() => import("./pages/NotificationCenterPage.jsx"));
const GlobalSearchPage = lazy(() => import("./pages/GlobalSearchPage.jsx"));
const ReportsPage = lazy(() => import("./pages/ReportsPage.jsx"));
const ForgotPasswordPage = lazy(() => import("./pages/ForgotPasswordPage.jsx"));
const ResetPasswordPage = lazy(() => import("./pages/ResetPasswordPage.jsx"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage.jsx"));

const App = () => (
  <>
    <Toaster
      position="top-right"
      reverseOrder={false}
      toastOptions={{
        duration: 3000,
        style: {
          background: "#131A2A",
          color: "#fff",
          border: "1px solid #334155",
          borderRadius: "12px",
        },
      }}
    />

    <ErrorBoundary>
    <Suspense fallback={<Loader fullScreen label="Loading FinanceFlow" />}>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password/:token" element={<ResetPasswordPage />} />

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
          <Route path="ai-assistant" element={<AIAssistantPage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="notifications" element={<NotificationCenterPage />} />
          <Route path="search" element={<GlobalSearchPage />} />
          <Route path="reports" element={<ReportsPage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
    </ErrorBoundary>
  </>
);

export default App;
