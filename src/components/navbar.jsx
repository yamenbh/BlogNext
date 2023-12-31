import React from "react";
import { Link } from "react-router-dom";




const Navbar = () => {

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/';
  };

  return (
    <div className="header">
      {/* Header content goes here */}
      <div className="header">
        {/* Logo */}
        <div className="header-left">
          <Link to="/Mainindex" className="logo">
            <h6>NextBlog</h6>
          </Link>
        </div>
        
        {/* /Logo */}
        <a id="toggle_btn" href="#toggle-menu">
          <span className="bar-icon">
            <span />
            <span />
            <span />
          </span>
        </a>
        {/* Header Title */}
        <div className="page-title-box">
          <h3>Next Blog</h3>
        </div>
        {/* /Header Title */}
        <Link id="mobile_btn" className="mobile_btn">
          <i className="fa fa-bars" />
        </Link>

        {/* Header Menu */}
        <ul className="nav user-menu">
          <li className="nav-item dropdown has-arrow main-drop">
            <Link to="#" className="dropdown-toggle nav-link" data-toggle="dropdown">
              <span className="user-img">
                <img src="assets/images/author.jpg" alt="User Avatar" />
                <span className="status online" />
              </span>
              
            </Link>
            <div className="dropdown-menu">
              <Link className="dropdown-item" to="/profile">
                Mon Profile
              </Link>
              <Link className="dropdown-item" to="/Settings">
              Paramètres
              </Link>
              <Link className="dropdown-item" onClick={handleLogout}>
              Se déconnecter
              </Link>
            </div>
          </li>
        </ul>
        {/* /Header Menu */}
        {/* Mobile Menu */}
        <div className="dropdown mobile-user-menu">
          <Link to="#" className="nav-link dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
            <i className="fa fa-ellipsis-v" />
          </Link>
          <div className="dropdown-menu dropdown-menu-right">
            <Link className="dropdown-item" to="/profile">
              Mon Profile
            </Link>
            <Link className="dropdown-item" to="/settings">
            Paramètres
            </Link>
            <Link className="dropdown-item" onClick={handleLogout}>
            Se déconnecter
            </Link>
          </div>
        </div>
        {/* /Mobile Menu */}
      </div>
    </div>
  );
};

export default Navbar;
