import { X, MousePointerClick, Link2, Calendar } from "lucide-react";

function AnalyticsModal({
  open,
  onClose,
  analytics,
}) {
  if (!open || !analytics) return null;

  return (
    <dialog className="modal modal-open">
      <div className="modal-box max-w-2xl">

        <button
          onClick={onClose}
          className="btn btn-circle btn-ghost absolute right-3 top-3"
        >
          <X size={18} />
        </button>

        <h2 className="mb-6 text-2xl font-bold">
          URL Analytics
        </h2>

        <div className="space-y-6">

          <div>
            <p className="text-xs uppercase text-base-content/50">
              Original URL
            </p>

            <a
              href={analytics.longUrl}
              target="_blank"
              rel="noreferrer"
              className="font-medium text-primary break-all"
            >
              {analytics.longUrl}
            </a>
          </div>

          <div>
            <p className="text-xs uppercase text-base-content/50">
              Short URL
            </p>

            <a
              href={analytics.shortUrl}
              target="_blank"
              rel="noreferrer"
              className="font-medium text-primary"
            >
              {analytics.shortUrl}
            </a>
          </div>

          <div className="grid grid-cols-2 gap-6">

            <div className="rounded-xl bg-base-200 p-5">

              <div className="flex items-center gap-2">
                <MousePointerClick size={18} />
                <span>Total Clicks</span>
              </div>

              <h3 className="mt-3 text-3xl font-bold">
                {analytics.clickCount}
              </h3>

            </div>

            <div className="rounded-xl bg-base-200 p-5">

              <div className="flex items-center gap-2">
                <Calendar size={18} />
                <span>Created</span>
              </div>

              <h3 className="mt-3 font-semibold">
                {new Date(
                  analytics.createdAt
                ).toLocaleDateString()}
              </h3>

            </div>

          </div>

        </div>

      </div>

      <form
        method="dialog"
        className="modal-backdrop"
      >
        <button onClick={onClose}>close</button>
      </form>

    </dialog>
  );
}

export default AnalyticsModal;