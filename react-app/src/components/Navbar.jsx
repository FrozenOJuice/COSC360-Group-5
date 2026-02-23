import "../styles/Navbar.css"

function Navbar() {

    const jobBoard = () => {
        // Redirect to job board page
    }


    const register = () => {
        // Redirect to register page
    }

    const login = () => {
        // Redirect to login page
    }

    const browseJobs = () => {
        // Redirect to browse jobs page
    }

  return (
    <>
        <div className="Navbar-div">

            <button onClick={jobBoard} className="Navbar-button">
                Job Board
            </button>

            <span>
                <button onClick={register} className="Navbar-button" id="gray-button">
                    Register
                </button>
                <button onClick={login} className="Navbar-button" id="gray-button">
                    Login
                </button>
                <button onClick={browseJobs} className="Navbar-button">
                    Browse Jobs
                </button>
            </span>
        </div>
    </>
  )
}

export default Navbar
