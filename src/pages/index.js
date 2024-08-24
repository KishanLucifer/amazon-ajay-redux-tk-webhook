import Head from "next/head";
import Header from "../components/Header";
import Banner from "../components/Banner";
import ProductFeed from "../components/ProductFeed";
import { getSession } from "next-auth/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import {
  selectToastMessage,
  selectToastMessageStatus,
  toggleDisplayToast,
} from "../slices/toastMessageSlice";
import path from "path";
import fs from "fs";
import { useEffect } from "react";

export default function Home({ products }) {
  const DisplayToastMessage = useSelector(selectToastMessageStatus);
  const toastMessage = useSelector(selectToastMessage); // Get the toast message
  const dispatch = useDispatch();

  // Use useEffect to trigger the toast and update the state after the component has rendered
  useEffect(() => {
    // console.log("DisplayToastMessage:", DisplayToastMessage);
    // console.log("toastMessage:", toastMessage);

    if (DisplayToastMessage && toastMessage) {
      toast.success(toastMessage, {
        position: "top-center",
      });
      dispatch(toggleDisplayToast());
    }
  }, [DisplayToastMessage, toastMessage, dispatch]);

  return (
    <div className="bg-gray-100">
      <Head>
        <title>Amazon 2.0</title>
      </Head>
      <Header />

      <main className="max-w-screen-2xl mx-auto">
        <ToastContainer autoClose={450} />
        {/* Add this component to render the toast messages */}
        {/* The above class means the contents will take the full-screeen width when the screen expands to two 2xl. */}
        {/* Banner */}
        <Banner />
        {/* Product Feed */}
        <ProductFeed products={products} />
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  // Load local data from JSON file
  const filePath = path.join(process.cwd(), "public", "products.json");
  const jsonData = fs.readFileSync(filePath, "utf-8");
  const products = JSON.parse(jsonData);

  return {
    props: {
      session,
      products,
    },
  };
}

// export async function getServerSideProps(context) {
//   const session = getSession(context);
//   // const products = await fetch("https://fakestoreapi.com/products").then(
//   //   (res) => res.json()

//   const products = await fetch("https://fakestoreapi.com/products")
//     .then((res) => res.json())
//     .then((json) => console.log(json));

//   return {
//     props: {
//       products,
//     },
//   };
// }

//Explaining the flow over here,
/**
 * When user makes a request to open the index page, the products object is asynchronously loaded from the input link of fakestore API.
 * This profucts object is returned from the async function to the Home function.
 * The object is then passed as props to the respective component for rendering.
 */

//Explaining the flow over here,
/**
 * When user makes a request to open the index page, the products object is asynchronously loaded from the input link of fakestore API.
 * This profucts object is returned from the async function to the Home function.
 * The object is then passed as props to the respective component for rendering.
 */
