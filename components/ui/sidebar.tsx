import MainNav from "@/components/ui/main-nav";
import Logo from "@/components/ui/logo";

const Sidebar = () => {
  return (
    <aside className="w-[225px] row-span-full">
      <div className="flex flex-col gap-6 py-2 px-2">
        <Logo />
        <MainNav />
      </div>
    </aside>
  );
};

export default Sidebar;
