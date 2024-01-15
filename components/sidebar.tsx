import MainNav from "@/components/main-nav";
import Logo from "./logo";

const Sidebar = () => {
  return (
    <aside className="w-[250px] row-span-full border-r py-8 px-6">
      <div className="flex flex-col gap-8">
        <Logo />
        <MainNav />
      </div>
    </aside>
  );
};

export default Sidebar;
