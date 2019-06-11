import React, { Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import { logout } from "../../store/action/auth";

const Navbar = ({ isAuthenticated, logout }) => {
  const onClick = e => {
    e.preventDefault();
    logout();
  };

  const guestLinks = (
    <ul className="nav-ul right">
      <li className="nav-li">
        <Link to="/anmelden" className="nav-a">
          Anmelden
        </Link>
      </li>
      <li className="nav-li">
        <Link to="/registrieren" className="nav-a">
          Registrieren
        </Link>
      </li>
    </ul>
  );
  const userLinks = (
    <Fragment>
      <ul className="nav-ul left">
        <li className="nav-li">
          <Link to="/private/forum" className="nav-a">
            Forum
          </Link>
        </li>
        <li className="nav-li">
          <Link to="/private/nachrichten" className="nav-a">
            Nachrichten
          </Link>
        </li>
        <li className="nav-li">
          <Link to="/private/konto" className="nav-a">
            Konto
          </Link>
        </li>
      </ul>
      <ul className="nav-ul right">
        <li className="nav-li">
          <Link to="/logout" onClick={e => onClick(e)} className="nav-a">
            logout
          </Link>
        </li>
      </ul>
    </Fragment>
  );
  return (
    <nav className="nav">
      <div className="brand">
        <Link to={isAuthenticated ? "/private/dashboard" : "/"}>Khambaisi</Link>
      </div>
      {isAuthenticated ? userLinks : guestLinks}
    </nav>
  );
};

Navbar.propTypes = {
  isAuthenticated: PropTypes.bool,
  logout: PropTypes.func.isRequired,
};

const mstp = state => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(
  mstp,
  { logout }
)(Navbar);
