import { AdminNavbar, Footer, Navbar } from "@/components/layout/Navbar";
import { Toaster } from "@/components/ui/sonner";
import { AdminLoginPage } from "@/pages/AdminLoginPage";
import { CandidatesPage } from "@/pages/CandidatesPage";
import { HomePage } from "@/pages/HomePage";
import { JoinPage } from "@/pages/JoinPage";
import { MLAsPage } from "@/pages/MLAsPage";
import { SupportersPage } from "@/pages/SupportersPage";
import { AdminDashboard } from "@/pages/admin/AdminDashboard";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";

// ─── Layout Wrappers ──────────────────────────────────────────────────────────

function PublicLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

function AdminLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <AdminNavbar />
      <div className="flex-1">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

// ─── Routes ───────────────────────────────────────────────────────────────────

const rootRoute = createRootRoute();

// Public layout route
const publicLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: "public",
  component: PublicLayout,
});

const homeRoute = createRoute({
  getParentRoute: () => publicLayoutRoute,
  path: "/",
  component: HomePage,
});

const mlasRoute = createRoute({
  getParentRoute: () => publicLayoutRoute,
  path: "/mlas",
  component: MLAsPage,
});

const candidatesRoute = createRoute({
  getParentRoute: () => publicLayoutRoute,
  path: "/candidates",
  component: CandidatesPage,
});

const supportersRoute = createRoute({
  getParentRoute: () => publicLayoutRoute,
  path: "/supporters",
  component: SupportersPage,
});

const joinRoute = createRoute({
  getParentRoute: () => publicLayoutRoute,
  path: "/join",
  component: JoinPage,
});

// Admin layout route
const adminLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: "admin",
  path: "/admin",
  component: AdminLayout,
});

const adminLoginRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: "/",
  component: AdminLoginPage,
});

const adminDashboardRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: "/dashboard",
  component: AdminDashboard,
});

// ─── Router ────────────────────────────────────────────────────────────────────

const routeTree = rootRoute.addChildren([
  publicLayoutRoute.addChildren([
    homeRoute,
    mlasRoute,
    candidatesRoute,
    supportersRoute,
    joinRoute,
  ]),
  adminLayoutRoute.addChildren([adminLoginRoute, adminDashboardRoute]),
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

// ─── App ───────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster richColors position="top-right" />
    </>
  );
}
