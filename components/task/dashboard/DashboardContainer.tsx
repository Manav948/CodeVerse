"use client";
import Header from "@/components/dashboard/Header/Header";
import SidebarContainer from "../sidebar/SidebarContainer";


const DashboardContainer = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <div className="flex">
        <div>
          <SidebarContainer />
        </div>
      </div>
    </div>
  );
};

export default DashboardContainer;