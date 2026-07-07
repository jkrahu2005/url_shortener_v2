import { Link2 } from "lucide-react";

function EmptyState() {
  return (
    <div className="flex flex-col items-center py-20">

      <Link2
        size={60}
        className="text-base-300"
      />

      <h2 className="mt-6 text-2xl font-bold">

        No links yet

      </h2>

      <p className="mt-2 text-base-content/60">

        Create your first short link.

      </p>

    </div>
  );
}

export default EmptyState;