"use client";

import Header from "../dashboard/Header/Header";
import Sidebar from "../dashboard/Sidebar";
import AllArticle from "./AllArticle";

const ArticleContainer = () => {
  return (
    <div className="h-screen bg-black text-white flex flex-col">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto relative">
          <div className="relative mx-auto max-w-4xl px-4 sm:px-6 py-6 sm:py-8">
            <AllArticle />
          </div>
        </main>
      </div>
    </div>
  );
};

export default ArticleContainer;
