import { Link2 } from "lucide-react";
import { Link } from "react-router-dom";

function Logo() {
  return (
    <Link
      to="/"
      className="flex items-center gap-2 text-2xl font-bold text-primary"
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-content shadow-md">
        <Link2 size={20} />
      </div>

      <span className="tracking-tight">Shortly</span>
    </Link>
  );
}

export default Logo;