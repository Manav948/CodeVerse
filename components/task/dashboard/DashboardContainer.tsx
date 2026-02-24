"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

import Loader from "@/components/ui/Loading";
import ActivityChart from "./ActivityChart";
import StatusDonut from "./Status";
import ActivityHeatmap from "./HeatMap";
import StatCard from "./StateCard";
import Header from "@/components/dashboard/Header/Header";
import Sidebar from "../sidebar/Sidebar";
import { ActiveSection } from "../sidebar/SidebarContainer";

const DashboardContainer = () => {
  const [active, setActive] = useState<ActiveSection>("tasks");

  const { data, isLoading, isError } = useQuery({
    queryKey: ["dashboardAnalytics"],
    queryFn: async () => {
      const res = await axios.get("/api/task/dashboard/analytics");
      return res.data;
    },
  });

  if (isLoading) return <Loader />;
  if (isError || !data)
    return (
      <div className="h-screen flex items-center justify-center text-red-400">
        Error loading dashboard
      </div>
    );

  return (
    <div className="min-h-screen bg-black flex text-white">
      <div className="flex shrink-0">
        <Sidebar active={active} setActive={setActive} />
      </div>

      <div className="flex-1 flex flex-col">
        <div className="border-b border-white/10">
          <Header />
        </div>
        <div className="flex-1 p-6 space-y-8 overflow-y-auto">

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <StatCard title="Total Tasks" value={data.totalTask} />
            <StatCard title="Completed" value={data.completedTask} />
            <StatCard title="Pending" value={data.pendingTask} />
            <StatCard title="Overdue" value={data.overdueTasks} />
            <StatCard
              title="Completion Rate"
              value={`${data.completionRate}%`}
            />
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            <ActivityChart data={data.last7DaysCompletion} />
            <StatusDonut data={data} />
          </div>
          <div>
            <ActivityHeatmap activityByDate={data.activityByDate} />
          </div>

        </div>
      </div>
    </div>
  );
};

export default DashboardContainer;