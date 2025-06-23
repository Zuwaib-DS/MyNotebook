import { useContext } from "react";
import authContext from "../context/auth/AuthContext";
import DateFormatter from "../helpers/FormatDate";
import TooltipControl from "./controls/TooltipControl";
import { useNavigate } from "react-router-dom";
import UserAuth from "../helpers/UserAuth";

function NoteItem({ note, setSelectedNote, fetchNotes }) {
  const navigate = useNavigate();
  const auth = useContext(authContext);

  async function PinUnpinNote(noteId, pinStatus) {
    console.log(`Note ID: ${noteId}, Pin Status: ${pinStatus}`);
    let notesPinUnpinApiUrl =
      process.env.REACT_APP_API_BASE_URL + "notes/pinunpin";

    let method = "PUT";
    notesPinUnpinApiUrl += `/${noteId}/${pinStatus}`;

    let response = await fetch(notesPinUnpinApiUrl, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        "auth-token": UserAuth.getAuth().token,
      },
    });
    if (response.status === 200) {
      fetchNotes();
    } else if (response.status === 401) {
      auth.showAlert("Session is expired. Please login again!");
      navigate("/login");
    } else {
      auth.showAlert("An error occurred. Please contact the admin!", "danger");
    }
  }

  return (
    <div className="card shadow border-0">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <TooltipControl text={note.title}>
            <h5 className="card-title">{note.title && note.title.length > 30
                ? `${note.title.substring(0, 30)}...`
                : note.title}</h5>
          </TooltipControl>
          <TooltipControl text={note.isPinned ? "Unpin Note" : "Pin Note"}>
            <button
              type="button"
              className="btn btn-outline-dark btn-xs"
              onClick={() => PinUnpinNote(note._id, !note.isPinned)}
            >
              <i
                className={`bi ${note.isPinned ? "bi-pin" : "bi-pin-angle"}`}
              ></i>
            </button>
          </TooltipControl>
        </div>

        <TooltipControl text={note.description}>
            <p className="card-text text-muted" dangerouslySetInnerHTML={{__html: note.description && note.description.length > 150
                  ? `${note.description.substring(0, 150)}...`
                  : note.description}}></p>
        </TooltipControl>
        <div className="mb-2">
          <small className="text-secondary d-block">
            🕒 Created On:{" "}
            <strong>{DateFormatter.formatDate(note.date)}</strong>
          </small>
          <small className="text-secondary d-block">
            ✏️ Last Updated On:{" "}
            <strong>{DateFormatter.formatDate(note.updatedAt)}</strong>
          </small>
        </div>
        <div className="d-flex justify-content-end gap-2">
          <button
            className="btn btn-sm btn-outline-primary"
            data-bs-toggle="modal"
            data-bs-target="#noteModal"
            onClick={() => setSelectedNote(note)}
          >
            <i className="bi bi-pencil-square"></i>
          </button>
          <button
            className="btn btn-sm btn-outline-danger"
            data-bs-toggle="modal"
            data-bs-target="#deleteModal"
            onClick={() => setSelectedNote(note)}
          >
            <i className="bi bi-trash"></i>
          </button>
        </div>
      </div>
    </div>
  );
}

export default NoteItem;
