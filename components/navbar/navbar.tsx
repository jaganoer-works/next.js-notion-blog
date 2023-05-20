import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <div className="navbar bg-base-100 mx-auto lg:px-2 px-5 lg:w-3/5">
      <div className="flex-1">
        <Link href="/" className="text-2xl">
          Notion Blog
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link href="/">Home</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
