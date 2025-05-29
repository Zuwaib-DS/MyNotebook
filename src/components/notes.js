import React, { useContext } from "react";
import UserAuth from "../helpers/UserAuth";
import authContext from "../context/auth/AuthContext";
import { useNavigate } from "react-router-dom";
import NoteItem from "./NoteItem";
import AddEditNote from "./AddEditNote";
import DeleteModal from "./DeleteNote";

function Notes() {
  const userAuth = UserAuth.getAuth();
  const auth = useContext(authContext);
  const navigate = useNavigate();
  const [notesList, setNotesList] = React.useState([]);
  const [selectedNote, setSelectedNote] = React.useState(null);

  // Fetch user notes from the API
  React.useEffect(() => {
    fetchNotes();
  }, []);

  async function fetchNotes(page = 1) {
    let notesApiUrl = process.env.REACT_APP_API_BASE_URL + "notes";
    let response = await fetch(notesApiUrl, {
      headers: {
        "auth-token": userAuth.token,
      },
    });
    if (response.status === 200) {
      let data = await response.json();
      setNotesList(data);
    } else if (response.status === 401) {
      auth.showAlert("Session is expired. Please login again!", "danger");
      navigate("/login");
    } else {
      auth.showAlert("An error occurred. Please contact the admin!", "danger");
    }
  }

  return (
    <>
      <div className="container py-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>{`${userAuth.name}'s Notes`}</h2>
          <button
            className="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#noteModal"
            onClick={() => setSelectedNote(null)}
          >
            <i className="bi bi-plus-lg"></i> Add Note
          </button>
        </div>

        <div className="row g-4" id="notesContainer">
          {notesList.map((note, i) => (
            <NoteItem note={note} setSelectedNote={setSelectedNote}></NoteItem>
          ))}

        </div>
      </div>

      <AddEditNote fetchNotes={fetchNotes} selectedNote={selectedNote} setSelectedNote={setSelectedNote} />
      <DeleteModal fetchNotes={fetchNotes} selectedNote={selectedNote} setSelectedNote={setSelectedNote} />
    </>
  );
}

export default Notes;
