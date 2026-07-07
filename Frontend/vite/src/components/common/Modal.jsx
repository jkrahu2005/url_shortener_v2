function Modal({
  open,
  title,
  children,
  actions,
}) {
  if (!open) return null;

  return (
    <dialog className="modal modal-open">

      <div className="modal-box rounded-2xl">

        {title && (
          <h3 className="text-2xl font-bold">
            {title}
          </h3>
        )}

        <div className="py-6">
          {children}
        </div>

        {actions && (
          <div className="modal-action">
            {actions}
          </div>
        )}

      </div>

    </dialog>
  );
}

export default Modal;