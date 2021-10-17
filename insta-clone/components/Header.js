import Image from "next/image";

import {
  SearchIcon,
  HomeIcon,
  MenuIcon,
  PaperAirplaneIcon,
  PlusCircleIcon,
  UserAddIcon,
  HeartIcon,
} from "@heroicons/react/outline";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";

function Header() {
  const { data: session } = useSession();

  const router = useRouter();

  console.log(`Seession ${JSON.stringify(session)}`);

  return (
    <div className="shadow-sm border-b bg-white sticky top-0 z-50">
      <div className="flex justify-between mx-5 lg:mx-auto max-w-6xl">
        {/* Left: Logo  */}

        {/* Logo1: Large Screen   */}
        <div
          className="relative hidden lg:inline-grid w-24 cursor-pointer"
          onClick={() => router.push("/")}
        >
          <Image
            src="https://links.papareact.com/ocw"
            layout="fill"
            objectFit="contain" // Maintain aspect ratio
          />
        </div>

        {/* Logo1: Mobile Screen   */}
        <div className="relative lg:hidden h-10 w-10 flex-shrink-0 mt-4 cursor-pointer">
          <Image
            src="https://links.papareact.com/jjm"
            layout="fill"
            objectFit="contain" // Maintain aspect ratio
          />
        </div>

        {/* Middle: Search Input field*/}
        <div className="max-w-xs">
          <div className="relative mt-1 p-3 rounded-md">
            <div
              className="absolute inset-y-0 pl-3 flex items-center 
                       pointer-events-none"
            >
              <SearchIcon className="h-5 w-5 text-gray-500" />
            </div>
            <input
              className="bg-gray-50 block w-full 
                           pl-10 focus:ring-black focus: border-black 
                           sm-text-sm rounded-md"
              placeholder="Search"
              type="text"
            />
          </div>
        </div>

        {/* Right: Clickable links/modals */}
        <div className="flex justify-end items-center space-x-4">
          <HomeIcon onClick={() => router.push("/")} className="navBtn" />
          <MenuIcon className="h-6 md:hidden cursor-pointer" />

          {/* Paper sideways with Pill message  */}
          {session ? (
            <>
              <div className="relative navBtn">
                <PaperAirplaneIcon className="navBtn rotate-45" />
                <div
                  className="absolute -top-1 -right-2 text-xs w-5 h-5
                      rounded-full flex items-center justify-center
                      animate-pulse 
                      text-white bg-red-500"
                >
                  3
                </div>
              </div>
              <PlusCircleIcon className="navBtn" />
              <UserAddIcon className="navBtn" />
              <HeartIcon className="navBtn" />
              <img
                onClick={signOut}
                src={session.user.image}
                alt="Profile Picture"
                className="h-10 w-10 cursor-pointer rounded-full"
              />
            </>
          ) : (
            <button onClick={signIn}>Signin</button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
