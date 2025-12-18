// import Image from "next/image";
// import React, { useState } from "react";
// import StarIcon from "@heroicons/react/solid/StarIcon";
// import Currency from "react-currency-formatter-v2";
// import { useDispatch } from "react-redux";
// import { addToBasket } from "../slices/basketSlice";
// import { toggleDisplayToast } from "../slices/toastMessageSlice";

// const MAX_RATING = 5;
// const MIN_RATING = 1;

// function Product({ id, title, price, description, category, image }) {
//   const [rating, setRating] = useState(
//     Math.floor(Math.random() * (MAX_RATING - MIN_RATING + 1)) + MIN_RATING
//   );

//   const dispatch = useDispatch();

//   const handleAddToBasket = () => {
//     addItemToBasket();
//     dispatch(toggleDisplayToast("Product added to basket")); // Pass a message
//   };

//   const [hasPrime] = useState(Math.random() < 0.5);
//   //Note, we generally have the setRating mehtod as well. However, in our case we would create the setRating method ourselves.
//   const addItemToBasket = () => {
//     const product = {
//       id,
//       title,
//       price,
//       description,
//       category,
//       image,
//       hasPrime,
//       rating,
//     };
//     console.log(product);
//     // Sending the product as an action to the Redux store... the Basket slice.
//     dispatch(addToBasket(product));
//   };

//   return (
//     <div className="relative flex flex-col m-5 bg-white z-40 p-10">
//       <p className="absolute top-2 right-2 text-xs italic text-gray-400">
//         {category}
//       </p>
//       <Image
//         src={image}
//         height={200}
//         width={200}
//         style={{ objectFit: 'cover' }}
//         priority={true}
//       />
//       <h4 className="my-3">{title}</h4>
//       <div className="flex">
//         {Array(rating)
//           .fill(1)
//           .map((val, ind) => (
//             <StarIcon key={ind} className="h-5 text-yellow-500" />
//           ))}
//       </div>

//       {/* Over here, you create an array. Then, you fill the array with any static value.
//             Then, map the array with the value and index. Note that these two parameters have nothing to do with the actual logic.
//             The program will loop through the array and render the StarIcon as many times as the length of the array. */}

//       <p className="text-xs my-2 line-clamp-2">{description}</p>
//       <div className="mb-5">
//         <Currency quantity={price} />
//       </div>
//       {hasPrime && (
//         <div className=" flex items-center space-x-2 -mt-5">
//           <img
//             className="w-24"
//             src="https://images-eu.ssl-images-amazon.com/images/G/31/prime/deliveryPage/Check-prime-PC-223X121.png"
//             alt=""
//           />
//           <p className="text-xs text-gray-500">FREE Next Day Delivery</p>
//         </div>
//       )}
//       <button className="mt-auto button" onClick={handleAddToBasket}>
//         Add to Basket
//       </button>
//     </div>
//   );
// }

// export default Product;

import Image from "next/image";
import React, { useState, useEffect } from "react";
import StarIcon from "@heroicons/react/solid/StarIcon";
// import Currency from "react-currency-formatter-v2";
import { useDispatch } from "react-redux";
import { addToBasket } from "../redux/slices/basketSlice";
import { setToastMessage } from "../redux/slices/toastMessageSlice";
import { IntlProvider, FormattedNumber } from "react-intl";
import Logo from "../../public/prime-logo.png";

const MAX_RATING = 5;
const MIN_RATING = 1;

function Product({ id, title, price, description, category, image }) {
  const [rating, setRating] = useState(0);
  const [hasPrime, setHasPrime] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    // Set random values only on the client side
    setRating(
      Math.floor(Math.random() * (MAX_RATING - MIN_RATING + 1)) + MIN_RATING
    );
    setHasPrime(Math.random() < 0.5);
  }, []);

  const handleAddToBasket = () => {
    addItemToBasket();
    // dispatch(setToastMessage("Product added to basket")); // Pass a message
  };

  const addItemToBasket = () => {
    const product = {
      id,
      title,
      price,
      description,
      category,
      image,
      hasPrime,
      rating,
    };
    // console.log(product);
    // Sending the product as an action to the Redux store... the Basket slice.
    dispatch(addToBasket(product));
  };

  return (
    <IntlProvider locale="en">
      <div className="relative flex flex-col m-5 bg-white z-30 p-10">
        <p className="absolute top-2 right-2 text-xs italic text-gray-400">
          {category}
        </p>
        <div className="relative mx-auto md:mx-auto lg:mx-auto w-64 h-52">
          <Image
            src={image}
            alt={title}
            fill
            style={{ objectFit: "contain" }} // Use the style prop for objectFit
            priority={true} // Optional: Prioritize loading this image
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // Adjust sizes for different screen widths
          />
        </div>
        <h4 className="my-3 text-black">{title}</h4>
        <div className="flex">
          {Array(rating)
            .fill(1)
            .map((_, index) => (
              <StarIcon key={index} className="h-5 text-yellow-400" />
            ))}
        </div>
        <p className="text-xs my-2 line-clamp-2 text-black">{description}</p>
        <div className="mb-5 text-black">
          <FormattedNumber value={price} style="currency" currency="USD" />
        </div>
        {hasPrime && (
          <div className="flex items-center space-x-2 mb-2">
            <Image
              className="w-12 h-6"
              src={Logo}
              // fill
              style={{
                objectFit: "contain",
              }}
              alt="Prime Logo"
            />
            <p className="text-xs text-gray-500">FREE Next Day Delivery</p>
          </div>
        )}
        <button
          className="mt-auto button text-black"
          onClick={handleAddToBasket}>
          Add to Cart
        </button>
      </div>
    </IntlProvider>
  );
}

export default Product;
