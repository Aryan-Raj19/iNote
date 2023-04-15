import React, { useState, useEffect, useRef } from "react";
import "../App.css";
import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar(props) {
  const nav = useNavigate();
  const [users, setUsers] = useState("");
  const ref = useRef(null);

  const onClick = () => {
    ref.current.click();
  };

  useEffect(() => {
    fetchUser();
    fetchNotes();
    // eslint-disable-next-line
  }, []);

  // To signup
  const handleSignUp = () => {
    nav("/signup");
  };

  //To Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    nav("/");
    props.showAlert(
      "success",
      "success",
      " :  You are logged out successfully"
    );
  };

  const [notes, setNotes] = useState("");

  // Fetch All Notes
  const fetchNotes = async () => {
    const response = await fetch(`http://localhost:5000/api/notes/fetchnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: window.localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    setNotes(json);
  };

  // Fetch User Details
  const fetchUser = async () => {
    const response = await fetch("http://localhost:5000/api/auth/getuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: window.localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    setUsers(json);
  };

  return (
    <>
      <nav
        className={`navbar navbar-expand-lg sticky sticky-top navbar-${props.mode}`}
        style={{
          backgroundColor: props.mode === "dark" ? "black" : "#aab7c4",
        }}
      >
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <img className="logo mx-2" src="logo.png" alt="img" />
            {props.title}
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/about">
                  {props.about}
                </Link>
              </li>
            </ul>

            {!localStorage.getItem("token") ? (
              <div
                className="nav-item"
                type="submit"
                style={{
                  color: props.mode === "dark" ? "white" : "black",
                  fontWeight: "bold",
                }}
                onClick={handleSignUp}
              >
                Sign Up
                {/* {users.username} */}
              </div>
            ) : (
              <>
                <div
                  className="nav-item"
                  type="submit"
                  style={{
                    color: props.mode === "dark" ? "white" : "black",
                    fontWeight: "bold",
                  }}
                  onClick={handleLogout}
                >
                  Log Out
                  {/* {users.username} */}
                </div>
                <div
                  style={{
                    marginLeft: "1vw",
                    color: props.mode === "dark" ? "#ba0000" : "#821b1b",
                    cursor: "pointer",
                  }}
                  onClick={onClick}
                >
                  <b>
                    <i> {users.username}</i>
                  </b>
                </div>
              </>
            )}

            <button
              className="btn btn-primary d-none"
              ref={ref}
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasWithBothOptions"
              aria-controls="offcanvasWithBothOptions"
            >
              Enable both scrolling & backdrop
            </button>

            <div
              className="offcanvas offcanvas-end"
              data-bs-scroll="true"
              tabIndex="-1"
              id="offcanvasWithBothOptions"
              aria-labelledby="offcanvasWithBothOptionsLabel"
              style={{
                backgroundColor: props.mode === "dark" ? "#0b093f" : "#fff",
                color: props.mode === "dark" ? "white" : "black",
              }}
            >
              <div className="offcanvas-header">
                <h5
                  className="offcanvas-title"
                  id="offcanvasWithBothOptionsLabel"
                  style={{marginLeft: "7vw",paddingTop:"3vh"}}
                >
                  Users Details
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="offcanvas"
                  aria-label="Close"
                ></button>
              </div>
              {/* NotesItem to Preview all saved notes of user */}
              <hr
                style={{
                  color: props.mode === "dark" ? "white" : "black",
                }}
              ></hr>
              <div className="offcanvas-body">
                <div className="user-detail">
                  <p><b>Name : </b>{users.firstname + " " + users.lastname}</p>
                  <p><b>UserName : </b>{users.username}</p>
                  <p><b>Email : </b>{users.email}</p>
                  <p><b>Total Notes : </b>{notes.length}</p>
                </div>
              </div>
            </div>

            <div className="form-check form-switch display-font-sizes-5rem mx-3">
              <input
                className="form-check-input"
                type="checkbox"
                role="switch"
                id="flexSwitchCheckDefault"
                onClick={props.changeMode}
              />
              <label
                className="form-check-label"
                htmlFor="flexSwitchCheckDefault"
                style={{ color: props.mode === "dark" ? "white" : "black" }}
              >
                <p>{props.mode === "dark" ? "Disable" : "Enable"} Dark Mode</p>
              </label>
            </div>
          </div>
        </div>
      </nav>
      {localStorage.getItem("token") ? (
        <div
          className="main-heading"
          style={{
            color: props.mode === "dark" ? "white" : "black",
          }}
        >
          Welcome <i>{users.username}</i> -  It's Your Personalized NoteBook
        </div>
      ) : (
        <div
          className="main-heading"
          style={{
            color: props.mode === "dark" ? "white" : "black",
            marginLeft: "16vw",
          }}
        >
          Welcome to My Note
        </div>
      )}
    </>
  );
}

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  about: PropTypes.string.isRequired,
};

Navbar.defaultProps = {
  title: "Title",
  about: "About",
};
