import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = (props) => {
  const nav = useNavigate();
  const [passwordType, setPasswordType] = useState("password");
  const [conpasswordType, setConPasswordType] = useState("password");

  const togglePassword = (e) => {
    e.preventDefault();
    if (passwordType === "password") {
      setPasswordType("text");
      return;
    }
    setPasswordType("password");
  };
  const toggleConPassword = (e) => {
    e.preventDefault();
    if (conpasswordType === "password") {
      setConPasswordType("text");
      return;
    }
    setConPasswordType("password");
  };

  const [credentials, setCredentials] = useState({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
    conpassword: "",
  });

  const handleOnLogin = () => {
    nav("/");
  };
  
  const checkPassandConpass = () => {
    if (credentials.password === credentials.conpassword) {
      // console.log("success password n conpassward same");
      props.showAlert("success", "success", " :  Account created successfully")
      nav("/notes");
    } else {
      props.showAlert("danger","Alert"," :  Password and Confirm Password should be same");
      nav("/signup");
    }
  };
  const onHandleSubmit = async (event) => {
    event.preventDefault();
    const { firstname, lastname, username, email, password, conpassword } = credentials;
    const response = await fetch("http://localhost:5000/api/auth/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstname,
        lastname,
        username,
        email,
        password,
        conpassword,
      }),
    });
    const json = await response.json();
    // console.log(json);

    if (checkPassandConpass()) {
      if (json.success) {
        window.localStorage.setItem("token", json.authToken);
        nav("/notes");
      }
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div
        style={{
          backgroundColor: props.mode === "dark" ? "#0b093f" : "#c5cfd9",
          color: props.mode === "dark" ? "white" : "black",
          marginBottom: "13vh"
        }}
      >
        <p className="sign sign-text pt-4">
          <u>
            <b>Sign Up</b> here to create your Account
          </u>
        </p>
        <div className="signupform">
          <form onSubmit={onHandleSubmit}>
            <div className="row">
              <div className="col firstname">
                <label className="my-2" htmlFor="exampleInputEmail1">
                  First Name
                </label>
                <input
                  style={{ width: "50%" }}
                  type="text"
                  className="form-control"
                  placeholder="First name"
                  required
                  name="firstname"
                  value={credentials.firstname}
                  onChange={onChange}
                />
              </div>
              <div className="col lastname">
                <label className="my-2" htmlFor="exampleInputEmail1">
                  Last Name
                </label>
                <input
                  style={{ width: "50%" }}
                  type="text"
                  className="form-control"
                  placeholder="Last name"
                  required
                  name="lastname"
                  value={credentials.lastname}
                  onChange={onChange}
                />
              </div>
            </div>

            <div className="username">
              <label className="sr-only my-2" htmlFor="inlineFormInputGroup">
                Username
              </label>
              <div className="input-group mb-2">
                <div className="input-group-prepend">
                  <div className="input-group-text">@</div>
                </div>
                <input
                  style={{ width: "50%" }}
                  type="text"
                  className="form-control"
                  id="inlineFormInputGroup"
                  placeholder="Username"
                  required
                  onChange={onChange}
                  name="username"
                  value={credentials.username}
                  autoComplete="username"
                />
              </div>
            </div>
            <div className="form-group sign_email">
              <label className="my-2" htmlFor="exampleInputEmail1">
                Email address
              </label>
              <input
                style={{ width: "50%" }}
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter email"
                required
                name="email"
                value={credentials.email}
                onChange={onChange}
                autoComplete="username"
              />
              <small id="emailHelp" className="form-text text-muted">
                We'll never share your email with anyone else.
              </small>
            </div>

            <div className="eye-password">
              <div className="form-group password">
                <label className="my-2" htmlFor="inputPassword6">
                  Password
                </label>
                <input
                  style={{ width: "33vw" }}
                  type={passwordType}
                  id="inputPassword6"
                  className="form-control mx-sm-3 password_input"
                  aria-describedby="passwordHelpInline"
                  required
                  name="password"
                  value={credentials.password}
                  onChange={onChange}
                  minLength={6}
                  autoComplete="new-password"
                />
                <small
                  id="passwordHelpInline"
                  className="password_text text-muted"
                >
                  Must be 6-20 characters long.
                </small>
              </div>
              <div className="input-group-btn">
                <button
                  className="btn btn-dark eye-btn-sign"
                  onClick={togglePassword}
                  style={{
                    backgroundColor: props.mode === "dark" ? "white" : "white",
                  }}
                >
                  {passwordType === "password" ? (
                    <span className="material-symbols-outlined">
                      {" "}
                      visibility_off{" "}
                    </span>
                  ) : (
                    <span className="material-symbols-outlined">
                      visibility
                    </span>
                  )}
                </button>
              </div>
            </div>

            <div className="eye-password">
              <div className="form-group password">
                <label className="my-2" htmlFor="inputPassword6">
                  Confirm Password
                </label>
                <input
                  style={{ width: "33vw" }}
                  type={conpasswordType}
                  id="inputConfirmPassword6"
                  className="form-control mx-sm-3 password_input"
                  aria-describedby="passwordHelpInline"
                  required
                  name="conpassword"
                  value={credentials.conpassword}
                  onChange={onChange}
                  minLength={6}
                  autoComplete="new-password"
                />
                <small
                  id="passwordHelpInline"
                  className="password_text text-muted"
                >
                  Must be 6-20 characters long.
                </small>
              </div>
              <div className="input-group-btn">
                <button
                  className="btn btn-dark eye-btn-sign"
                  onClick={toggleConPassword}
                  style={{
                    backgroundColor: props.mode === "dark" ? "white" : "white",
                  }}
                >
                  {conpasswordType === "password" ? (
                    <span className="material-symbols-outlined">
                      {" "}
                      visibility_off{" "}
                    </span>
                  ) : (
                    <span className="material-symbols-outlined">
                      visibility
                    </span>
                  )}
                </button>
              </div>
            </div>
            <button
              type="submit"
              className="btn btn-outline-dark sign-sign-btn mb-4"
              style={{
                backgroundColor: props.mode === "dark" ? "#0f0f0f" : "white",
                color: props.mode === "dark" ? "white" : "black",
              }}
            >
              Sign Up
            </button>
            <button
              type="submit"
              className="btn btn-outline-dark sign-login-btn mb-4"
              style={{
                backgroundColor: props.mode === "dark" ? "#0f0f0f" : "white",
                color: props.mode === "dark" ? "white" : "black",
              }}
              onClick={handleOnLogin}
            >
              Have an Account ?
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;
