import {
  Link2,
  BarChart3,
  QrCode,
} from "lucide-react";

const features = [
  {
    title: "Lightning Fast",
    desc: "Instant URL shortening powered by Redis caching.",
    icon: <Link2 size={30} />,
  },
  {
    title: "Analytics",
    desc: "Track clicks and performance with ease.",
    icon: <BarChart3 size={30} />,
  },
  {
    title: "QR Codes",
    desc: "Generate QR codes for every shortened link.",
    icon: <QrCode size={30} />,
  },
];

function Features() {
  return (
    <section className="py-24">

      <div className="mx-auto max-w-7xl px-6">

        <h2 className="text-center text-4xl font-bold">

          Everything you need.

        </h2>

        <p className="mt-4 text-center text-base-content/70">

          Designed for creators, startups and enterprises.

        </p>

        <div className="mt-16 grid gap-8 md:grid-cols-3">

          {features.map((feature) => (

            <div
              key={feature.title}
              className="card border border-base-300 bg-base-100 shadow-xl transition-all hover:-translate-y-2 hover:shadow-2xl"
            >

              <div className="card-body">

                <div className="mb-4 w-fit rounded-xl bg-primary/10 p-4 text-primary">

                  {feature.icon}

                </div>

                <h3 className="text-2xl font-semibold">

                  {feature.title}

                </h3>

                <p className="text-base-content/70">

                  {feature.desc}

                </p>

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}

export default Features;