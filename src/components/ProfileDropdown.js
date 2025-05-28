import UserAuth from "../helpers/UserAuth";
import { useNavigate } from "react-router-dom"; 


function ProfileDropdown() {
    const navigate = useNavigate();

  const handleLogout = () => {
    UserAuth.clearAuth();
    navigate("/login");
  };

  return (
    <div className="dropdown text-end">
      <a
        href="#"
        className="d-flex align-items-center text-decoration-none dropdown-toggle"
        id="profileDropdown"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <img
          src="/images/dp-placeholder.png"
          alt="User"
          width="40"
          height="40"
          className="rounded-circle me-2"
        />
        <span className="d-none d-md-inline">Zuwaib</span>
      </a>
      <ul
        className="dropdown-menu dropdown-menu-end text-small shadow"
        aria-labelledby="profileDropdown"
      >
        {/* <li>
          <a className="dropdown-item" href="/profile">
            Profile
          </a>
        </li>
        <li>
          <a className="dropdown-item" href="/change-password">
            Change Password
          </a>
        </li> */}
        <li>
          <hr className="dropdown-divider" />
        </li>
        <li>
          <button className="dropdown-item" onClick={handleLogout}>
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
}

export default ProfileDropdown;
