import React, { useState } from "react";

const NotesItem = (props) => {
  const initialNotes = [];
  const [notes, setNotes] = useState(initialNotes);

  //Delete a Note
  const deleteNote = async (noteId) => {
    // console.log("deleting notew with id : " + noteId);
    const response = await fetch(
      `http://localhost:5000/api/notes/deletenotes/${noteId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          token: window.localStorage.getItem("token"),
        },
      }
    );
    const newNotes = notes.filter((note) => {
      return note._id !== noteId;
    });
    setNotes(newNotes);
  };

  const handleDeleteNote = () => {
    deleteNote(props._id);
    props.showAlert("success","success"," :  Note deleted successfully, Please reload the page ")
  };

  return (
    <>
      <div
        className="card notes-box col-md-auto my-3"
        style={{
          width: "16rem",
          color: props.mode === "dark" ? "white" : "black",
        }}
      >
        <div className="card-body">
          <h5 className="card-title">{props.title}</h5>
          {props.note.description.length > 90 ? (
            <p className="card-text">
              {props.note.description.slice(0, 90)}...
            </p>
          ) : (
            <p className="card-text">{props.description}</p>
          )}
          <div className="my-2">
            #<b>{props.tag} </b>
          </div>
          <div className="my-2">Date: {props.date}</div>

          <span
            className="my-2 edit-btn material-symbols-outlined mx-1"
            onClick={() => {
              props.updateNote(props.note);
            }}
          >
            edit_note
          </span>
          <span
            className="my-2 material-symbols-outlined mx-2"
            onClick={handleDeleteNote}
          >
            delete
          </span>
        </div>
      </div>
    </>
  );
};

export default NotesItem;
