import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="container">
      <h2>Uuupppss. Die Seite konnte nicht gefunden werden</h2>
      <p>
        Hier können sie <Link to="/">zurück</Link>
      </p>
    </div>
  );
};

export default NotFound;
