"use client";
import { useState } from "react";
import NavBar from "./Navbar";
import MobileNav from "./MobileNav";

const ResponsiveNav = () => {
  const [showNav, setShowNav] = useState(false);
  const openNavHandler = () => {
    setShowNav(true);
  };
  const closeNavHandler = () => {
    setShowNav(false);
  };
  return (
    <div>
      <NavBar openNavHandler={openNavHandler} />
      <MobileNav showNav={showNav} closeNavHandler={closeNavHandler} />
    </div>
  );
};

export default ResponsiveNav;
