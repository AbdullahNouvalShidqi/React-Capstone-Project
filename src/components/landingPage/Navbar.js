import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Symbol from "../../assets/image/Symbol.png";
import { activeNavItem } from "../../redux/reducers/navbarSlice";

const Navbar = () => {

  const navigate = useNavigate();

  const currentActiveNavItem = useSelector(activeNavItem);

  const cobaGratisOnClick = () => {
    navigate('/register');
  }

  const navItemOnClick = (px) => {
    window.scrollTo({
      top: px,
      behavior: "auto"
    })
  }

  return (
    <nav className="navbar sticky-top navbar-expand-lg bg-light">
      <div className="container">
        <a className="navbar-brand" href="#home">
          <img
            src={Symbol}
            alt="Logo"
            width="32"
            height="32"
            className="img-fluid me-2"
          />
          My<span className="span-invoice">INVOICE</span>
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item mx-3">
              <div className={`nav-link ${currentActiveNavItem === 'home' ? 'active' : ''}`} aria-current="page" onClick={() => navItemOnClick(0)}>
                Home
              </div>
            </li>
            <li className="nav-item mx-3">
              <div className={`nav-link ${currentActiveNavItem === 'fitur' ? 'active' : ''}`} onClick={() => navItemOnClick(1180)}>
                Fitur
              </div>
            </li>
            <li className="nav-item mx-3">
              <div className={`nav-link ${currentActiveNavItem === 'testimoni' ? 'active' : ''}`} onClick={() => navItemOnClick(3300)}>
                Testimoni
              </div>
            </li>
          </ul>
          <button class="button-primary" onClick={cobaGratisOnClick}>Coba Sekarang</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;