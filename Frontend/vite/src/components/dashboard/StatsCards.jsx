import { useEffect, useState } from "react";
import {
  Link2,
  MousePointerClick,
  Activity,
  CalendarDays,
} from "lucide-react";

import { getDashboardStats } from "../../api/urlApi";
import StatCard from "./StatCard";

function StatsCards() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      setLoading(true);

      const response = await getDashboardStats();

      setStats(response.data.data);
    } catch (err) {
      console.error("Dashboard Stats Error:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {[1, 2, 3, 4].map((item) => (
          <div
            key={item}
            className="h-44 animate-pulse rounded-2xl bg-base-200"
          />
        ))}
      </div>
    );
  }

  const cards = [
    {
      title: "Total Links",
      value: stats?.totalLinks ?? 0,
      icon: Link2,
      color: "text-primary",
      trend: "",
    },
    {
      title: "Total Clicks",
      value: stats?.totalClicks ?? 0,
      icon: MousePointerClick,
      color: "text-success",
      trend: "",
    },
    {
      title: "Active Links",
      value: stats?.activeLinks ?? 0,
      icon: Activity,
      color: "text-warning",
      trend: "",
    },
    {
      title: "Created Today",
      value: stats?.linksCreatedToday ?? 0,
      icon: CalendarDays,
      color: "text-secondary",
      trend: "",
    },
  ];

  return (
    <section>
      <div className="mb-6">
        <h2 className="text-2xl font-bold">
          Dashboard Overview
        </h2>

        <p className="mt-1 text-base-content/60">
          Here's a quick summary of your URL performance.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((item) => (
          <StatCard
            key={item.title}
            {...item}
          />
        ))}
      </div>
    </section>
  );
}

export default StatsCards;