import Header from "../components/Header";
import { CheckCircleIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useDispatch } from "react-redux";
import { resetBasket } from "../slices/basketSlice";
import { useEffect } from "react";

export default function Success() {
  const router = useRouter();
  const session = useSession();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetBasket());
  }, [dispatch]);

  return (
    <div className=" bg-gray-100 h-screen">
      <Header />
      <main className={"max-w-screen-lg mx-auto"}>
        <div
          className={
            "flex flex-col mx-10 bg-white z-40 p-10 space-y-5 justify-center"
          }
        >
          <div className="flex space-x-5 justify-center">
            <CheckCircleIcon className={"text-green-500 h-10"} />
            <p className={"text-2xl text-black"}>Thankyou for your order</p>
          </div>
          <p className={"text-xs"}>
            Thankyou for ordering! We will send an email once we have shipped
            the order. If you would like to check the status of your order(s),
            please press the button below
          </p>
          <button
            className={"button w-full"}
            onClick={() => {
              router.push("/orders");
            }}
          >
            Go to my orders
          </button>
        </div>
      </main>
    </div>
  );
}
