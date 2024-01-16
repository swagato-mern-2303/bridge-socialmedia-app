import { NavLink } from "react-router-dom";
import { GoHomeFill } from "react-icons/go";
import { FaUser } from "react-icons/fa";

const navbarLinks = [
  { linkTo: "/", icon: <GoHomeFill /> },
  { linkTo: "/users", icon: <FaUser /> },
];

export default function Navbar() {
  return (
    <div className="bg-dark-300 sticky left-0 top-0 border-b border-white/20 py-4">
      <div className="flex justify-between px-2 text-white">
        {/* <picture>
      <img src="" alt="" />
    </picture> */}

        <div>logo</div>
        <ul className="flex gap-x-10 text-white">
          {navbarLinks.map((item, index) => (
            <NavItem key={index} data={item} />
          ))}
        </ul>
        <div>profile</div>
      </div>
    </div>
  );
}

function NavItem({ data }) {
  return (
    <li>
      <NavLink>{data.icon}</NavLink>
    </li>
  );
}
