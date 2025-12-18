import React from "react";
import moment from "moment";
// import Currency from "react-currency-formatter-v2";
import { useSelector } from "react-redux";
import { selectItems } from "../redux/slices/basketSlice";
import { IntlProvider, FormattedNumber } from "react-intl";

export default function Order({
  id,
  amount,
  amount_shipping,
  images,
  timestamp,
  items,
}) {
  const basket = useSelector(selectItems);

  return (
    <IntlProvider locale="en">
      <div className="relative border rounded-md">
        <div className="flex items-center space-x-10 p-5 bg-gray-100 text-sm text-gray-600">
          <div>
            <p className="font-bold text-xs">ORDER PLACED</p>
            <p>{moment.unix(timestamp).format("DD MMM YYYY")}</p>
          </div>
          <div>
            <p className="font-bold text-xs">TOTAL</p>
            <p>
              <FormattedNumber value={amount} currency="USD" /> - Next Day
              Delivery{" "}
              <FormattedNumber value={amount_shipping} currency="USD" />
            </p>
          </div>
          <p className="text-sm whitespace-nowrap self-end flex-1 text-right sm:text-xl text-blue-500">
            {items.length} items
          </p>
          <p className="absolute top-2 right-2 w-40 lg:w-72 truncate text-xs whitespace-nowrap">
            ORDER # {id}
          </p>
        </div>
        <div className="p-5 sm:p-10">
          <div className="flex space-x-10 overflow-x-auto">
            {images.map((image, id) => (
              <img
                key={id} // Ensure each image has a unique key
                src={image}
                alt={`Order Image ${id + 1}`} // Provide alt text for accessibility
                className="h-20 object-contain sm:h-32"
              />
            ))}
          </div>
        </div>
      </div>
    </IntlProvider>
  );
}
