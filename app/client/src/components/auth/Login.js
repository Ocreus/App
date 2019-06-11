import React, { useState } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";

import styles from "./form.module.css";
import { login } from "../../store/action/auth";
const Login = ({ login, auth: { isAuthenticated } }) => {
  const [state, setState] = useState({
    email: "",
    password: "",
  });
  const { email, password } = state;
  const onChange = e => {
    e.preventDefault();
    setState({ ...state, [e.target.name]: e.target.value });
  };
  const onSubmit = e => {
    e.preventDefault();
    login(email, password);
    setState({
      email: "",
      password: "",
    });
  };
  if (isAuthenticated) {
    return <Redirect to="/private/dashboard" />;
  }

  return (
    <form className={styles.form} onSubmit={e => onSubmit(e)}>
      <div className={styles.formGroup}>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          value={email}
          onChange={e => onChange(e)}
          type="email"
          required
          maxLength="50"
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          value={password}
          onChange={e => onChange(e)}
          type="password"
          required
          maxLength="50"
        />
      </div>
      <button type="submit">Senden</button>
    </form>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mstp = state => ({
  auth: state.auth,
});
export default connect(
  mstp,
  { login }
)(Login);
