function Alert({ alert, hideAlert }) {
  if (alert) {
    return (
      <div aria-live="polite" aria-atomic="true" className="position-relative">
        <div className="toast-container top-0 end-0 p-3">
          <div
            className={`toast align-items-center text-bg-${
              alert.type
            } border-0 ${alert.show === true ? "show" : ""}`}
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
          >
            <div className="d-flex">
              <div className="toast-body">{alert.message}</div>
              <button
                type="button"
                className="btn-close btn-close-white me-2 m-auto"
                onClick={hideAlert}
                aria-label="Close"
              ></button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Alert;
