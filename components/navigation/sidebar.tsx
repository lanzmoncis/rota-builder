import MainNav from "@/components/navigation/main-nav";
import Logo from "../ui/logo";

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
