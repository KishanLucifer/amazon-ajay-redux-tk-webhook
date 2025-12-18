import { useSelector } from "react-redux";
import Header from "../components/Header";
import Image from "next/image";
import { selectItems } from "../redux/slices/basketSlice";
import CheckoutProduct from "../components/CheckoutProduct";
// import Currency from "react-currency-formatter-v2";
import { useSession } from "next-auth/react";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { useEffect, useState } from "react";
import { IntlProvider, FormattedNumber } from "react-intl";
import { signIn } from "next-auth/react";

const stripePromise = loadStripe(process.env.stripe_public_key);

function Checkout() {
  const items = useSelector(selectItems);
  const session = useSession();

  const [newBasket, setNewBasket] = useState([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setNewBasket(
      Array.from(new Set(items.map((item) => item.id))).map((id) =>
        items.find((item) => item.id === id)
      )
    );
    setIsClient(true);
  }, [items]);

  // const newBasket = Array.from(new Set(items.map((item) => item.id))).map(
  //   (id) => items.find((item) => item.id === id)
  // );
  // const buttonStyling = `button mt-2 ${
  //   !session.data && "from-gray-300 to-gray-500 text-gray-200 border-gray-200 "
  // }`;

  // Old code

  const createCheckoutSession = async () => {
    // console.log("Checkout session created");
    //Call the backend to create a checkout session
    const stripe = await stripePromise;
    const quantityForItems = new Map();
    newBasket.forEach((itemofNewBasket) => {
      quantityForItems[itemofNewBasket.id] = items.filter(
        (item) => item.id === itemofNewBasket.id
      ).length;
    });
    // console.log(createCheckoutSession);
    //Exact call is here in the two variable assignments below
    const checkoutSession = await axios.post("/api/create-checkout-session", {
      items: newBasket,
      email: session?.data?.user?.email,
      quantityList: quantityForItems,
    });
    const result = await stripe.redirectToCheckout({
      sessionId: checkoutSession.data.id,
    });
    if (result.error) {
      alert(result.error);
    }
  };

  // const createCheckoutSession = async () => {
  //   console.log("Checkout session created");

  //   // Call the backend to create a checkout session
  //   const stripe = await stripePromise;
  //   const quantityForItems = new Map();

  //   newBasket.forEach((itemofNewBasket) => {
  //     quantityForItems[itemofNewBasket.id] = items.filter(
  //       (item) => item.id === itemofNewBasket.id
  //     ).length;
  //   });

  //   // Create metadata with shortened or necessary values only
  //   const metadata = {
  //     imageIds: newBasket.map((item) => item.id).join(","), // Or use any shorter unique identifier
  //   };

  //   try {
  //     const checkoutSession = await axios.post("/api/create-checkout-session", {
  //       items: newBasket,
  //       email: session?.data?.user?.email,
  //       quantityList: quantityForItems,
  //       metadata: metadata, // Pass shortened metadata
  //     });

  //     const result = await stripe.redirectToCheckout({
  //       sessionId: checkoutSession.data.id,
  //     });

  //     if (result.error) {
  //       alert(result.error.message);
  //     }
  //   } catch (error) {
  //     console.error("Error creating checkout session:", error);
  //     alert("There was an error processing your request. Please try again.");
  //   }
  // };

  return (
    <IntlProvider locale="en">
      <div className="bg-gray-100">
        <Header />
        <main className="lg:flex max-w-screen-2xl mx-auto  ">
          {/* Left */}
          <div className="flex-grow m-5 shadow-sm overflow-y-auto">
            <Image
              src="https://links.papareact.com/ikj"
              // layout="responsive"
              height={250}
              width={1020}
              style={{ objectFit: "contain", width: "auto" }}
              priority={true}
              alt=""
              // sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // Adjust sizes for different screen widths
            />
            <div className="flex flex-col p-5 space-y-10 bg-white text-black">
              <h1 className="text-3xl border-b pb-4 ">
                {isClient &&
                  (newBasket.length === 0
                    ? "Your Amazon Basket is Empty"
                    : "Your Shopping Basket")}
              </h1>
              {newBasket.map((item, i) => (
                <CheckoutProduct
                  key={i} //This is generally not a great way of making a unique key. This can be like a worst case scenario.
                  id={item.id}
                  title={item.title}
                  price={item.price}
                  description={item.description}
                  category={item.category}
                  image={item.image}
                  rating={item.rating}
                  hasPrime={item.hasPrime}
                />
              ))}
            </div>
          </div>

          {/* Right */}

          <div className="flex flex-col bg-white p-10 shadow-md lg:sticky lg:top-20 lg:h-[calc(100vh-8rem)]">
            {items.length > 0 && (
              <>
                <h2 className="whitespace-nowrap">
                  Subtotal ({items.length} items): ${""}
                  <span className="font-bold">
                    <FormattedNumber
                      value={items.reduce(
                        (total, item) => total + item.price,
                        0
                      )}
                    />
                    {/* Note the expression inside the quantity prop. The in-built 'reduce' method is an ES-6 method.
                     It is used to iterate through the 'items' (a list of basket items). The first parameter 'total'
                     starts from 0. Then, the total keeps adding up by the item's price. */}
                  </span>
                </h2>
                <button
                  className="p-2 text-xs md:text-sm bg-gradient-to-b from-yellow-200 to-yellow-400 border-yellow-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:outline-none  active:from-yellow-500"
                  role="link"
                  onClick={!session.data ? signIn : createCheckoutSession}>
                  {!session.data
                    ? "Sign In to Checkout"
                    : "Proceed to Checkout"}
                </button>
              </>
            )}
          </div>
        </main>
      </div>
    </IntlProvider>
  );
}

export default Checkout;
