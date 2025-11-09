"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Logo from "../../public/logo.jpg";
import Link from "next/link";
import { NavLinks, SITE_NAME } from "@/data/constants";
import { HiBars3BottomRight } from "react-icons/hi2";
import { BiCart } from "react-icons/bi";
import { LuLogIn } from "react-icons/lu";
import { useCart } from "@/context/CartContext";

type NavProps = {
  openNavHandler: () => void;
};

const NavBar = ({ openNavHandler }: NavProps) => {
  const [navBg, setNavBg] = useState(false);
  const { cart } = useCart();

  // Calculate total items
  const totalItems = Object.keys(cart).length;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 50) {
        setNavBg(true);
      }
      if (window.scrollY < 50) {
        setNavBg(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`transition-all ${
        navBg ? "bg-white shadow-md fixed" : ""
      } duration-200 h-[12vh] z-[10000] w-full`}
    >
      <div className="flex items-center justify-between w-[90%] mx-auto h-full">
        {/* Logo */}
        <Link className="flex items-center space-x-2" href="/">
          <div className=" w-20 h-20 rounded-full flex items-center justify-center flex-col">
            <Image src={Logo} alt="Plant 2 Plate Logo" />
          </div>
          <h1 className="text-xl sm:block md:text-2xl text-primary-green font-bold">
            {SITE_NAME}
          </h1>
        </Link>
        {/* Navigation Links */}
        <div className="hidden space-x-10 items-center lg:flex">
          {NavLinks.map((link) => (
            <Link
              key={link.name}
              href={link.path}
              className="text-base hover:text-primary-red font-medium text-primary-green transition-all duration-200"
            >
              <p>{link.name}</p>
            </Link>
          ))}
        </div>

        {/* Call to Action Button */}
        <div className="hidden sm:inline-flex space-x-2">
          <Link
            href={"/checkout"}
            className="px-6 py-3.5 text-sm cursor-pointer text-primary-green rounded-lg flex items-center space-x-1"
          >
            <BiCart className="w-6 h-6" />
            <span>{totalItems}</span>
          </Link>
          <Link
            href={"/login"}
            className="px-6 py-3.5 text-sm cursor-pointer rounded-lg bg-primary-green hover:bg-primary-red transition-all duration-300 text-white flex items-center space-x-2"
          >
            <LuLogIn className="w-5 h-5" />
            <span>Log In</span>
          </Link>
        </div>

        <HiBars3BottomRight
          onClick={openNavHandler}
          className="w-8 h-8 text-primary-green lg:hidden cursor-pointer"
        />
      </div>
    </div>
  );
};

export default NavBar;
