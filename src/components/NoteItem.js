import DateFormatter from "../helpers/FormatDate";

function NoteItem({ note, setSelectedNote }) {
  return (
    <div className="col-md-4">
      <div className="card shadow border-0">
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text text-muted">{note.description}</p>
          <div className="mb-2">
            <small className="text-secondary d-block">
              🕒 Created On:{" "}
              <strong>{DateFormatter.formatDate(note.date)}</strong>
            </small>
            <small className="text-secondary d-block">
              ✏️ Last Updated On:{" "}
              <strong>{DateFormatter.formatDate(note.date)}</strong>
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
    </div>
  );
}

export default NoteItem;
