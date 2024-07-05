"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Headers from "@/app/components/Headers";
import Cookies from "js-cookie";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import Swal from "sweetalert2";
import { loadStripe } from "@stripe/stripe-js";
import Image from "next/image";
import { log } from "console";
interface OrderItem {
  productid: string;
  _id: string;
  item: string;
  user: string;
  image: string;
  price: number;
  quantity: number;
}

interface total {
  _id: string | null;
  total_all_prices: number;
}
export default function Page() {
  const router = useRouter();
  const [data, setData] = useState<OrderItem[]>([]);
  const [total, setTotal] = useState<total[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [next, setNext] = useState<string | null>(null);
  const [login, setLogin] = useState<string | null>(null);
  const [selectedOption, setSelectedOption] = useState<string>("");

  useEffect(() => {
    const name = Cookies.get("name");
    const log = Cookies.get("login");
    setLogin(log || null);

    const fetchData = async () => {
      try {
        axios
          .post("http://localhost:3000/api/order/getorder", {
            user: name,
          })
          .then((res) => {
            setData(res.data.order);
          })
          .catch(() => {
            console.log("error");
          });
      } catch {
      } finally {
        setLoading(false);
      }
    };

    const fetchTotal = async () => {
      try {
        const response = await axios.post(
          "http://localhost:3000/api/order/aggregate",
          {
            user: name,
          }
        );
        setTotal(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    setInterval(() => {
      fetchData();
      fetchTotal();
    }, 1000);
  }, []);

  const handleDeleteProduct = async (id: string) => {
    try {
      const res = await fetch("http://localhost:3000/api/order", {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          id: id,
        }),
      });

      if (res.ok) {
        toast.success("Successfully Deleted");
      }

      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  const handleIncrement = async (id: string) => {
    try {
      await axios.put(`http://localhost:3000/api/order/increment/${id}`, {
        quantity: 1,
      });
    } catch {
      console.log("error");
    }
  };

  const handleDecrement = async (id: string, count: number) => {
    if (count !== 1) {
      try {
        await axios.put(`http://localhost:3000/api/order/decrement/${id}`, {
          quantity: 1,
        });
      } catch {
        console.log("error");
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  };

  const handleMakePayment = async () => {
    const stripe = await loadStripe(
      "pk_test_51PVrHLEpyR2Qvynp3EDO4yIjoBpcXxlq7nRXEm2FLs0bVJC3ragJXXBmj3ANR2wmgeVVA5S45CA64pLx6Bf2cPBr00kU8HUGpQ"
    );

    axios
      .post("http://localhost:3000/api/create-checkout-session", {
        product: data,
      })
      .then((res) => {
        stripe?.redirectToCheckout({ sessionId: res.data });
      });
  };

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
  };

  const handlePayment = () => {
    if (selectedOption == "option1") {
      handleMakePayment();
    } else if (selectedOption == "option2") {
      setNext("next");
    }
  };

  const handleCashOnDelivery = async () => {
    axios
      .post("http://localhost:3000/api/cashondelivery", {
        product: data,
        status: "to pay",
      })
      .then((res) => {
        console.log(res.data);
        router.push("/pages/receive");
      });
  };

  return (
    <div className="w-full">
      <div>
        <Toaster position="top-center" reverseOrder={true} />
      </div>
      <div>
        <Headers />
      </div>

      {login == "true" ? (
        <div className="mt-20 px-20 w-full">
          <div className="bg-white py-8 shadow-md shadow-[#f4f4f4]  transition-transform duration-300  h-auto px-5">
            <div>
              <h1 className="text-[30px] font-bold mb-10">Cart</h1>
            </div>

            <div className="w-full flex gap-5">
              <div className="w-[70%]  border-[1px] border-[#d8d8d8] ">
                <div className="w-full items-center flex justify-center gap-10 py-5 bg-[#fcfcfc] ">
                  <div className="w-[20%]">
                    <h1 className="text-center text-[#6a6a6a] font-bold">
                      Image
                    </h1>
                  </div>

                  <div className="w-[20%]">
                    {" "}
                    <h1 className="text-[#6a6a6a] font-bold">Product</h1>
                  </div>

                  <div className="w-[20%]">
                    {" "}
                    <h1 className="text-[#6a6a6a] font-bold">Price</h1>
                  </div>

                  <div className="w-[20%]">
                    <h1 className="text-[#6a6a6a] font-bold">Quantity</h1>
                  </div>
                  <div className="w-[20%]">
                    <h1 className="text-[#6a6a6a] font-bold">Subtotal</h1>
                  </div>
                </div>
                <div className=" border-b-[2px] border-[#d8d8d8]  "></div>
                <div>
                  {loading ? (
                    <div className="w-full flex items-center justify-center h-[50vh]">
                      {" "}
                      <div
                        className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                        role="status"
                      >
                        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                          Loading...
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="h-[45vh] overflow-y-scroll">
                      {data.map((item, index) => (
                        <div
                          className="w-full items-center flex justify-center gap-10 mt-10  border-b-[1px] border-[#d8d8d8]"
                          key={index}
                        >
                          <div className="flex items-center justify-center gap-3 w-[20%]">
                            <div
                              onClick={() => handleDeleteProduct(item._id)}
                              className="bg-[#d8d8d8] px-2 py-2  rounded-full	cursor-pointer"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="1em"
                                height="1em"
                                viewBox="0 0 24 24"
                                className="text-black font-2xl"
                              >
                                <path
                                  fill="currentColor"
                                  d="m6.4 18.308l-.708-.708l5.6-5.6l-5.6-5.6l.708-.708l5.6 5.6l5.6-5.6l.708.708l-5.6 5.6l5.6 5.6l-.708.708l-5.6-5.6z"
                                />
                              </svg>
                            </div>
                            <Link href={`/pages/product/${item.productid}`}>
                              {" "}
                              <div>
                                {/* <img
                               src={item.image}
                            
                             /> */}
                                <Image
                                  src={item.image}
                                  alt="my-image"
                                  width={100}
                                  height={100}
                                />
                              </div>
                            </Link>
                          </div>
                          <div className=" w-[20%]">
                            <h1 className="font-semi-bold">{item.item}</h1>
                          </div>

                          <div className=" w-[20%]">
                            <p className="text-[#6a6a6a] text-base ">
                              PHP {item.price}
                            </p>
                          </div>

                          <div className=" w-[20%]">
                            <div className="flex items-center justify-center">
                              <div
                                className="border border-[#dadada] px-4 py-2 cursor-pointer"
                                onClick={() =>
                                  handleDecrement(item._id, item.quantity)
                                }
                              >
                                <p>-</p>
                              </div>
                              <div className="border border-black py-2 cursor-pointer px-4 items-center">
                                <p>{item.quantity}</p>
                              </div>
                              <div
                                className="border border-[#dadada] px-4 py-2 cursor-pointer"
                                onClick={() => handleIncrement(item._id)}
                              >
                                <p>+</p>
                              </div>
                            </div>
                          </div>

                          <div className=" w-[20%]">
                            <p className="text-[#6a6a6a] text-base ">
                              PHP {item.price * item.quantity}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div className="w-[30%] ">
                <div className="border-[1px] border-[#d8d8d8] bg-[#f4f4f4] ">
                  {next == "next" ? (
                    <div className="px-3">
                      <div className=" py-[17px] px-3 flex items-center justify-between">
                        <div>
                          <h1 className="text-xl font-bold ">
                            Shipping Details
                          </h1>
                          <p className="text-base mt-2">
                            Fill the details for your information
                          </p>
                        </div>
                        <div onClick={() => setNext(null)}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="1em"
                            height="1em"
                            viewBox="0 0 32 32"
                            className="text-4xl text-[#e74523]"
                          >
                            <path
                              fill="currentColor"
                              d="M16 2C8.2 2 2 8.2 2 16s6.2 14 14 14s14-6.2 14-14S23.8 2 16 2m5.4 21L16 17.6L10.6 23L9 21.4l5.4-5.4L9 10.6L10.6 9l5.4 5.4L21.4 9l1.6 1.6l-5.4 5.4l5.4 5.4z"
                            />
                          </svg>
                        </div>
                      </div>

                      <div className="mt-10 px-3">
                        <div className="flex items-center justify-between gap-5">
                          <div>
                            <input
                              type="text"
                              className="w-full  focus:outline-none border-b-2 text-lg px-3 py-2 "
                              placeholder="number"
                            />
                          </div>
                          <div>
                            <input
                              type="text"
                              className="w-full  focus:outline-none border-b-2 text-lg px-3 py-2"
                              placeholder="Province"
                            />
                          </div>
                        </div>

                        <div className="flex items-center justify-between gap-5 mt-2">
                          <div>
                            <input
                              type="text"
                              className="w-full focus:outline-none border-b-2 text-lg px-3 py-2"
                              placeholder="City"
                            />
                          </div>
                          <div>
                            <input
                              type="text"
                              className="w-full  focus:outline-none border-b-2 text-lg px-3 py-2"
                              placeholder="Brgy"
                            />
                          </div>
                        </div>

                        <div className="flex items-center justify-between gap-5 mt-2">
                          <div>
                            <input
                              type="text"
                              className="w-full  focus:outline-none border-b-2 text-lg px-3 py-2 "
                              placeholder="Street"
                            />
                          </div>
                          <div>
                            <input
                              type="text"
                              className="w-full focus:outline-none border-b-2 text-lg px-3 py-2"
                              placeholder="Landmark"
                            />
                          </div>
                        </div>
                      </div>

                      <div>
                        <div
                          className="mt-5 text-center py-5"
                          onClick={handleCashOnDelivery}
                        >
                          <button className="text-xl bg-[#EDB932] py-5 w-full  hover:text-white">
                            Purchase
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div>
                      {" "}
                      <div className="py-[17px] px-3">
                        <h1 className="text-xl font-bold ">Cart</h1>
                      </div>
                      <div className=" border-b-[2px] border-[#d8d8d8]  "></div>
                      <div className="px-3 mt-5 w-full">
                        <div>
                          <div className="w-full border border-[#e74523]  mt-2  rounded-lg ">
                            <div
                              className={`flex items-center justify-between group  text-black p-2 rounded-t-lg whiteLogo bg-fadeO  ${
                                selectedOption == "option1"
                                  ? `bg-[#e74523] text-white`
                                  : "bg-none text-black"
                              }`}
                            >
                              <div>
                                <p>Credit/Debit Card</p>
                              </div>
                              <div>
                                <input
                                  type="radio"
                                  name="ONLINEPAYMET"
                                  className="w-[20px] h-[20px] rounded-full border-2 border-black"
                                  value="option1"
                                  checked={selectedOption === "option1"}
                                  onChange={handleOptionChange}
                                />
                              </div>
                            </div>

                            <div className="flex items-center gap-4 mt-2 px-2">
                              <div className="text-4xl text-sign">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="1em"
                                  height="1em"
                                  viewBox="0 0 512 512"
                                  className="text-[#e74523] text-4xl"
                                >
                                  <path
                                    fill="currentColor"
                                    d="M32 376a56 56 0 0 0 56 56h336a56 56 0 0 0 56-56V222H32Zm66-76a30 30 0 0 1 30-30h48a30 30 0 0 1 30 30v20a30 30 0 0 1-30 30h-48a30 30 0 0 1-30-30ZM424 80H88a56 56 0 0 0-56 56v26h448v-26a56 56 0 0 0-56-56"
                                  />
                                </svg>
                              </div>
                            </div>
                          </div>
                          <div className="w-full border border-[#e74523]  mt-2  rounded-lg ">
                            <div
                              className={`flex items-center justify-between group  text-black p-2 rounded-t-lg whiteLogo bg-fadeO  ${
                                selectedOption == "option2"
                                  ? `bg-[#e74523] text-white`
                                  : "bg-none text-black"
                              }`}
                            >
                              <div>
                                <p>Cash On Delivery</p>
                              </div>
                              <div>
                                <input
                                  type="radio"
                                  name="CASHONDELIVERY"
                                  className="w-[20px] h-[20px] rounded-full border-2 border-black"
                                  value="option2"
                                  checked={selectedOption === "option2"}
                                  onChange={handleOptionChange}
                                />
                              </div>
                            </div>

                            <div className="flex items-center gap-4 mt-2 px-2">
                              <div className="text-4xl text-sign">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="1.25em"
                                  height="1em"
                                  viewBox="0 0 640 512"
                                  className="text-[#e74523] text-4xl"
                                >
                                  <path
                                    fill="currentColor"
                                    d="M280 32c-13.3 0-24 10.7-24 24s10.7 24 24 24h57.7l16.4 30.3L256 192l-45.3-45.3c-12-12-28.3-18.7-45.3-18.7H64c-17.7 0-32 14.3-32 32v32h96c88.4 0 160 71.6 160 160c0 11-1.1 21.7-3.2 32h70.4c-2.1-10.3-3.2-21-3.2-32c0-52.2 25-98.6 63.7-127.8l15.4 28.6C402.4 276.3 384 312 384 352c0 70.7 57.3 128 128 128s128-57.3 128-128s-57.3-128-128-128c-13.5 0-26.5 2.1-38.7 6l-55.1-102H480c17.7 0 32-14.3 32-32V64c0-17.7-14.3-32-32-32h-20.4c-7.5 0-14.7 2.6-20.5 7.4l-47.4 39.5l-14-26c-7-12.9-20.5-21-35.2-21H280zm182.7 279.2l28.2 52.2c6.3 11.7 20.9 16 32.5 9.7s16-20.9 9.7-32.5l-28.2-52.2c2.3-.3 4.7-.4 7.1-.4c35.3 0 64 28.7 64 64s-28.7 64-64 64s-64-28.7-64-64c0-15.5 5.5-29.7 14.7-40.8M187.3 376c-9.5 23.5-32.5 40-59.3 40c-35.3 0-64-28.7-64-64s28.7-64 64-64c26.9 0 49.9 16.5 59.3 40h66.4c-11.2-59.2-63.2-104-125.7-104C57.3 224 0 281.3 0 352s57.3 128 128 128c62.5 0 114.5-44.8 125.8-104zm-59.3 8a32 32 0 1 0 0-64a32 32 0 1 0 0 64"
                                  />
                                </svg>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-10  w-full mt-10">
                          <div className="w-[30%]">
                            <h1 className="text-[#6a6a6a] text-base font-bold ">
                              Subtotal
                            </h1>
                          </div>
                          <div>
                            {total.length == 0 ? (
                              <div>
                                <p className="text-[#6a6a6a] text-base font-semibold">
                                  PHP 0
                                </p>
                              </div>
                            ) : (
                              <div>
                                {total.map((item, index) => (
                                  <div key={index}>
                                    <p className="text-[#6a6a6a] text-base font-semibold">
                                      PHP {item.total_all_prices}
                                    </p>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className=" border-b-[2px] border-[#d8d8d8] mt-2  "></div>
                        <div className="flex gap-10 mt-4  w-full">
                          <div className="w-[30%]">
                            <h1 className="text-[#6a6a6a] text-base font-bold ">
                              Total
                            </h1>
                          </div>
                          <div>
                            {total.length == 0 ? (
                              <div>
                                <p className="text-[#6a6a6a] text-base font-semibold">
                                  PHP 0
                                </p>
                              </div>
                            ) : (
                              <div>
                                {total.map((item, index) => (
                                  <div key={index}>
                                    <p className="text-[#6a6a6a] text-base font-semibold">
                                      PHP {item.total_all_prices}
                                    </p>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className=" border-b-[2px] border-[#d8d8d8] mt-4  "></div>

                        <div
                          className="mt-5 text-center py-5"
                          onClick={handlePayment}
                        >
                          <button className="text-xl bg-[#EDB932] py-5 w-full  hover:text-white">
                            Place Order Now
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
