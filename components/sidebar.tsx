import MainNav from "@/components/main-nav";

const Sidebar = () => {
  return (
    <div className=" border-b flex items-center gap-4 h-16 px-4 justify-between">
      <div className="flex gap-4">
        <MainNav />
      </div>
      <div className="text-sm">Sign in</div>
    </div>
  );
};

export default Sidebar;
