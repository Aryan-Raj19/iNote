import React, { useState } from "react";

function AddNote(props) {
  const [notes, setNotes] = useState("");

  const handleClickaddNote = (e) => {
    e.preventDefault();
    addNote(
      !notes.title ? "Title" : notes.title,
      !notes.description ? "Empty" : notes.description,
      !notes.tag ? "tag" : notes.tag
    );
    setNotes({ title: "", description: "", tag: "" });
    {
      notes.title.length < 5 || notes.description.length < 5
        ? props.showAlert(
            "warning",
            "warning",
            " :  Note added but try to enter atleast 5 characters in Title or Description, reload to see you Note."
          )
        : props.showAlert(
            "success",
            "success",
            " :  A new note has beed added, reload to see you Note."
          );
    }
  };

  const onChange = (e) => {
    setNotes({ ...notes, [e.target.name]: e.target.value });
  };

  // Add a note
  const addNote = async (title, description, tag) => {
    const response = await fetch(`http://localhost:5000/api/notes/addnotes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const note = await response.json();
  };

  return (
    <div>
      <p className="Add-heading">
        <u>
          <b>Add</b> a Note
        </u>
      </p>
      <form>
        <div className="add-note-box title mb-3">
          <label htmlFor="exampleInputTitle" className="form-label">
            Title
          </label>
          <textarea
            style={{ width: "50%" }}
            className="form-control"
            id="exampleFormControlTitle"
            name="title"
            rows="1"
            value={notes.title}
            onChange={onChange}
          ></textarea>
        </div>
        <div className="add-note-box description mb-3">
          <label htmlFor="exampleInputDescripion" className="form-label">
            Descripion
          </label>
          <textarea
            style={{ width: "50%" }}
            className="form-control"
            id="exampleFormControlDescripion"
            name="description"
            rows="4"
            value={notes.description}
            onChange={onChange}
          ></textarea>
        </div>
        <div className="add-note-box tag mb-3">
          <label htmlFor="exampleInputTag" className="form-label">
            Tag
          </label>
          <textarea
            style={{ width: "50%" }}
            className="form-control"
            id="exampleFormControlTag"
            name="tag"
            rows="1"
            value={notes.tag}
            onChange={onChange}
          ></textarea>
        </div>
        <button
          type="submit"
          className="btn btn-dark add-note-btn"
          style={{
            backgroundColor: props.mode === "dark" ? "#0f0f0f" : "white",
            color: props.mode === "dark" ? "white" : "black",
          }}
          onClick={handleClickaddNote}
        >
          Add Note
        </button>
      </form>
    </div>
  );
}

export default AddNote;
