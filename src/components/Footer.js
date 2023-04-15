import React from "react";
import { Link } from "react-router-dom";

const Footer = (props) => {
  return (
    <div
      className="footer"
      style={{
        backgroundColor: props.mode === "dark" ? "black" : "#aab7c4",
        color: props.mode === "dark" ? "white" : "black",
      }}
    >
      <p>
        Copyright{" "}
        <span className="material-symbols-outlined copyright">copyright</span>{" "}
        eNoteBook 2022
      </p>
      <Link
        className="foot-link about-foot"
        style={{
          color: props.mode === "dark" ? "white" : "black",
        }}
        to="/about"
      >
        {props.about}
      </Link>
      {/* <Link className="foot-link home-foot" style={{
        color: props.mode === "dark" ? "white" : "black",
      }} to="/">
        Home
      </Link> */}
    </div>
  );
};

export default Footer;
