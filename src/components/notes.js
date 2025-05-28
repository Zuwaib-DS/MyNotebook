import React, {useContext} from "react";
import authContext from "../context/auth/AuthContext";
import UserAuth from "../helpers/UserAuth";

function Notes() {
  const auth = useContext(authContext);
  const userAuth = UserAuth.getAuth();
  return (
    <>
      <div className="container py-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>{`${userAuth.name}'s Notes`}</h2>
          <button
            className="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#noteModal"
          >
            <i className="bi bi-plus-lg"></i> Add Note
          </button>
        </div>

        <div className="row g-4" id="notesContainer">
          {/* <!-- Sample Note Card --> */}
          <div className="col-md-4">
            <div className="card shadow border-0">
              <div className="card-body">
                <h5 className="card-title">Sample Note Title</h5>
                <p className="card-text text-muted">
                  This is a sample note description that gives a brief about the
                  content.
                </p>
                <div className="mb-2">
                  <small className="text-secondary d-block">
                    🕒 Created On: <strong>2025-05-20</strong>
                  </small>
                  <small className="text-secondary d-block">
                    ✏️ Last Updated On: <strong>2025-05-22</strong>
                  </small>
                </div>
                <div className="d-flex justify-content-end gap-2">
                  <button
                    className="btn btn-sm btn-outline-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#noteModal"
                  >
                    <i className="bi bi-pencil-square"></i>
                  </button>
                  <button className="btn btn-sm btn-outline-danger">
                    <i className="bi bi-trash"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* <!-- Repeat similar cards dynamically --> */}
        </div>
      </div>

      <div
        className="modal fade"
        id="noteModal"
        tabIndex="-1"
        aria-labelledby="noteModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <form className="modal-content">
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
              <div className="mb-3">
                <label htmlFor="noteTitle" className="form-label">
                  Title
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="noteTitle"
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
                  rows="4"
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
    </>
  );
}

export default Notes;
