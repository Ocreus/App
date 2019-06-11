import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Moment from "react-moment";

import { update } from "../store/action/update";

const Index = ({ stateUpdate, update }) => {
  if (stateUpdate === null) {
    update();
    return "Loading...";
  } else {
    const { payload } = stateUpdate;

    let count = 1;

    return (
      <div className="container">
        <h1>Full-Stack-Test</h1>
        <p>
          Dies ist eine Testseite für mich, damit ich React, nodeJS und MongoDB
          besser verstehe.
        </p>
        <h2>Was soll die App können</h2>
        <p>
          Man soll sich hier anmelden und registrieren können. Noch gibt es nur
          eine Möglichkeit, sich zu registrieren. Später kann man sich mit
          Github, Twitter und Google-Konto anmelden.
        </p>
        <p>
          Nach der Anmeldung kann man andere Nutzer finden und mit ihnen in
          Kontakt treten, etwas posten und vieles mehr.
        </p>
        <small>Test account: a@a.com / 123456</small>
        <br />
        <small>Test account: b@b.com / 123456 </small>

        <h2>Hier sehen Sie die Updates</h2>
        <hr />

        {payload.map(({ title, body, date }) => {
          return (
            <div key={count} className="above">
              <h3>{`${count++} : ${title}`}</h3>
              <p>{body}</p>
              <p>
                <Moment format="HH:MM/DD.MM.YYYY">{date}</Moment>
              </p>
            </div>
          );
        })}
      </div>
    );
  }
};
Index.porpTypes = {
  stateUpdate: PropTypes.object.isRequired,
  update: PropTypes.func.isRequired,
};

const mstp = state => ({
  stateUpdate: state.update,
});

export default connect(
  mstp,
  { update }
)(Index);
