import React, { useState, useEffect, useRef } from "react";
import NotesItem from "./NotesItem";
import AddNote from "./AddNote";
import { useNavigate } from "react-router-dom";

const Notes = (props) => {
  //   const data = useContext(NoteContext);

  // const initialNotes = [];
  const { showAlert } = props;

  const nav = useNavigate();

  useEffect(() => {
    if (window.localStorage.getItem("token")) {
      fetchNotes();
    } else {
      nav("/");
    }
    // eslint-disable-next-line
  }, []);

  const [notes, setNotes] = useState([]);

  const ref = useRef(null);
  const refClose = useRef(null);
  const [note, setNote] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: "",
  });

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

  // Edit a Note
  const editNote = async (id, title, description, tag) => {
    // API Call
    const response = await fetch(
      `http://localhost:5000/api/notes/updatenotes/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          token: window.localStorage.getItem("token"),
        },
        body: JSON.stringify({ title, description, tag }),
      }
    );
    const json = await response.json();
    // console.log(id);

    let newNotes = JSON.parse(JSON.stringify(note));
    // Logic to edit in client
    for (let index = 0; index < newNotes.length; index++) {
      // console.log(newNotes[index].title + " editing " + newNotes[index]._id);
      const element = newNotes[index];
      if (element.id === id) {
        newNotes[index].etitle = title;
        newNotes[index].edescription = description;
        newNotes[index].etag = tag;
        break;
      }
    }
    setNotes(newNotes);
  };

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
    });
  };

  const handleClick = (e) => {
    editNote(
      note.id,
      !note.etitle ? "Title" : note.etitle,
      !note.edescription ? "Empty" : note.edescription,
      !note.etag ? "tag" : note.etag
    );
    refClose.current.click();
    props.showAlert("success","success"," :  Note updated successfully")
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <>
      {/* AddNotes  Body  */}
      <div
        className="box py-4"
        style={{
          backgroundColor: props.mode === "dark" ? "#0b093f" : "#c5cfd9",
          color: props.mode === "dark" ? "white" : "black",
        }}
      >
        <AddNote showAlert={showAlert} />
      </div>

      {/* EditNote */}
      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title" id="exampleModalLabel">
                <u>
                  <b>Edit</b> Note
                </u>
              </h4>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form className="my-3">
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    <b>Title</b>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    value={note.etitle}
                    onChange={onChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    <b>Description</b>
                  </label>
                  <textarea
                    type="text"
                    className="form-control"
                    id="edescription"
                    name="edescription"
                    rows={5}
                    value={note.edescription}
                    onChange={onChange}
                  ></textarea>
                </div>
                <div className="mb-3">
                  <label htmlFor="tag" className="form-label">
                    <b>Tag</b>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etag"
                    name="etag"
                    value={note.etag}
                    onChange={onChange}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                ref={refClose}
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                onClick={handleClick}
                type="button"
                className="btn btn-primary"
              >
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* NotesItem to Preview all saved notes of user */}
      <hr
        style={{
          color: props.mode === "dark" ? "white" : "black",
        }}
      ></hr>

      <>
        <div
          className="box"
          style={{
            backgroundColor: props.mode === "dark" ? "#0b093f" : "#c5cfd9",
            color: props.mode === "dark" ? "white" : "black",
            marginBottom: "15vh",
          }}
        >
          <p className="Note-heading pt-4">
            <u>
              <b>Your</b> Notes
            </u>
          </p>
          <div className="text">
            {notes.length === 0 &&
              "No notes to display, Please add a note and check again"}
          </div>
          <div className="row note-item">
            {notes.map((note) => {
              return (
                <NotesItem
                  key={note._id}
                  date={new Date(note.date).toGMTString()}
                  updateNote={updateNote}
                  _id={note._id}
                  title={note.title}
                  description={note.description}
                  tag={note.tag}
                  note={note}
                  showAlert={showAlert}
                />
              );
            })}
          </div>
        </div>
      </>
    </>
  );
};

export default Notes;
