import { Moon } from "lucide-react";

function ThemeToggle() {
  return (
    <button
      className="btn btn-ghost btn-circle"
      aria-label="Toggle Theme"
    >
      <Moon size={20} />
    </button>
  );
}

export default ThemeToggle;