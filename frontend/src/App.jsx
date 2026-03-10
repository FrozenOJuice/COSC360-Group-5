import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import EmployerPage from "./pages/EmployerPage";
import HomePage from "./pages/HomePage";
import JobSeekerPage from "./pages/JobSeekerPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { apiFetch } from "./lib/api";
import {
  getCurrentPage,
  getLandingHash,
  getRequiredRoleForPage,
} from "./lib/authRoutes";
import "./styles/App.css";

function App() {
  const [hash, setHash] = useState(() => window.location.hash);
  const [authUser, setAuthUser] = useState(null);
  const [authResolved, setAuthResolved] = useState(false);

  useEffect(() => {
    const handleHashChange = () => setHash(window.location.hash);

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function syncSession() {
      try {
        const response = await apiFetch("/api/auth/me", {
          method: "GET",
        });
        const data = await response.json();

        if (cancelled) return;
        setAuthUser(response.ok ? data.user : null);
      } catch (error) {
        if (!cancelled) {
          setAuthUser(null);
        }
      } finally {
        if (!cancelled) {
          setAuthResolved(true);
        }
      }
    }

    syncSession();
    return () => {
      cancelled = true;
    };
  }, []);

  const currentPage = getCurrentPage(hash);
  const requiredRole = getRequiredRoleForPage(currentPage);
  const navbarVariant = currentPage === "jobSeeker" && authUser?.role === "seeker"
    ? "jobSeeker"
    : currentPage === "employer" && authUser?.role === "employer"
      ? "employer"
      : "public";

  useEffect(() => {
    if (!authResolved || !requiredRole) {
      return;
    }

    let cancelled = false;

    async function validateProtectedSession() {
      try {
        const response = await apiFetch("/api/auth/me", {
          method: "GET",
        });
        const data = await response.json();

        if (cancelled) return;
        setAuthUser(response.ok ? data.user : null);
      } catch (error) {
        if (!cancelled) {
          setAuthUser(null);
        }
      }
    }

    validateProtectedSession();
    return () => {
      cancelled = true;
    };
  }, [authResolved, currentPage, requiredRole]);

  useEffect(() => {
    if (!authResolved) return;

    if (requiredRole) {
      if (!authUser) {
        if (window.location.hash !== "#login") {
          window.location.hash = "#login";
        }
        return;
      }

      if (authUser.role !== requiredRole) {
        const landingHash = getLandingHash(authUser.role);
        if (window.location.hash !== landingHash) {
          window.location.hash = landingHash;
        }
      }
      return;
    }

    if (authUser && (currentPage === "login" || currentPage === "register")) {
      const landingHash = getLandingHash(authUser.role);
      if (window.location.hash !== landingHash) {
        window.location.hash = landingHash;
      }
    }
  }, [authResolved, authUser, currentPage, requiredRole]);

  function handleAuthSuccess(user) {
    setAuthUser(user);
    setAuthResolved(true);
    window.location.hash = getLandingHash(user.role);
  }

  function handleLogout() {
    setAuthUser(null);
    setAuthResolved(true);
    window.location.hash = "#top";
  }

  const shouldShowProtectedPage =
    authResolved && authUser && (!requiredRole || authUser.role === requiredRole);

  return (
    <div className="app-shell">
      <Navbar variant={navbarVariant} onLogout={handleLogout} />
      {!authResolved && requiredRole ? (
        <main className="page-status">Checking session...</main>
      ) : null}
      {currentPage === "employer" && shouldShowProtectedPage ? <EmployerPage /> : null}
      {currentPage === "jobSeeker" && shouldShowProtectedPage ? <JobSeekerPage /> : null}
      {currentPage === "login" ? <LoginPage onAuthSuccess={handleAuthSuccess} /> : null}
      {currentPage === "register" ? <RegisterPage onAuthSuccess={handleAuthSuccess} /> : null}
      {currentPage === "home" ? <HomePage /> : null}
    </div>
  );
}

export default App;
