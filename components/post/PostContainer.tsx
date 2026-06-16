"use client"
import Header from "../dashboard/Header/Header";
import Sidebar from "../dashboard/Sidebar";
import AllPost from "./AllPost";

const PostContainer = () => {
  return (
    <div className="h-screen bg-black text-white flex flex-col">
      <Header />

      <div className="flex flex-1 overflow-hidden">

        <Sidebar />
        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto w-full max-w-3xl  px-5 sm:py-8 py-6">
            <AllPost />
          </div>
        </main>
      </div>
    </div>
  );
};

export default PostContainer;