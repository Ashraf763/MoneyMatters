import { NavLink } from "react-router-dom";
import "./index.css";

function Sidebar() {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="min-vh-100 d-flex flex-column justify-content-between sidebar">
          <div>
            <a
              href="/"
              className="text-decoration-none d-flex ms-3 my-3 py-lg-2"
            >
              <img
                src="/money-matters-logo.png"
                alt="Money-Maters"
                className="header-logo"
              />
              <span className="d-none d-lg-inline orange-text fw-bold ms-2">
                Money <span className="text-success">Matters</span>
              </span>
            </a>

            <hr className="text-secondary" />

            <ul className="nav nav-pills flex-column sidebar">
              <li className="nav-item my-1">
                <NavLink
                  to="/"
                  className={`nav-link text-start ${({ isActive }) =>
                    isActive && "active"}`}
                >
                  <i className="bi bi-house-door-fill fs-5"></i>
                  <span className="ms-3 d-none d-lg-inline">Dashboard</span>
                </NavLink>
              </li>
              <li className="nav-item my-1">
                <NavLink
                  to="/transactions"
                  className={`nav-link text-start ${({ isActive }) =>
                    isActive && "active"}`}
                >
                  <i className="bi bi-currency-exchange fs-5"></i>
                  <span className="ms-3 d-none d-lg-inline">Transactions</span>
                </NavLink>
              </li>
              <li className="nav-item my-1">
                <NavLink
                  to="/Profile"
                  className={`nav-link text-start ${({ isActive }) =>
                    isActive && "active"}`}
                >
                  <i className="bi bi-person-fill fs-5"></i>
                  <span className="ms-3 d-none d-lg-inline">Profile</span>
                </NavLink>
              </li>
            </ul>
          </div>

          <div className="mb-3">
            <hr className="text-secondary" />
            <div className="d-flex justify-content-around align-items-center">
              <i className="bi bi-person-circle fs-3"></i>

              <div className="d-none d-lg-inline mx-1">
                <p className="m-0 text-start name">Ashraf</p>
                <p className="m-0 mail">imashraf07@gmail.com</p>
              </div>

              <button className="btn d-none d-lg-inline">
                <i className="bi bi-box-arrow-right"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
