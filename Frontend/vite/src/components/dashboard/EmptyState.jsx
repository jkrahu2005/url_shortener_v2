import { Link2 } from "lucide-react";
import { Link } from "react-router-dom";

import Button from "../common/Button";

function EmptyState() {
  return (
    <div className="rounded-2xl border border-dashed border-base-300 bg-base-100 p-12 text-center">

      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-base-200">
        <Link2 size={36} className="text-base-content/40" />
      </div>

      <h2 className="mt-6 text-2xl font-bold">
        No links yet
      </h2>

      <p className="mt-2 text-base-content/60">
        Create your first shortened URL to start tracking clicks.
      </p>

      <Link to="/">
        <Button className="mt-8">
          Create Your First Link
        </Button>
      </Link>

    </div>
  );
}

export default EmptyState;