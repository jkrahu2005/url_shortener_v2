import DashboardLayout from "../components/dashboard/DashboardLayout";
import StatsCards from "../components/dashboard/StatsCards";
import RecentLinks from "../components/dashboard/RecentLinks";

function Dashboard() {
  return (
    <DashboardLayout>
      <StatsCards />

      <div className="mt-8">
        <RecentLinks />
      </div>
    </DashboardLayout>
  );
}

export default Dashboard;