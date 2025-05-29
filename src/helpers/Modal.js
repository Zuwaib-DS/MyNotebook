const ModalHelpers = {
  HideModal: function (modalId) {
    // Use Bootstrap's modal API to hide the modal properly
    if (window.bootstrap && window.bootstrap.Modal) {
      const modalElement = document.getElementById(modalId);
      const modalInstance =
        window.bootstrap.Modal.getInstance(modalElement) ||
        new window.bootstrap.Modal(modalElement);
      modalInstance.hide();
    }
  },
};


export default ModalHelpers;
