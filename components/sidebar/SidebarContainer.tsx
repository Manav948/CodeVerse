import OptionSidebar from "./OptionSidebar";

const SidebarContainer = () => {
  return (
    <aside
      className="
        hidden md:block sticky top-20 h-[calc(100vh-4.2rem)] w-64 shrink-0 border-r border-white/10  p-4
        backdrop-blur-xl
      "
    >
      <div className="mb-6 flex items-center gap-2 px-2">
        <img
          src="/logo2.png"
          alt="Code Verse"
          className="h-10 w-13 rounded-xl object-cover"
        />
        <h1
          className="text-2xl md:text-3xl font-bold tracking-tight bg-red-500 bg-clip-text text-transparent
          drop-shadow-[0_0_12px_rgba(255,0,80,0.4)]
  "
        >
          Code<span className="text-white">Verse</span>
        </h1>
      </div>

      <div className="mb-4 h-px bg-white/10" />

      <OptionSidebar />
    </aside>
  );
};

export default SidebarContainer;
