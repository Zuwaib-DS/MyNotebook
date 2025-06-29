import { Link } from "react-router-dom";
import logo from "../logo.svg";
import ProfileDropdown from "./ProfileDropdown";
import { useSelector } from "react-redux";

function Navbar() {
  const amount = useSelector((state) => state.amount);
  return (
    <nav
      className="navbar bg-dark border-bottom navbar-expand-lg"
      data-bs-theme="dark"
    >
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img src={logo} className="App-logo" alt="logo" />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">
                My Notes
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" aria-current="page" to="/balance">
                Balance ({amount})
              </Link>
            </li>
          </ul>
          <ProfileDropdown />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
