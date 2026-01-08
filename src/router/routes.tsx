import { ReactNode, lazy } from "react";
import { Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { SuspenseWrapper } from "@/router/SuspenseWrapper";

// Lazy loaded pages
const Login = lazy(() => import("@/pages/auth/login/LoginPage"));
const Dashboard = lazy(
  () => import("@/pages/dashboard-pages/home/DashboardPage")
);
const VariactionsPage = lazy(
  () => import("@/pages/dashboard-pages/variactions-page/VariactionsPage")
);
const SettingsPage = lazy(
  () => import("@/pages/dashboard-pages/settings-page/SettingsPage")
);

export type AppRoute = {
  path: string;
  element: ReactNode;
  children?: AppRoute[];
};

export const routes: AppRoute[] = [
  {
    path: "/",
    element: <Navigate to="/dashboard" replace />,
  },
  {
    path: "/login",
    element: (
      <SuspenseWrapper>
        <Login />
      </SuspenseWrapper>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "",
        element: (
          <SuspenseWrapper>
            <Dashboard />
          </SuspenseWrapper>
        ),
      },
      {
        path: "profile",
        element: (
          <SuspenseWrapper>
            <VariactionsPage />
          </SuspenseWrapper>
        ),
      },
      {
        path: "settings",
        element: (
          <SuspenseWrapper>
            <SettingsPage />
          </SuspenseWrapper>
        ),
      },
    ],
  },
];
