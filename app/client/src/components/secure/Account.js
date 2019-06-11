import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import moment from "moment";
import axios from "axios";

const Account = ({ user }) => {
  const [state, setState] = useState({
    name: "",
    email: "",
  });
  if (!user) {
    return "Loading...";
  } else {
    const { name, email, date } = user;

    const onChange = e => {
      setState({ ...state, [e.target.name]: e.target.value });
    };

    const onClick = e => {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      // if (!state.name && !state.email)
      //   return console.log("Das Feld darf nicht leer sein");
      switch (e.target.name) {
        case "name":
          const body = { name: state.name };
          axios.put("/api/profile", body, config);
          break;
        case "email":
          axios.put("/api/profile", { email: state.email }, config);
          break;
        default:
          throw new Error("Default switch case in Account.js");
      }
    };

    return (
      <div className="container">
        <h1>Konto</h1>
        <h3>Hier sind deine Daten</h3>
        <hr />

        <div className="formTable">
          <div className="formSettings">
            <label htmlFor="name">Name</label>

            <input
              type="text"
              name="name"
              value={state.name}
              required
              maxLength="50"
              onChange={e => onChange(e)}
            />
            <button name="name" type="button" onClick={e => onClick(e)}>
              Ändern
            </button>
            <p className="currentValue">{name}</p>
          </div>

          <div className="formSettings">
            <label htmlFor="email">Email-Addresse</label>

            <input
              type="text"
              name="email"
              value={state.email}
              required
              maxLength="50"
              onChange={e => onChange(e)}
            />
            <button name="email" type="button" onClick={e => onClick(e)}>
              Ändern
            </button>
            <p className="currentValue">{email}</p>
          </div>
          <small>Erstellt am {moment(date).toLocaleString()}</small>
        </div>
      </div>
    );
  }
};

Account.propTypes = {
  user: PropTypes.object,
};

const mstp = state => ({
  user: state.auth.user,
});

export default connect(mstp)(Account);
