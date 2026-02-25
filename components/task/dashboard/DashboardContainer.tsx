"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import Loader from "@/components/ui/Loading";
import ActivityChart from "./ActivityChart";
import StatusDonut from "./Status";
import ActivityHeatmap from "./HeatMap";
import StatCard from "./StateCard";
import TaskArchitecturePanel from "./TaskArchitecturePanel";
import Header from "@/components/dashboard/Header/Header";
import Sidebar from "../sidebar/Sidebar";
import { ActiveSection } from "../sidebar/SidebarContainer";

const DashboardContainer = () => {
  const [active, setActive] =
    useState<ActiveSection>("tasks");

  const { data, isLoading, isError } = useQuery({
    queryKey: ["dashboardAnalytics"],
    queryFn: async () => {
      const res = await axios.get(
        "/api/task/dashboard/analytics"
      );
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-red-400">
        Error loading dashboard
      </div>
    );
  }

  return (
    <div className="h-screen bg-black text-white flex overflow-hidden">
      <aside className="flex shrink-0">
        <Sidebar active={active} setActive={setActive} />
      </aside>

      <div className="flex-1 flex flex-col">
        <header className="h-16 flex items-center shrink-0">
          <Header />
        </header>

        <main className="flex-1 overflow-y-auto">
          <div className="max-w-350 mx-auto px-8 py-10 space-y-16">

            <section className="space-y-6">
              <h2 className="text-md tracking-wider text-white font-medium">
                OVERVIEW
              </h2>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
                <StatCard title="Total Tasks" value={data.totalTask} />
                <StatCard title="Completed" value={data.completedTask} />
                <StatCard title="Pending" value={data.pendingTask} />
                <StatCard title="Overdue" value={data.overdueTasks} />
                <StatCard
                  title="Completion Rate"
                  value={`${data.completionRate}%`}
                />
              </div>
            </section>

            <section className="space-y-6">
              <h2 className="text-md tracking-wider text-white/ font-medium">
                ACTIVITY & WORKFLOW
              </h2>

              <div className="grid grid-cols-12 gap-10 items-start">

                <div className="col-span-12 xl:col-span-8 rounded-3xl border border-white/5 bg-black/40 backdrop-blur-xl p-6">
                  <ActivityHeatmap activityByDate={data.activityByDate} />
                </div>

                <div className="col-span-12 xl:col-span-4 rounded-3xl border border-white/5 bg-black/40 backdrop-blur-xl shadow-[0_0_40px_rgba(99,102,241,0.08)]">
                  <TaskArchitecturePanel />
                </div>

              </div>
            </section>

            <section className="space-y-6">
              <h2 className="text-md tracking-wider text-white font-medium">
                PERFORMANCE ANALYTICS
              </h2>

              <div className="grid lg:grid-cols-2 gap-8">
                <div className="rounded-3xl border border-white/5 bg-black/40 backdrop-blur-xl">
                  <ActivityChart data={data.last7DaysCompletion} />
                </div>

                <div className="rounded-3xl border border-white/5 bg-black/40 backdrop-blur-xl">
                  <StatusDonut data={data} />
                </div>
              </div>
            </section>

          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardContainer;