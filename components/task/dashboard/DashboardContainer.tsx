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
import ProductivityScoreCard from "./ProductivityScoreCard";

const surface =
  "bg-black backdrop-blur-md";

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
      <div className="flex min-h-screen items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black text-red-400">
        Failed to load dashboard data
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-black text-white">
      <aside className="lg:flex flex">
        <Sidebar active={active} setActive={setActive} />
      </aside>

      <div className="flex flex-1 flex-col">
        <header className="backdrop-blur-md">
          <Header />
        </header>

        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto w-full max-w-7xl px-6 py-10 space-y-14">
            <section className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold tracking-wider text-white/60 uppercase">
                  Overview
                </h2>
              </div>

              <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">

                <div className="xl:col-span-4">
                  <ProductivityScoreCard
                    score={data.productivityScore}
                    streak={data.currentStreak}
                  />
                </div>

                <div className="xl:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-6">
                  <StatCard title="Total Tasks" value={data.totalTask} />
                  <StatCard title="Completed" value={data.completedTask} />
                  <StatCard title="Pending" value={data.pendingTask} />
                  <StatCard title="Overdue" value={data.overdueTasks} />
                  <StatCard
                    title="Completion Rate"
                    value={`${data.completionRate}%`}
                  />
                </div>

              </div>
            </section>

            <section className="space-y-6">
              <h2 className="text-sm font-semibold tracking-wider text-white/60 uppercase">
                Activity & Workflow
              </h2>

              <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
                <div className={`xl:col-span-8 p-6 ${surface}`}>
                  <ActivityHeatmap
                    activityByDate={data.activityByDate}
                  />
                </div>


                <div className={`xl:col-span-4 p-6 ${surface}`}>
                  <TaskArchitecturePanel />
                </div>

              </div>
            </section>

            <section className="space-y-6">
              <h2 className="text-sm font-semibold tracking-wider text-white/60 uppercase">
                Performance Analytics
              </h2>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className={`p-6 ${surface}`}>
                  <ActivityChart
                    data={data.last7DaysCompletion}
                  />
                </div>

                <div className={`p-6 ${surface}`}>
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