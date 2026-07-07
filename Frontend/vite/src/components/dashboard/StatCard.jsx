import { TrendingUp } from "lucide-react";

function StatCard({
  title,
  value,
  icon: Icon,
  color = "text-primary",
  trend = "+0%",
}) {
  return (
    <div className="group rounded-2xl border border-base-300 bg-base-100 p-5 sm:p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

      <div className="flex items-start justify-between gap-4">

        <div className="min-w-0">

          <p className="text-sm font-medium text-base-content/60">
            {title}
          </p>

          <h2 className="mt-3 text-3xl font-bold sm:text-4xl break-words">
            {value}
          </h2>

        </div>

        <div
          className={`shrink-0 rounded-xl bg-base-200 p-3 transition-transform duration-300 group-hover:scale-110 ${color}`}
        >
          <Icon size={24} />
        </div>

      </div>

      {trend && (
        <div className="mt-5 flex flex-wrap items-center gap-2 text-success">

          <TrendingUp size={16} />

          <span className="text-sm font-medium">
            {trend}
          </span>

          <span className="text-sm text-base-content/50">
            this month
          </span>

        </div>
      )}

    </div>
  );
}

export default StatCard;