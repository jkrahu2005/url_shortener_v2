import { ArrowRight, Link2, CheckCircle2, Copy, LayoutDashboard } from "lucide-react";

import GradientBackground from "./GradientBackground";
import Button from "./Button";
import Input from "./Input";
import Card from "./Card";
import Badge from "./Badge";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { shortenUrl } from "../../api/urlApi";

import toast from "react-hot-toast";

function Hero() {
  const { isAuthenticated } = useSelector(
    (state) => state.auth
  );
  const navigate = useNavigate();
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [shortUrl, setShortUrl] = useState(null);
  const [copied, setCopied] = useState(false);

  const handleShorten = async () => {
    if (!url.trim()) {
      toast.error("Please enter a URL.");
      return;
    }

    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    try {
      setLoading(true);

      const response = await shortenUrl({
        longUrl: url.trim(),
      });

      setShortUrl(response.data.data);
      toast.success("Short URL created successfully!");
      setUrl("");

    } catch (err) {
      toast.error(
        err.response?.data?.message ||
        "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shortUrl.shortUrl);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section className="relative hero min-h-[88vh] overflow-hidden bg-base-100">

      <GradientBackground />

      <div className="hero-content relative z-10 w-full max-w-7xl flex-col px-6 text-center">

        <Badge>
          🚀 Fast • Secure • Reliable
        </Badge>

        <h1 className="mt-8 text-5xl font-extrabold leading-tight md:text-7xl">
          Shorten Your Links.
          <br />
          <span className="text-primary">
            Amplify Your Reach.
          </span>
        </h1>

        <p className="mt-6 max-w-3xl text-lg leading-8 text-base-content/70">
          Create beautiful short links with analytics,
          lightning-fast redirects, QR codes,
          and enterprise-grade performance.
        </p>

        <Card className="mt-12 w-full max-w-4xl p-4 backdrop-blur-xl bg-base-100/80">

          <div className="flex flex-col gap-4 md:flex-row">

            <input
              type="url"
              placeholder="Paste your long URL..."
              className="grow"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />

            <Button
              className="h-14 px-8"
              onClick={handleShorten}
              disabled={loading}
              rightIcon={
                !loading ? <ArrowRight size={18} /> : null
              }
            >
              {loading ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                "Shorten URL"
              )}
            </Button>

          </div>

        </Card>

        {shortUrl && (
          <div className="mt-8 w-full max-w-3xl rounded-2xl border border-success/20 bg-success/5 p-6 shadow-lg">

            <div className="flex items-center gap-2 text-success">
              <CheckCircle2 size={22} />
              <h3 className="text-lg font-semibold">
                Short URL Created Successfully
              </h3>
            </div>

            <div className="mt-5 flex flex-col gap-4 rounded-xl border border-base-300 bg-base-100 p-4 md:flex-row md:items-center md:justify-between">

              <div className="min-w-0 flex-1">
                <p className="text-xs uppercase tracking-wide text-base-content/50">
                  Your Short Link
                </p>

                <a
                  href={shortUrl.shortUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 block truncate text-lg font-semibold text-primary hover:underline"
                >
                  {shortUrl.shortUrl}
                </a>
              </div>

              <div className="flex gap-3">
                <Button
                  variant="secondary"
                  onClick={handleCopy}
                  leftIcon={
                    copied ? (
                      <CheckCircle2 size={16} />
                    ) : (
                      <Copy size={16} />
                    )
                  }
                >
                  {copied ? "Copied" : "Copy"}
                </Button>

                <Button
                  leftIcon={<LayoutDashboard size={16} />}
                  onClick={() => navigate("/dashboard")}
                >
                  Dashboard
                </Button>
              </div>

            </div>

          </div>
        )}

        <p className="mt-5 text-sm text-base-content/50">
          No credit card required • Free forever
        </p>

      </div>

    </section>
  );
}

export default Hero;