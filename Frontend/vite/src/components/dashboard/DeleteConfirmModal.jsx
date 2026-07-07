import Button from "../common/Button";

function DeleteConfirmModal({
  open,
  onClose,
  onConfirm,
}) {
  if (!open) return null;

  return (
    <dialog className="modal modal-open">
      <div className="modal-box">

        <h3 className="text-2xl font-bold">
          Delete URL?
        </h3>

        <p className="mt-4 text-base-content/70">
          This action cannot be undone.
          The short URL and its analytics
          will be permanently deleted.
        </p>

        <div className="modal-action">

          <Button
            variant="secondary"
            onClick={onClose}
          >
            Cancel
          </Button>

          <Button
            variant="danger"
            onClick={onConfirm}
          >
            Delete
          </Button>

        </div>

      </div>

      <form
        method="dialog"
        className="modal-backdrop"
      >
        <button onClick={onClose}>
          close
        </button>
      </form>

    </dialog>
  );
}

export default DeleteConfirmModal;