import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";

import { register } from "../../store/action/auth";
import styles from "./form.module.css";

const Register = ({ register, isAuthenticated }) => {
  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });
  const { name, email, password, password2 } = state;
  const onChange = e => {
    e.preventDefault();
    setState({ ...state, [e.target.name]: e.target.value });
  };
  const onSubmit = e => {
    e.preventDefault();
    if (password === password2) {
      register(name, email, password);
      setState({
        name: "",
        email: "",
        password: "",
        password2: "",
      });
    } else {
      return;
    }
  };
  if (isAuthenticated) {
    return <Redirect to="/private/dashboard" />;
  }
  return (
    <form className={styles.form} onSubmit={e => onSubmit(e)}>
      <div className={styles.formGroup}>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          name="name"
          value={name}
          onChange={e => onChange(e)}
          type="text"
          required
          maxLength="50"
          pattern="[-_a-zA-Z0-9]*"
        />
      </div>
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
      <div className={styles.formGroup}>
        <label htmlFor="password2">Passwort bestätigen</label>
        <input
          className={password !== password2 ? `${styles.borderDanger}` : null}
          id="password2"
          name="password2"
          value={password2}
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

Register.propTypes = {
  isAuthenticated: PropTypes.bool,
  register: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(
  mapStateToProps,
  { register }
)(Register);
