import {
  Link2,
  MousePointerClick,
  ShieldCheck,
  Zap,
} from "lucide-react";

const metrics = [
  {
    icon: Link2,
    value: "10K+",
    label: "Short Links Created",
  },
  {
    icon: MousePointerClick,
    value: "500K+",
    label: "Redirects",
  },
  {
    icon: ShieldCheck,
    value: "99.9%",
    label: "Uptime",
  },
  {
    icon: Zap,
    value: "<100ms",
    label: "Average Redirect",
  },
];

function Metrics() {
  return (
    <section className="bg-base-200/40 py-20">
      <div className="mx-auto grid max-w-7xl gap-6 px-6 md:grid-cols-2 lg:grid-cols-4">

        {metrics.map((metric) => {
          const Icon = metric.icon;

          return (
            <div
              key={metric.label}
              className="card border border-base-300 bg-base-100 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
            >
              <div className="card-body items-center text-center">

                <div className="rounded-xl bg-primary/10 p-4 text-primary">
                  <Icon size={28} />
                </div>

                <h3 className="mt-4 text-4xl font-bold">
                  {metric.value}
                </h3>

                <p className="text-base-content/60">
                  {metric.label}
                </p>

              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default Metrics;