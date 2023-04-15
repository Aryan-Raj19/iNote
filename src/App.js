import "./App.css";
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import About from "./components/About";
import Alert from "./components/Alert";
import Home from "./components/Home";
import Notes from "./components/Notes";
import AddNote from "./components/AddNote";
import NotesItem from "./components/NotesItem";
import SignUp from "./components/SignUp";

function App(props) {
  const [mode, setMode] = useState("light");

  // Creating showAlert function to show alert when triggered
  const [alert, setAlert] = useState("null");
  const showAlert = (type, head, message) => {
    setAlert({
      type: type,
      head: head,
      message: message,
    });
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };

  const changeMode = () => {
    if (mode === "dark") {
      setMode("light");
      document.body.style.backgroundColor = "#fff";
      showAlert("info","success", " :  Light mode activated")
    } else {
      setMode("dark");
      document.body.style.backgroundColor = "#0f125a";
      showAlert("info","success", " :  Dark mode activated")
    }
  };

  return (
    <>
      <Router>
        <Navbar
          title="My Note"
          about="About Us"
          changeMode={changeMode}
          mode={mode}
          showAlert={showAlert}
        />

        <Alert alert={alert} />
        <div className="container">
          <Routes>
            <Route
              exact
              path="/"
              element={<Home mode={mode} showAlert={showAlert} />}
            />
            <Route
              exact
              path="/signup"
              element={<SignUp mode={mode} showAlert={showAlert} />}
            />
            <Route exact path="/about" element={<About mode={mode} />} />
            <Route
              exact
              path="/notes"
              element={<Notes mode={mode} showAlert={showAlert} />}
            />
            <Route
              exact
              path="/addnote"
              element={<AddNote mode={mode} showAlert={showAlert} />}
            />
            <Route
              exact
              path="/notesitem"
              element={<NotesItem mode={mode} showAlert={showAlert} />}
            />
          </Routes>
        </div>
        <Footer about="About Us" changeMode={changeMode}
          mode={mode}/>
      </Router>
    </>
  );
}

export default App;
