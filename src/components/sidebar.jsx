import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

const Sidebar = () => {

  return (
   <div className="sidebar" id="sidebar">
        <div className="sidebar-inner slimscroll">
          <div id="sidebar-menu" className="sidebar-menu">
            <ul>
              <li className="menu-title"> 
                <span>Principal</span>
              </li>
              <li className="">
                <Link to="/"><i className="la la-dashboard" /> <span> Our Blog</span></Link>
              </li>

            <li className="">
              <Link to="/categorie"><i className="la la-home" /> <span> Catégories </span></Link>
            </li>

            <li className="menu-title"> 
              <span>Articles</span>
            </li>
            <li className="">
            <Link to="/Post" className="noti-dot"><i className="la la-opencart" /> <span> Post</span> </Link>
            </li>

              <li className="menu-title"> 
                <span>Pages</span>
              </li>
              <li> 
                <Link to="/Profile"><i className="la la-user" /> <span>Profil</span></Link>
              </li>

            </ul>
          </div>
        </div>
      </div>
  );
};

export default Sidebar;
