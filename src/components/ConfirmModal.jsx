function ConfirmModal({
  isOpen,
  title,
  message,
  confirmText,
  cancelText,
  onConfirm,
  onCancel
}) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3 className="modal-title">{title}</h3>

        <p className="modal-message">{message}</p>

        <div className="modal-actions">
          <button
            type="button"
            className="button button-secondary"
            onClick={onCancel}
          >
            {cancelText}
          </button>

          <button
            type="button"
            className="button button-delete"
            onClick={onConfirm}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;