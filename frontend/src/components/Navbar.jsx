import "../styles/Navbar.css";

function Navbar({ role }) {
    const browseButtonText = role === "employer" ? "View Listings" : "Browse Jobs";

  return (
    <header className="navbar">
        <a href="#top" className="brand-mark">
            Job Board
        </a>

        <nav className="buttons-right" aria-label="Primary navigation">
            {!role && (
                <>
                    <a href="#register" className="navbar-button navbar-button-muted">
                        Register
                    </a>
                    <a href="#login" className="navbar-button navbar-button-muted">
                        Login
                    </a>
                </>
            )}

            <a href="#jobs" className="navbar-button">
                {browseButtonText}
            </a>
        </nav>
    </header>
  );
}

export default Navbar;
