"use client";
import { NavLinks } from "@/data/constants";
import Link from "next/link";
import { BiCart } from "react-icons/bi";
import { CgClose } from "react-icons/cg";
import { LuLogIn } from "react-icons/lu";

type MobileNavProps = {
  showNav: boolean;
  closeNavHandler: () => void;
};

const MobileNav = ({ showNav, closeNavHandler }: MobileNavProps) => {
  const show = showNav ? "translate-x-0" : "translate-x-full";
  return (
    <div>
      <div
        className={`fixed ${show} inset-0 transform transition-all right- duration-500 z-[10000]  w-full h-screen`}
      >
        <div
          className={`text-white ${show} fixed justify-center flex flex-col h-full transform transition-all duration-500 delay-300 w-[80%] sm-w-[60%] bg-zinc-50 space-y-6 z-[-1000050] right-0`}
        >
          {NavLinks.map((link) => (
            <Link key={link.name} href={link.path} onClick={closeNavHandler}>
              <p className="text-primary-red w-fit text-xl ml-12 border-b-[1.5px] pb-1 border-primary-red sm:text-[30px]">
                {link.name}
              </p>
            </Link>
          ))}
          <div className="flex space-x-2">
            <Link
              href={"/cart"}
              className="px-6 py-3.5 text-sm cursor-pointer text-primary-red rounded-lg flex items-center space-x-1"
            >
              <BiCart className="w-6 h-6" />
              <span>0</span>
            </Link>
            <Link
              href={"/login"}
              className="px-8 py-3.5 text-sm cursor-pointer rounded-lg bg-primary-red hover:bg-primary-green transition-all duration-300 text-white flex items-center space-x-2"
            >
              <LuLogIn className="w-5 h-5" />
              <span>Log In</span>
            </Link>
          </div>
        </div>
        <CgClose
          onClick={closeNavHandler}
          className="absolute top-[0.7rem] right-[1.4rem] sm:w-8 w-6 h-6 cursor-pointer text-primary-red"
        />
      </div>
    </div>
  );
};

export default MobileNav;
