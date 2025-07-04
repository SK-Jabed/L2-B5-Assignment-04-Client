import { Link, NavLink } from "react-router";
import logo from "../../../assets/logo-1.png";

const Navbar = () => {
  const links = (
    <>
      <li>
        <NavLink
          to="/books"
          className={({ isActive, isPending }) =>
            isPending
              ? "pending"
              : isActive
              ? "active text-[#1BBC9B] underline"
              : ""
          }
        >
          All Books
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/create-book"
          className={({ isActive, isPending }) =>
            isPending
              ? "pending"
              : isActive
              ? "active text-[#1BBC9B] underline"
              : ""
          }
        >
          Add Book
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/borrow-summary"
          className={({ isActive, isPending }) =>
            isPending
              ? "pending"
              : isActive
              ? "active text-[#1BBC9B] underline"
              : ""
          }
        >
          Borrow Summary
        </NavLink>
      </li>
    </>
  );
  return (
    <div className="w-full bg-[#ECF0F1]  px-5 py-2 sticky top-0 z-50 shadow-md">
      <div className="navbar  container mx-auto">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {links}
            </ul>
          </div>
          <Link to="/" className="">
            <img className="h-12" src={logo} alt="" />
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 text-lg font-medium">
            {links}
          </ul>
        </div>
        <div className="navbar-end">
          <Link
            to="/books"
            className="btn rounded-none h-12 bg-[#1BBC9B] hover:bg-[#16A086] text-white"
          >
            BORROW A BOOK
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
