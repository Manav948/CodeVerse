import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Hero from "./HomeSection";

const HomePage = () => {
  return (
    <main className="relative w-full min-h-screen bg-black text-white overflow-x-hidden">
      <Header />
      <div className="relative z-0">
        <Hero />
      </div>
      <Footer />
    </main>
  );
};

export default HomePage;