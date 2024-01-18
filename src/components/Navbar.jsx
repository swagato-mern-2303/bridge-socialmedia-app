import { Link, NavLink } from "react-router-dom";
import { GoHomeFill } from "react-icons/go";
import { MdGroups } from "react-icons/md";
import { useSelector } from "react-redux";

const navbarLinks = [
  { linkTo: "/", icon: <GoHomeFill /> },
  { linkTo: "/users", icon: <MdGroups /> },
];

export default function Navbar() {
  const currentUserData = useSelector((state) => state.user.userInfo);

  return (
    <div className="sticky left-0 top-0 border-b border-white/20 bg-dark-300">
      <div className="flex items-center justify-between px-4 text-white">
        {/* <picture>
      <img src="" alt="" />
    </picture> */}

        <div>logo</div>
        <ul className="flex gap-x-2 text-xl leading-none text-white md:text-2xl">
          {navbarLinks.map((item, index) => (
            <NavItem key={index} data={item} />
          ))}
        </ul>
        <Link to="/profile" className="block">
          <picture>
            <img
              className="w-10 rounded-full md:w-12"
              src={currentUserData.photoURL}
              alt="profile image"
            />
          </picture>
        </Link>
      </div>
    </div>
  );
}

function NavItem({ data }) {
  return (
    <li>
      <NavLink
        className="block rounded-md px-6 py-3 hover:bg-dark-200 md:px-10 md:py-4"
        to={data.linkTo}
      >
        {data.icon}
      </NavLink>
    </li>
  );
}
