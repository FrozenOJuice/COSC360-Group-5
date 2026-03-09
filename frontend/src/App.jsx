import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import "./styles/App.css";

function getCurrentPage(hash) {
  if (hash === "#login") return "login";
  return hash === "#register" ? "register" : "home";
}

function App() {
  const [hash, setHash] = useState(() => window.location.hash);

  useEffect(() => {
    const handleHashChange = () => setHash(window.location.hash);

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const currentPage = getCurrentPage(hash);

  return (
    <div className="app-shell">
      <Navbar />
      {currentPage === "login" ? <LoginPage /> : null}
      {currentPage === "register" ? <RegisterPage /> : null}
      {currentPage === "home" ? <HomePage /> : null}
    </div>
  );
}

export default App;
