import {
  FaFacebookF,
  FaTwitter,
  FaYoutube,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-[#34495E] text-white px-6 pt-20 pb-6">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* About / Logo */}
        <div>
          <h2 className="text-xl font-bold mb-3">📚 BookNest</h2>
          <p className="text-sm">
            Streamline book tracking, borrowing, and inventory — all in one
            place.
          </p>
          <div className="flex gap-3 mt-4 text-lg">
            <a href="#" className="hover:text-[#1DA1F2] transition">
              <FaTwitter />
            </a>
            <a href="#" className="hover:text-[#1877F2] transition">
              <FaFacebookF />
            </a>
            <a href="#" className="hover:text-[#FF0000] transition">
              <FaYoutube />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to={"/books"} className="link link-hover">
                All Books
              </Link>
            </li>
            <li>
              <Link to={"/create-book"} className="link link-hover">
                Add Book
              </Link>
            </li>
            <li>
              <Link to={"/borrow-summary"} className="link link-hover">
                Borrow Summary
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Contact Us</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-2">
              <FaMapMarkerAlt />
              123 Library Road, Dhaka
            </li>
            <li className="flex items-center gap-2">
              <FaPhoneAlt />
              +880 197 241 1622
            </li>
            <li className="flex items-center gap-2">
              <FaEnvelope />
              chand.stack@gmail.com
            </li>
          </ul>
        </div>
      </div>

      {/* Footer bottom */}
      <div className="text-center border-t border-base-300 mt-10 pt-4 text-sm text-white bg-[#34495E]">
        © {new Date().getFullYear()} BookNest — All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
