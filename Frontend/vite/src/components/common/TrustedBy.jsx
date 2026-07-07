import {
  Globe,
  Server,
  Database,
} from "lucide-react";

function TrustedBy() {
  const items = [
    {
      icon: <Globe size={30} />,
      name: "Cloud",
    },
    {
      icon: <Server size={30} />,
      name: "Enterprise",
    },
    {
      icon: <Database size={30} />,
      name: "Database",
    },
  ];

  return (
    <section className="py-20 bg-base-200/40">
      <div className="mx-auto max-w-7xl">
        <p className="text-center text-sm uppercase tracking-widest text-base-content/60">
          Built using modern technologies
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-14 opacity-60">
          {items.map((item) => (
            <div
              key={item.name}
              className="flex flex-col items-center gap-2 transition hover:scale-110 hover:opacity-100"
            >
              {item.icon}
              <span className="text-sm">{item.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TrustedBy;