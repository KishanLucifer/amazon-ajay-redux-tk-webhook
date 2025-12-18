import React from "react";
import Image from "next/image";
import StarIcon from "@heroicons/react/solid/StarIcon";
// import Currency from "react-currency-formatter-v2";
import { useDispatch, useSelector } from "react-redux";
import {
  addToBasket,
  reduceQuantity,
  removeFromBasket,
  selectItems,
} from "../redux/slices/basketSlice";
import { IntlProvider, FormattedNumber } from "react-intl";
import Logo from "../../public/prime-logo.png";

function CheckoutProduct({
  id,
  title,
  price,
  description,
  category,
  image,
  hasPrime,
  rating,
}) {
  const dispatch = useDispatch();
  const items = useSelector(selectItems);
  const quantity = items.filter((item, ind) => item.id === id).length;
  const priceForProduct = price * quantity;
  function addItemToBasket() {
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
    dispatch(addToBasket(product));
  }
  const removeItemFromBasket = () => {
    dispatch(removeFromBasket({ id }));
  };

  const decreaseQuantity = () => {
    dispatch(reduceQuantity({ id }));
  };
  return (
    <div className="grid grid-cols-5">
      <IntlProvider locale="en">
        <div className="relative w-54 h-54">
          <Image
            src={image}
            fill
            style={{ objectFit: "contain" }}
            priority={true}
            alt="image"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // Adjust sizes for different screen widths
          />
        </div>
        {/* Middle Section */}
        <div className="col-span-3 mx-5">
          <p>{title}</p>
          <div className="flex">
            {Array(rating)
              .fill(1)
              .map((val, ind) => (
                <StarIcon key={ind} className="h-5 text-yellow-500" />
              ))}
          </div>
          <p className="text-xs mt-2 line-clamp-3">{description}</p>
          {/* Note line-clamp-3 means only the first 3 lines of the description will be used. */}
          <div className="flex flex-col">
            <div className="flex space-x-2">
              {/* <Currency quantity={price} className="space-x-2" /> */}
              <FormattedNumber
                value={price}
                style="currency"
                currency="USD"
                className="space-x-2"
              />
              <p className="space-x-2">x</p>

              <p>{quantity}</p>
              <p>=</p>
              {/* <Currency quantity={priceForProduct} /> */}
              <FormattedNumber value={priceForProduct} />
            </div>
            {hasPrime && (
              <div className="flex items-center mt-2">
                <Image
                  loading="lazy"
                  className=" mx-3 w-12 h-6"
                  src={Logo}
                  alt=""
                  style={{
                    objectFit: "contain",
                  }}
                />
                <p className="text-xs text-gray-500">FREE Next Day Delivery</p>
              </div>
            )}
          </div>
        </div>

        {/* Right side add and remove buttons */}
        <div className="flex flex-col space-y-2 mt-auto justify-self-end">
          <div className="flex items-center space-x-3">
            <button className="button" onClick={decreaseQuantity}>
              -
            </button>{" "}
            <span>
              Quantity: {items.filter((item, ind) => item.id === id).length}
            </span>{" "}
            <button className="button" onClick={addItemToBasket}>
              +
            </button>
          </div>
          <button className="button" onClick={removeItemFromBasket}>
            Remove from Basket
          </button>
        </div>
      </IntlProvider>
    </div>
  );
}

export default CheckoutProduct;
