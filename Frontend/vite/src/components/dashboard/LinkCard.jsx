import {
  Copy,
  BarChart3,
  Trash2,
  ExternalLink,
} from "lucide-react";

import Button from "../common/Button";

function LinkCard({
  url,
  onCopy,
  onDelete,
  onAnalytics,
}) {
  return (
    <div className="rounded-2xl border border-base-300 bg-base-100 p-5 sm:p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

      {/* Original URL */}
      <div>
        <p className="text-xs uppercase tracking-wide text-base-content/50">
          Original URL
        </p>

        <a
          href={url.longUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-1 flex items-center gap-2 break-all font-medium hover:text-primary"
        >
          <span className="min-w-0 flex-1">
            {url.longUrl}
          </span>

          <ExternalLink
            size={16}
            className="shrink-0"
          />
        </a>
      </div>

      {/* Short URL */}
      <div className="mt-5">
        <p className="text-xs uppercase tracking-wide text-base-content/50">
          Short URL
        </p>

        <a
          href={url.shortUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-1 break-all font-semibold text-primary hover:underline"
        >
          {url.shortUrl}
        </a>
      </div>

      {/* Footer */}
      <div className="mt-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

        <div>
          <p className="text-sm text-base-content/60">
            Clicks
          </p>

          <h3 className="text-xl font-bold">
            {url.clickCount}
          </h3>
        </div>

        <div className="flex flex-wrap gap-2">

          <Button
            size="sm"
            variant="secondary"
            leftIcon={<Copy size={16} />}
            onClick={() => onCopy(url)}
          >
            Copy
          </Button>

          <Button
            size="sm"
            variant="ghost"
            leftIcon={<BarChart3 size={16} />}
            onClick={() => onAnalytics(url)}
          >
            Analytics
          </Button>

          <Button
            size="sm"
            variant="danger"
            leftIcon={<Trash2 size={16} />}
            onClick={() => onDelete(url.id)}
          >
            Delete
          </Button>

        </div>

      </div>

    </div>
  );
}

export default LinkCard;