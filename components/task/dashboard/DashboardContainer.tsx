"use client";

import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";

import { 
  Plus, 
  Search, 
  Calendar, 
  Sparkles, 
  AlertCircle, 
  BarChart4,
  Flame,
  CheckCircle2,
  Clock
} from "lucide-react";

import Loader from "@/components/ui/Loading";
import ActivityChart from "./ActivityChart";
import StatusDonut from "./Status";
import ActivityHeatmap from "./HeatMap";
import StatCard from "./StateCard";
import TaskArchitecturePanel from "./TaskArchitecturePanel";
import Header from "@/components/dashboard/Header/Header";
import Sidebar from "../sidebar/Sidebar";
import { ActiveSection } from "../sidebar/SidebarContainer";
import { Task } from "@/types/task";

const DashboardContainer = () => {
  const [active, setActive] = useState<ActiveSection>("tasks");
  const { data: session } = useSession();
  const router = useRouter();

  const user = session?.user;
  const username = user?.name || user?.username || "Developer";

  // 1. Fetch dashboard analytics
  const { data: analytics, isLoading: analyticsLoading, isError: analyticsError } = useQuery({
    queryKey: ["dashboardAnalytics"],
    queryFn: async () => {
      const res = await axios.get("/api/task/dashboard/analytics");
      return res.data;
    },
  });

  // 2. Fetch actual tasks list for Deadlines
  const { data: tasks, isLoading: tasksLoading } = useQuery<Task[]>({
    queryKey: ["tasks"],
    queryFn: async () => {
      const res = await axios.get("/api/task/get");
      return res.data;
    },
  });

  if (analyticsLoading || tasksLoading) {
    return (
      <div className="py-20 text-center text-white/50">
        <Loader />
      </div>
    );
  }

  if (analyticsError || !analytics) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#090909] text-red-400 font-mono text-sm">
        Failed to load dashboard data
      </div>
    );
  }

  const pendingTasks = tasks?.filter((t) => t.status !== "COMPLETED") || [];
  
  const upcomingDeadlines = pendingTasks
    .filter((t) => t.dueDate && dayjs(t.dueDate).isAfter(dayjs(), "day"))
    .sort((a, b) => dayjs(a.dueDate).diff(dayjs(b.dueDate)))
    .slice(0, 3);

  return (
    <div className="flex min-h-screen bg-[#090909] text-white">
  
      <aside className="hidden lg:flex border-r border-white/5 bg-[#090909]">
        <Sidebar active={active} setActive={setActive} />
      </aside>

      <div className="flex flex-1 flex-col overflow-hidden bg-[#090909]">
        <header className="sticky top-0 z-40 bg-[#090909]/80 backdrop-blur-md border-b border-white/5">
          <Header />
        </header>

        <main className="flex-1 overflow-y-auto px-4 py-8 sm:px-8 sm:py-10 space-y-10 sm:space-y-14 bg-[#090909]">
        
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 border-b border-white/5 pb-8">
            <div className="space-y-2">
              <h1 className="text-xl sm:text-2xl font-semibold text-white/95 tracking-tight">
                Welcome back, {username}
              </h1>
              <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-xs text-white/40 font-mono">
                <div className="flex items-center gap-1.5">
                  <BarChart4 size={13} className="text-red-400" />
                  <span>Score: <b className="text-white/80">{analytics.productivityScore}/100</b></span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Flame size={13} className="text-orange-400" />
                  <span>Streak: <b className="text-white/80">{analytics.currentStreak} days</b></span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 size={13} className="text-red-400" />
                  <span>Done: <b className="text-white/80">{analytics.completionRate}%</b></span>
                </div>
              </div>
            </div>

          
            <div className="flex items-center gap-3">
              <div className="relative w-full max-w-[200px] hidden sm:block">
                <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-white/30" />
                <input
                  type="text"
                  placeholder="Search workspace..."
                  className="w-full bg-[#111111] border border-white/5 rounded-lg py-1.5 pl-8 pr-3 text-[11px] font-mono text-white/80 placeholder-white/25 focus:border-white/10 outline-none transition-colors"
                  readOnly
                />
                <span className="absolute right-2 top-2 text-[9px] font-mono text-white/20 bg-white/5 px-1 rounded border border-white/5">
                  ⌘K
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
            
          
            <div className="xl:col-span-8 space-y-6">
              
              <ActivityHeatmap activityByDate={analytics.activityByDate} />

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-[#111111] border border-white/5 p-4 rounded-xl space-y-2">
                  <div className="text-[10px] font-mono tracking-wider text-white/30 uppercase">Consistency</div>
                  <div className="text-xs text-white/80 font-medium leading-relaxed">
                    Active on <span className="text-red-400 font-semibold">{Object.keys(analytics.activityByDate).filter(d => dayjs(d).isAfter(dayjs().subtract(7, 'day'))).length}</span> of the last 7 days. Your schedule remains solid.
                  </div>
                </div>
                <div className="bg-[#111111] border border-white/5 p-4 rounded-xl space-y-2">
                  <div className="text-[10px] font-mono tracking-wider text-white/30 uppercase">Focus Rate</div>
                  <div className="text-xs text-white/80 font-medium leading-relaxed">
                    Your average completion stands at <span className="text-red-400 font-semibold">{analytics.completionRate}%</span>. Velocity is normal.
                  </div>
                </div>
                <div className="bg-[#111111] border border-white/5 p-4 rounded-xl space-y-2">
                  <div className="text-[10px] font-mono tracking-wider text-white/30 uppercase">Milestones</div>
                  <div className="text-xs text-white/80 font-medium leading-relaxed">
                    Maintain your streak of <span className="text-orange-400 font-semibold">{analytics.currentStreak} days</span> to hit your next target.
                  </div>
                </div>
              </div>

            
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
                <div className="bg-[#111111] border border-white/5 p-5 sm:p-6 rounded-xl space-y-4 shadow-sm">
                  <div className="flex items-center gap-2 border-b border-white/[0.04] pb-3">
                    <Clock size={14} className="text-amber-400" />
                    <h3 className="text-sm font-medium text-white/90">Upcoming Deadlines</h3>
                  </div>

                  {upcomingDeadlines.length === 0 ? (
                    <p className="text-[11px] text-white/35 py-4 font-mono">No deadlines approaching.</p>
                  ) : (
                    <div className="space-y-3.5">
                      {upcomingDeadlines.map((task) => (
                        <div key={task.id} className="flex justify-between items-center gap-2 text-xs">
                          <div className="min-w-0 flex-1">
                            <p className="text-white/80 truncate font-medium">{task.title}</p>
                            <p className="text-[9px] font-mono text-white/35 mt-0.5 uppercase">{task.priority} priority</p>
                          </div>
                          <span className="shrink-0 font-mono text-[10px] text-amber-500/70 bg-amber-500/5 px-2 py-0.5 rounded border border-amber-500/10">
                            {dayjs(task.dueDate).format("MMM DD")}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

               
                <div className="relative overflow-hidden rounded-xl border border-[#ef4444]/20 bg-linear-to-b from-[#ef4444]/5 to-transparent p-5 sm:p-6 space-y-3.5 shadow-md flex flex-col justify-between">
                  <div className="space-y-3.5">
                    <div className="flex items-center gap-2 text-[#ef4444]">
                      <Sparkles size={14} className="animate-pulse" />
                      <span className="text-[10px] font-mono tracking-widest font-semibold uppercase">AI INSIGHT</span>
                    </div>
                    <p className="text-xs text-white/70 leading-relaxed font-medium">
                      "{username}, your task completion rate spikes by{" "}
                      <span className="text-[#ef4444] font-semibold">15% on Tuesdays</span>. Consider scheduling your most complex coding blocks then to leverage high-focus slots."
                    </p>
                  </div>
                  <div className="text-[9px] font-mono text-white/20 self-end">
                    Updated just now
                  </div>
                </div>
              </div>
            </div>

           
            <div className="xl:col-span-4 space-y-6">
             
              <TaskArchitecturePanel />

              
              <div className="bg-[#111111] border border-white/5 p-5 sm:p-6 rounded-xl space-y-4 shadow-sm">
                <h3 className="text-xs font-mono tracking-wider text-white/30 uppercase">Quick Navigation</h3>
                <div className="grid grid-cols-2 gap-2 text-[11px] font-medium font-mono text-white/60">
                  <button 
                    onClick={() => router.push("/task/new")}
                    className="flex items-center justify-between p-2.5 rounded-lg border border-white/5 bg-white/[0.01] hover:bg-white/[0.04] transition-colors cursor-pointer group"
                  >
                    <span>New Task</span>
                    <Plus size={12} className="text-white/30 group-hover:text-white transition-colors" />
                  </button>
                  <button 
                    onClick={() => router.push("/calendar")}
                    className="flex items-center justify-between p-2.5 rounded-lg border border-white/5 bg-white/[0.01] hover:bg-white/[0.04] transition-colors cursor-pointer group"
                  >
                    <span>Calendar</span>
                    <Calendar size={12} className="text-white/30 group-hover:text-white transition-colors" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <section className="space-y-4 pt-4 border-t border-white/5">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ef4444]" />
              <h2 className="text-xs font-mono tracking-widest text-white/30 uppercase">
                Work Overview
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              <StatCard 
                title="Total Tasks" 
                value={analytics.totalTask} 
                trend="+4% vs last week"
                trendDirection="up"
                sparklineData={[12, 14, 13, 16, 15, 18, analytics.totalTask]}
                accentColor="#ef4444"
              />
              <StatCard 
                title="Completed" 
                value={analytics.completedTask} 
                trend="+15% vs last week"
                trendDirection="up"
                sparklineData={[4, 6, 5, 8, 7, 10, analytics.completedTask]}
                accentColor="#ef4444"
              />
              <StatCard 
                title="Pending" 
                value={analytics.pendingTask} 
                trend="-10% vs last week"
                trendDirection="down"
                sparklineData={[8, 7, 8, 6, 7, 6, analytics.pendingTask]}
                accentColor="#f87171"
              />
              <StatCard 
                title="Overdue" 
                value={analytics.overdueTasks} 
                trend="-25% vs last week"
                trendDirection="down"
                sparklineData={[3, 2, 3, 1, 2, 1, analytics.overdueTasks]}
                accentColor="#b91c1c"
              />
              <StatCard 
                title="Completion Rate" 
                value={`${analytics.completionRate}%`} 
                trend="+5% vs last week"
                trendDirection="up"
                sparklineData={[70, 75, 72, 80, 85, 90, analytics.completionRate]}
                accentColor="#ef4444"
              />
            </div>
          </section>

          <section className="space-y-4 pt-4 border-t border-white/5">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ef4444]" />
              <h2 className="text-xs font-mono tracking-widest text-white/30 uppercase">
                Performance Analytics
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
             
              <ActivityChart data={analytics.last7DaysCompletion} />

           
              <StatusDonut data={analytics} />
            </div>

            <div className="bg-[#111111] border border-white/5 rounded-xl p-5 sm:p-6 space-y-4 mt-6">
              <div className="flex items-center gap-2">
                <AlertCircle size={14} className="text-red-400" />
                <h4 className="text-xs font-mono tracking-wider text-white/40 uppercase">Productivity Benchmarks</h4>
              </div>
              <ul className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-medium text-white/80">
                <li className="flex items-center gap-2.5 p-2 bg-white/[0.01] border border-white/[0.02] rounded-lg">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#ef4444] shrink-0" />
                  <span>Most productive day: <b className="text-white">Tuesday</b></span>
                </li>
                <li className="flex items-center gap-2.5 p-2 bg-white/[0.01] border border-white/[0.02] rounded-lg">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-400 shrink-0" />
                  <span>Completion rate increased by <b className="text-red-400">15%</b></span>
                </li>
                <li className="flex items-center gap-2.5 p-2 bg-white/[0.01] border border-white/[0.02] rounded-lg">
                  <div className="w-1.5 h-1.5 rounded-full bg-orange-400 shrink-0" />
                  <span>Current streak status: <b className="text-orange-400">{analytics.currentStreak} days active</b></span>
                </li>
              </ul>
            </div>
          </section>

        </main>
      </div>
    </div>
  );
};

export default DashboardContainer;