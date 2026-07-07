import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
  getUserUrls,
  deleteUrl,
  getUrlAnalytics,
} from "../../api/urlApi";

import LinkCard from "./LinkCard";
import EmptyState from "./EmptyState";
import AnalyticsModal from "./AnalyticsModal";
import DeleteConfirmModal from "./DeleteConfirmModal";

function RecentLinks() {
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(true);

  const [analytics, setAnalytics] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedUrlId, setSelectedUrlId] = useState(null);

  useEffect(() => {
    fetchUrls();
  }, []);

  const fetchUrls = async () => {
    try {
      setLoading(true);

      const response = await getUserUrls();

      setUrls(response.data.data);

    } catch (err) {
      console.error("Fetch URLs Error:", err);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Copy Short URL
   */
  const handleCopy = async (url) => {
    try {
      await navigator.clipboard.writeText(url.shortUrl);

      toast.success("Short URL copied!");

    } catch (err) {
      console.error("Copy Error:", err);
    }
  };

  /**
   * Delete URL - opens confirmation modal
   */
  const handleDelete = (id) => {
    setSelectedUrlId(id);
    setDeleteModalOpen(true);
  };

  /**
   * Confirm deletion
   */
  const confirmDelete = async () => {
    try {
      await deleteUrl(selectedUrlId);

      toast.success("URL deleted successfully!");

      setUrls((prev) =>
        prev.filter((url) => url.id !== selectedUrlId)
      );

    } catch (err) {
      console.error("Delete URL Error:", err);

      toast.error(
        err.response?.data?.message ||
        "Unable to delete URL."
      );
    } finally {
      setDeleteModalOpen(false);
      setSelectedUrlId(null);
    }
  };

  /**
   * Open Analytics Modal
   */
  const handleAnalytics = async (url) => {
    try {
      const response = await getUrlAnalytics(url.id);

      setAnalytics(response.data.data);

      setModalOpen(true);

    } catch (err) {
      console.error("Analytics Error:", err);

      toast.error(
        err.response?.data?.message ||
        "Unable to load analytics."
      );
    }
  };

  if (loading) {
    return (
      <div className="mt-8">
        <h2 className="mb-6 text-2xl font-bold">
          Recent Links
        </h2>

        <div className="grid gap-6">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="h-48 animate-pulse rounded-2xl bg-base-200"
            />
          ))}
        </div>
      </div>
    );
  }

  if (!loading && urls.length === 0) {
    return <EmptyState />;
  }

  const filteredUrls = urls.filter((url) => {
    const query = searchTerm.toLowerCase();

    return (
      url.longUrl.toLowerCase().includes(query) ||
      url.shortUrl.toLowerCase().includes(query)
    );
  });

  return (
    <>
      <section className="mt-8">

        <div className="mb-6">
          <h2 className="text-2xl font-bold">
            Recent Links
          </h2>

          <p className="mt-1 text-base-content/60">
            Manage all your shortened URLs from one place.
          </p>
        </div>

        <div className="mb-6">
          <input
            type="text"
            placeholder="Search by long or short URL..."
            className="input input-bordered w-full"
            value={searchTerm}
            onChange={(e) =>
              setSearchTerm(e.target.value)
            }
          />
        </div>

        <div className="grid gap-6">
          {filteredUrls.map((url) => (
            <LinkCard
              key={url.id}
              url={url}
              onCopy={handleCopy}
              onDelete={handleDelete}
              onAnalytics={handleAnalytics}
            />
          ))}
        </div>

        {filteredUrls.length === 0 && (
          <div className="rounded-xl border border-dashed border-base-300 p-10 text-center">

            <h3 className="text-xl font-semibold">
              No matching URLs
            </h3>

            <p className="mt-2 text-base-content/60">
              Try another search keyword.
            </p>

          </div>
        )}

      </section>

      <AnalyticsModal
        open={modalOpen}
        analytics={analytics}
        onClose={() => {
          setModalOpen(false);
          setAnalytics(null);
        }}
      />

      <DeleteConfirmModal
        open={deleteModalOpen}
        onClose={() => {
          setDeleteModalOpen(false);
          setSelectedUrlId(null);
        }}
        onConfirm={confirmDelete}
      />
    </>
  );
}

export default RecentLinks;