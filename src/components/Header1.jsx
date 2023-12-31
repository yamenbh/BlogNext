import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Header1 = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const userToken = localStorage.getItem('jwtToken');
    setIsLoggedIn(!!userToken);
  }, []);

  return (
    <header className="sticky-top bg-white border-bottom border-default">
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-white">
          <Link className="navbar-brand" to="/">
            <h6>NextBlog</h6>
          </Link>
          <button className="navbar-toggler border-0" type="button" data-toggle="collapse" data-target="#navigation">
            <i className="ti-menu" />
          </button>
          <div className="collapse navbar-collapse text-center" id="navigation">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item dropdown">
                <Link className="nav-link" to="/" role="button" aria-haspopup="true" aria-expanded="false">
                  Homepage
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/about">
                  About
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/contact">
                  Contact
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/author" role="button" aria-haspopup="true" aria-expanded="false">
                  Author
                </Link>
              </li>
              <li className="nav-item">
                {isLoggedIn ? (
                  <Link className="nav-link" to="/Mainindex">
                    Dashboard
                  </Link>
                ) : (
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                )}
              </li>
            </ul>
            {/* search */}
            <div className="search px-4">
              <button id="searchOpen" className="search-btn">
                <i className="ti-search" />
              </button>
              <div className="search-wrapper">
                <form action="" className="h-100">
                  <input
                    className="search-box pl-4"
                    id="search-query"
                    name="s"
                    type="search"
                    placeholder="Type & Hit Enter..."
                  />
                </form>
                <button id="searchClose" className="search-close">
                  <i className="ti-close text-dark" />
                </button>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header1;
