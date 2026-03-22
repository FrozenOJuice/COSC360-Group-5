import { useEffect, useState } from "react";
import { useAuth } from "./auth/useAuth";
import Navbar from "./components/Navbar";
import RouteGuard from "./routing/RouteGuard";
import { getNavbarVariant, resolveRoute } from "./routing/routes";
import "./styles/App.css";

function App() {
  const [hash, setHash] = useState(() => window.location.hash);
  const { loading: authLoading, user: authUser } = useAuth();

  useEffect(() => {
    const handleHashChange = () => setHash(window.location.hash);

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const route = resolveRoute(hash);
  const navbarVariant = getNavbarVariant(authUser);

  return (
    <div className="app-shell">
      <Navbar variant={navbarVariant} />
      <RouteGuard route={route} authLoading={authLoading} authUser={authUser} />
    </div>
  );
}

export default App;
