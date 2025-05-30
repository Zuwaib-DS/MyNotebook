import UserAuth from "../helpers/UserAuth";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import authContext from "../context/auth/AuthContext";
import ModalHelpers from "../helpers/Modal";

function DeleteNote({ fetchNotes, selectedNote, setSelectedNote }) {
  const navigate = useNavigate();
  const auth = useContext(authContext);

  async function handleSubmit(e) {
    e.preventDefault();
    let notesApiUrl = process.env.REACT_APP_API_BASE_URL + "notes";
    const formData = new FormData(e.target);

    let method = "DELETE"; // Always DELETE for this modal

    notesApiUrl += `/${formData.get("noteId")}`; // Include noteId only for updates

    let response = await fetch(notesApiUrl, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        "auth-token": UserAuth.getAuth().token,
      },
    });
    if (response.status === 200) {
      let result = await response.json();
      auth.showAlert("Note deleted successfully!", "success");
      ModalHelpers.HideModal("deleteModal"); // Hide the modal using Bootstrap's modal API
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
      id="deleteModal"
      tabIndex="-1"
      aria-labelledby="deleteModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <form className="modal-content" onSubmit={handleSubmit} method="POST">
          <div className="modal-header bg-danger text-white">
            <h5 className="modal-title" id="deleteModalLabel">
              Confirm Deletion
            </h5>
            <button
              type="button"
              className="btn-close btn-close-white"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <input
              type="hidden"
              name="noteId"
              value={selectedNote?._id || ""}
            />
            <p className="mb-0">
              Are you sure you want to delete this item? This action cannot be
              undone.
            </p>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-danger" id="confirmDelete">
              Delete
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default DeleteNote;
