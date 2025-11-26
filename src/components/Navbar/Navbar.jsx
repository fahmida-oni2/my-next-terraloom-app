"use client";
import Link from "next/link";
import React from "react";
import Image from 'next/image';
import {
  SignOutButton,
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import logo from "../../../public/logo.png"
export default function Navbar() {
  const {  user } = useUser();
  const pathname = usePathname();
  const baseLinkClasses = "m-2 p-2 rounded-lg transition-colors duration-200";
  const getLinkClasses = (href) => {
    const isActive = pathname === href;
    return isActive
      ? `${baseLinkClasses} underline` //active state
      : `${baseLinkClasses} text-gray-700 hover:bg-gray-200 lg:text-base-content`; //inactive state
  };

  const links = (
    <>
      <li>
        <Link href="/" className={getLinkClasses("/")}>
          Home
        </Link>
      </li>
      <li>
        <Link href="/all-kits" className={getLinkClasses("/all-kits")}>
          All Kits
        </Link>
      </li>
      <li>
        <Link href="/about" className={getLinkClasses("/about")}>
          About
        </Link>
      </li>
      <li>
        <Link href="/my-kit" className={getLinkClasses("/my-kit")}>
          My Kit
        </Link>
      </li>
      <li>
        <Link href="/my-review" className={getLinkClasses("/my-review")}>
          Review
        </Link>
      </li>
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-sm">
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
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>
<Image
  src={logo}
  alt="" 
  width={48} 
  height={48}
  className="ml-3 w-12 h-12 rounded-full" 
/>
       <Link href="/" className="btn btn-ghost text-xl font-serif text-secondary">
          TerraLoom
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>
      <div className="navbar-end">
        <SignedOut>
        <div className="">
           <Link href="/login" className="btn btn-primary w-14 lg:w-22 bg-gradient-to-r from-[#632EE3] to-[#9F62F2] ">
              Login
            </Link>
         <Link href="/register" className="btn btn-primary  mr-3 w-14 lg:w-22 bg-gradient-to-r from-[#632EE3] to-[#9F62F2] ml-2 lg:ml-5">
              Sign Up
            </Link>
        </div>
        </SignedOut>
        <SignedIn>
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <UserButton 
                    appearance={{
                        elements: {
                            userButtonAvatarBox: "h-10 w-10", 
                        }
                    }}
                   
                />
            </div>
          <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[10] mt-3 w-52 p-2 shadow"
            >
            <li>
                <div className="font-bold text-lg text-black ">
                   {user?.fullName || 'User'}
                </div>
                <p className="text-sm text-gray-500 truncate mb-2">
                  {user?.emailAddresses[0]?.emailAddress}
                </p>
                <div className="divider my-0"></div>
              </li>
              <li>
                <Link href="/add-kit" >
                 Add Kit
                </Link>
              </li>
              <li>
                <Link href="/manage-kit" className='mb-3' >
                   Manage Kits
                </Link>
              </li>
              <li>
                <SignOutButton >
                    <button className=" btn btn-primary w-full bg-gradient-to-r from-[#632EE3] to-[#9F62F2] ">
                     Sign Out
                    </button>
                </SignOutButton>
              </li>
              </ul>
              
          </div>
        </SignedIn>
       
      </div>
    </div>
  );
}
