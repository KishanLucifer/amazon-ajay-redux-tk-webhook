import React, { useEffect, useState } from "react";
import Image from "next/image";
import SearchIcon from "@heroicons/react/outline/SearchIcon";
import ShoppingCartIcon from "@heroicons/react/outline/ShoppingCartIcon";
import MenuIcon from "@heroicons/react/outline/MenuIcon";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { selectItems } from "../slices/basketSlice";
import { ToastContainer, toast } from "react-toastify";

function Header() {
  const items = useSelector(selectItems);
  // console.log(items);
  const session = useSession();
  const router = useRouter();
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    setCartCount(items.length);
  }, [items]);

  const showError = () => {
    console.log("Displayed failure message");
    toast.error("Login to view orders.", {
      // position: toast.POSITION.TOP_CENTER,
      position: "top-center",
      toastId: "failure",
    });
  };
  // console.log(session.data); //To check if user is in session
  return (
    <header className={"sticky top-0 z-50"}>
      {/*Top Nav*/}
      <ToastContainer autoClose={650} />
      <div className="flex items-center bg-amazon_blue p-1 flex-grow py-2">
        {/*The amazon logo. py-2 means the padding top is 0.5 rem*/}
        <div
          className="relative mt-2 mx-5 flex items-center sm:flex-grow-0 w-28
h-10"
        >
          <Image
            className="cursor-pointer  "
            src="https://links.papareact.com/f90"
            fill
            style={{
              objectFit: "contain",
            }}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // Adjust sizes for different screen widths
            onClick={() => router.push("/")}
            priority={true}
            alt="image"
          />
          {/*The flex grow 0 will bring the search bar below to the left once we pass the small screen size.*/}
        </div>

        {/*Search bar*/}
        <div className="hidden sm:flex items-center h-10 rounded-md flex-grow cursor-pointer bg-yellow-400 hover:bg-yellow-500">
          {/*Flex grow means it takes up max space as it can  */}

          {/* The above className means the SearchBar should be hidden at a very small screen aize.
                Only when it reaches small screen size, the display style becomes flex. */}
          <input
            className="p-2 h-full w-6 flex-grow flex-shrink rounded-l-md focus:outline-none px-4"
            type="text"
            placeholder="Ajay appriciate your effort to visit... Thank you...!!!"
          ></input>
          {/* The flex-shrink class will reduce the size of the search bar if we fit other components in. */}
          <SearchIcon className="h-12 p-4" />
        </div>
        {/* Right side of the nav bar */}
        <div className="text-white flex items-center text-xs space-x-6 mx-6 whitespace-no-wrap">
          {/* 'space-x-6' allows the flex items to give a space between these flex items. Here, there is a horizontal space of 6px between each flex-item*/}
          {/* text-xs is abuot the extreme small size of the text. mx-6 is about margin in x-axis of 6 px */}
          {/* 'whitespace-nowrap' means the flex items will not wrap over one another on descreasing the size of the screen. */}
          <div onClick={!session.data ? signIn : signOut} className="link">
            <p>
              {session.data ? `Hello ${session.data.user.name}` : "Sign In"}
            </p>
            <p className="font-extrabold md:text-sm">Account and Lists</p>
          </div>
          <div
            className="link"
            onClick={() =>
              session.data?.user ? router.push("/orders") : showError()
            }
          >
            <p>Returns</p>
            <p className="font-extrabold md:text-sm">& Orders</p>
          </div>
          <div
            className="relative link flex items-center"
            onClick={() => router.push("/checkout")}
          >
            <span className="absolute top-0 right-0 md:right-10 h-4 w-4 bg-yellow-400 text-center rounded-full text-black font-bold">
              {cartCount}
            </span>
            <ShoppingCartIcon className="h-10" />
            {/* A general note. The numbers used here have the conversion system:
                    1 = 0.25 rem */}
            <p className="hidden md:inline font-extrabold md:text-sm mt-2">
              Basket
            </p>
            {/* This means on a mobile view (which is the default view) the basket is hidden. When it reaches medium screen, it will reach inline display. */}
            {/* The mt-2 means margin top of 0.5 rem. */}
          </div>
        </div>
      </div>

      {/*Bottom Nav*/}
      <div className="flex items-center space-x-3 p-2 pl-6 bg-amazon_blue-light text-white text-sm">
        <p className="link flex items-center">
          <MenuIcon className="h-6 mr-1" />
          All
        </p>
        <p className="link">Prime Video</p>
        <p className="link">Amazon Business</p>
        <p className="link">Today`s Deals</p>
        <p className="link hidden lg:inline-flex">Electronics</p>
        <p className="link hidden lg:inline-flex">Food & Grocery</p>
        <p className="link hidden lg:inline-flex">Prime</p>
        <p className="link hidden lg:inline-flex">Buy Again</p>
        <p className="link hidden lg:inline-flex">Shopper Toolkit</p>
        <p className="link hidden lg:inline-flex">Health & Personal Care</p>
      </div>
    </header>
  );
}

export default Header;
