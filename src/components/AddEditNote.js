import UserAuth from "../helpers/UserAuth";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import authContext from "../context/auth/AuthContext";
import ModalHelpers from "../helpers/Modal";

function AddEditNote({ fetchNotes, selectedNote, setSelectedNote }) {
  const navigate = useNavigate();
  const auth = useContext(authContext);

  async function handleSubmit(e) {
    e.preventDefault();
    let notesApiUrl = process.env.REACT_APP_API_BASE_URL + "notes";
    const formData = new FormData(e.target);
    const data = {
      title: formData.get("noteTitle"),
      description: formData.get("noteDescription"),
    };
    
    let method = formData.get("noteId") ? "PUT" : "POST";
    if(method === "PUT") 
        notesApiUrl += `/${formData.get("noteId")}` // Include noteId only for updates
    
    let response = await fetch(notesApiUrl, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        "auth-token": UserAuth.getAuth().token,
      },
      body: JSON.stringify(data),
    });
    if (response.status === 200) {
      let result = await response.json();
      auth.showAlert("Note saved successfully!", "success");
      ModalHelpers.HideModal("noteModal"); // Hide the modal using Bootstrap's modal API
      e.target.reset(); // Reset the form fields
      fetchNotes();
    } else if (response.status === 401) {
      alert("Session is expired. Please login again!");
      navigate("/login");
    } else {
      auth.showAlert("An error occurred. Please contact the admin!", "danger");
    }
  }

  return (
    <div
      className="modal fade"
      id="noteModal"
      tabIndex="-1"
      aria-labelledby="noteModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <form className="modal-content" onSubmit={handleSubmit} method="POST">
          <div className="modal-header">
            <h5 className="modal-title" id="noteModalLabel">
              Add/Edit Note
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <input type="hidden" name="noteId" value={selectedNote?._id || ""} />
            <div className="mb-3">
              <label htmlFor="noteTitle" className="form-label">
                Title
              </label>
              <input
                type="text"
                className="form-control"
                id="noteTitle"
                name="noteTitle"
                value={selectedNote?.title || ""}
                onChange={(e) =>
                  setSelectedNote({ ...selectedNote, title: e.target.value })
                  // Update the selected note's title only. '...selectedNote' is used to keep the existing note data intact.
                }
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="noteDescription" className="form-label">
                Description
              </label>
              <textarea
                className="form-control"
                id="noteDescription"
                name="noteDescription"
                rows="4"
                value={selectedNote?.description || ""}
                onChange={(e) =>
                  setSelectedNote({ ...selectedNote, description: e.target.value })
                }
                required
              ></textarea>
            </div>
          </div>
          <div className="modal-footer">
            <button type="submit" className="btn btn-success">
              Save Note
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddEditNote;
