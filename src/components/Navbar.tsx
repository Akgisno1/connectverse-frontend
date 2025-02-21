import { Link, useLocation } from "react-router-dom";
import Loginout from "./Loginout";
import { Input } from "./ui/input";
import { SearchIcon } from "lucide-react";

const Navbar = () => {
  const location = useLocation();
  if (location.pathname === "/signup" || location.pathname === "/login") {
    return null;
  }
  return (
    <nav className="m-[1vw] px-[2vw] text-white items-center flex flex-row justify-between w-[98vw] h-[5vw]">
      <div className="flex flex-row items-center justify-center gap-[2vw]">
        <Link to="/" className="text-[2.5vw] font-bold items-center font-mono ">
          Melody<span className="text-violet-700">Verse</span>
        </Link>
        <div className="relative">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white" />
          <Input
            type="text"
            placeholder="What music do you wish to listen?"
            className="bg-neutral-800 w-[40vw] h-[3vw] text-white font-bold font-mont border-1 border-white p-2 pl-10 rounded-full text-sm"
          />
        </div>
      </div>

      <div className="flex flex-row items-center">
        <Loginout />
      </div>
    </nav>
  );
};

export default Navbar;
