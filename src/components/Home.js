import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = (props) => {
  const nav = useNavigate();

  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [passwordType, setPasswordType] = useState("password");

  const togglePassword = (e) => {
    e.preventDefault();
    if (passwordType === "password") {
      setPasswordType("text");
      return;
    }
    setPasswordType("password");
  };

  const handleSignUp = () => {
    nav("/signup");
  };

  const onHandleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    // console.log(json);
    if (json.success) {
      window.localStorage.setItem("token", json.authToken);
      props.showAlert("success", "success","  : Logged in successfully")
      nav("/notes");
    } else {
      // console.log("wrong");
      props.showAlert("danger", "failure", " : use correct credentials ");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div
        className="container"
        style={{
          backgroundColor: props.mode === "dark" ? "#0b093f" : "#c5cfd9",
          color: props.mode === "dark" ? "white" : "black",
        }}
      >
        <p className="login login-text pt-4 mt-4" style={{ marginTop: "40px" }}>
          <u>
            <b>Login</b> here to see your notes
          </u>
        </p>
        <form>
          <div className="login login-input mb-3 ">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              name="email"
              value={credentials.email}
              onChange={onChange}
              aria-describedby="emailHelp"
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="eye-password">
            <div className="login login-input mb-3" >
              <label htmlFor="exampleInputPassword1" className="form-label">
                Password
              </label>
              <input
                type={passwordType}
                className="form-control"
                id="exampleInputPassword1"
                name="password"
                value={credentials.password}
                onChange={onChange}
                autoComplete="on"
              />
            </div>
            <div className="input-group-btn">
              <button
                className="btn btn-dark eye-btn"
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
                  <span className="material-symbols-outlined">visibility</span>
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-outline-dark login-btn mb-4"
            style={{
              backgroundColor: props.mode === "dark" ? "#0f0f0f" : "white",
              color: props.mode === "dark" ? "white" : "black",
            }}
            onClick={onHandleSubmit}
          >
            Login
          </button>

          <button
            type="submit"
            className="btn btn-outline-dark sign-btn mb-4"
            style={{
              backgroundColor: props.mode === "dark" ? "#0f0f0f" : "white",
              color: props.mode === "dark" ? "white" : "black",
            }}
            onClick={handleSignUp}
          >
            Create Account
          </button>
        </form>
      </div>
    </>
  );
};

export default Home;
