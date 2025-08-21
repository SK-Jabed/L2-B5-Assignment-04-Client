import { Link, NavLink } from "react-router-dom";
import logo from "../../../assets/favicon/book.png";
import Container from "../Container/Container";

const Navbar = () => {
  const navLinks = (
    <>
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "text-lg font-bold text-cyan-400 underline"
              : "text-lg font-medium text-gray-800 hover:text-cyan-400 dark:text-white"
          }
          to={"/"}
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "text-lg font-bold text-cyan-400 underline"
              : "text-lg font-medium text-gray-800 hover:text-cyan-400 dark:text-white"
          }
          to={"/books"}
        >
          All Books
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "text-lg font-bold text-cyan-400 underline"
              : "text-lg font-medium text-gray-800 hover:text-cyan-400 dark:text-white"
          }
          to={"/create-book"}
        >
          Add Book
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "text-lg font-bold text-cyan-400 underline"
              : "text-lg font-medium text-gray-800 hover:text-cyan-400 dark:text-white"
          }
          to={"/borrow-summary"}
        >
          Borrow Summary
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="sticky top-0 z-50 bg-white shadow-sm dark:bg-gray-900">
      <Container>
        <div className="navbar py-2">
          {/* Navbar Start */}
          <div className="navbar-start">
            <div className="dropdown lg:hidden">
              <button
                tabIndex={0}
                className="btn btn-ghost p-2 hover:bg-gray-100"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-gray-700 dark:text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-3 shadow-lg bg-white dark:bg-gray-800 rounded-box w-52 space-y-1"
              >
                {navLinks}
              </ul>
            </div>

            <Link to="/" className="flex gap-2 items-center text-teal-500">
              <img className="w-auto h-10" src={logo} alt="BoiBazaar Logo" />
              <span className="text-2xl lg:text-3xl font-bold hidden md:block">
                <span className="text-black dark:text-white">Boi</span>
                Bazaar
              </span>
            </Link>
          </div>

          {/* Navbar Center */}
          <div className="navbar-center hidden lg:flex">
            <ul className="px-1 items-center text-lg font-medium flex gap-6">
              {navLinks}
            </ul>
          </div>

          {/* Navbar End */}
          <div className="navbar-end">
            <Link
              to="/books"
              className="relative inline-flex items-center justify-center px-5 py-2.5 font-medium text-white bg-gradient-to-r from-purple-500 to-indigo-500 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 hover:from-purple-600 hover:to-indigo-600 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
              </svg>
              BORROW BOOK
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Navbar;