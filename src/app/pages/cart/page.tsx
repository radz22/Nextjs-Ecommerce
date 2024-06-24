"use client";
import React, { useEffect, useState } from "react";
import Headers from "@/app/components/Headers";
import Cookies from "js-cookie";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";

interface OrderItem {
  productid: string;
  _id: string;
  item: string;
  user: string;
  image: string;
  price: number;
  quantity: number;
}
export default function page() {
  const [data, setData] = useState<OrderItem[]>([]);

  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const name = Cookies.get("name");

    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/order/getorder", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            user: name,
          }),
        });

        const result: OrderItem[] = await res.json();
        setData(result);
      } catch (error: any) {
        throw new Error(error.message);
      } finally {
        setLoading(false);
      }
    };
    const intervalId = setInterval(fetchData, 1000); // Fetch every 1 second
    return () => clearInterval(intervalId);
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
  return (
    <div className="w-full">
      <div>
        <Toaster position="top-center" reverseOrder={true} />
      </div>
      <div>
        <Headers />
      </div>

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
                    {data.map((item) => (
                      <div className="w-full items-center flex justify-center gap-10 mt-10  border-b-[1px] border-[#d8d8d8]">
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
                              <img
                                src={item.image}
                                className="w-[70px] h-[70px] rounded-full	"
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
                            <div className="border border-[#dadada] px-4 py-2 cursor-pointer">
                              <p>-</p>
                            </div>
                            <div className="border border-black py-2 cursor-pointer px-4 items-center">
                              <p>{item.quantity}</p>
                            </div>
                            <div className="border border-[#dadada] px-4 py-2 cursor-pointer">
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
              <div className="border-[1px] border-[#d8d8d8] ">
                <div className="bg-[#fcfcfc] py-[17px] px-3">
                  <h1 className="text-xl font-bold ">Cart</h1>
                </div>
                <div className=" border-b-[2px] border-[#d8d8d8]  "></div>

                <div className="px-3 mt-5 w-full">
                  <div className="flex gap-10  w-full">
                    <div className="w-[30%]">
                      <h1 className="text-[#6a6a6a] text-base font-bold ">
                        Subtotal
                      </h1>
                    </div>
                    <div>
                      <p className="text-[#6a6a6a] text-base font-semibold">
                        $1,348.50
                      </p>
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
                      <p className="text-[#6a6a6a] text-base font-semibold">
                        $1,348.50
                      </p>
                    </div>
                  </div>
                  <div className=" border-b-[2px] border-[#d8d8d8] mt-2  "></div>

                  <div className="mt-5 text-center py-5">
                    <button className="text-xl bg-[#EDB932] py-5 w-full  hover:text-white">
                      CHECK OUT
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
