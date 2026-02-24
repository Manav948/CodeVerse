"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import StatCard from "./StatCard";
import ActivityChart from "./ActivityChart";
import StatusDonut from "./StatusDonut";
import ActivityHeatmap from "./ActivityHeatmap";
import Loader from "@/components/ui/Loading";

const DashboardContainer = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["dashboardAnalytics"],
    queryFn: async () => {
      const res = await axios.get(
        "/api/dashboard/analytics"
      );
      return res.data;
    },
  });

  if (isLoading) return <Loader />;
  if (isError || !data)
    return <div>Error loading dashboard</div>;

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <StatCard
          title="Total"
          value={data.totalTasks}
        />
        <StatCard
          title="Completed"
          value={data.completedTasks}
        />
        <StatCard
          title="Pending"
          value={data.pendingTasks}
        />
        <StatCard
          title="Overdue"
          value={data.overdueTasks}
        />
        <StatCard
          title="Completion"
          value={`${data.completionRate}%`}
        />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <ActivityChart
          data={data.last7DaysCompletion}
        />
        <StatusDonut data={data} />
      </div>
      <ActivityHeatmap
        activityByDate={data.activityByDate}
      />
    </div>
  );
};

export default DashboardContainer;