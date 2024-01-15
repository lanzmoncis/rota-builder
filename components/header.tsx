import { User, LogOut, Moon } from "lucide-react";
// Styling to be change
const Header = () => {
  return (
    <div>
      <ul className="flex justify-end items-center h-16 border-b py-4 px-6 gap-6">
        <li>
          <User color="#15803d" className="w-5 h-5" />
        </li>
        <li>
          <Moon color="#15803d" className="w-5 h-5" />
        </li>
        <li>
          <LogOut color="#15803d" className="w-5 h-5" />
        </li>
      </ul>
    </div>
  );
};

export default Header;
