import {
  Link2,
  Wand2,
  Share2,
  BarChart3,
} from "lucide-react";

const steps = [
  {
    title: "Paste URL",
    desc: "Paste any long URL.",
    icon: Link2,
  },
  {
    title: "Generate",
    desc: "Instantly generate a short link.",
    icon: Wand2,
  },
  {
    title: "Share",
    desc: "Share it anywhere.",
    icon: Share2,
  },
  {
    title: "Track",
    desc: "Monitor clicks and performance.",
    icon: BarChart3,
  },
];

function HowItWorks() {
  return (
    <section className="py-24">

      <div className="mx-auto max-w-6xl px-6">

        <h2 className="text-center text-4xl font-bold">

          How it works

        </h2>

        <div className="mt-20 grid gap-10 md:grid-cols-4">

          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <div
                key={step.title}
                className="relative text-center"
              >

                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary text-primary-content shadow-xl">

                  <Icon size={30} />

                </div>

                <h3 className="mt-6 text-xl font-semibold">

                  {step.title}

                </h3>

                <p className="mt-2 text-base-content/70">

                  {step.desc}

                </p>

                {index !== steps.length - 1 && (
                  <div className="absolute left-[70%] top-10 hidden h-1 w-24 bg-primary/20 md:block"></div>
                )}

              </div>
            );
          })}

        </div>

      </div>

    </section>
  );
}

export default HowItWorks;