"use client";

import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Headers from "@/app/components/Headers";
import Image from "next/image";
import Cookies from "js-cookie";
import Link from "next/link";
import Swal from "sweetalert2";

interface receive {
  item: string;
  user: string;
  image: string;
  price: number;
  quantity: number;
  status: string;
  productid: string;
}

export default function page() {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [next, setNext] = useState<string>("topay");
  const [data, setData] = useState<receive[] | null>(null);
  useEffect(() => {
    // Get the value of the cookie named 'myCookie'
    const name = Cookies.get("name");
    const img = Cookies.get("image");

    setName(name || "");
    setImage(img || "");
    const fetchData = () => {
      try {
        axios
          .post("http://localhost:3000/api/cashondelivery/get", {
            user: name,
          })
          .then((res) => {
            setData(res.data);
          });
      } catch {
        console.log("error");
      }
    };
    fetchData();
  }, []);

  const handleOrder = async (
    productid: string,
    item: string,
    image: string,
    price: number
  ) => {
    try {
      axios
        .post(`http://localhost:3000/api/order`, {
          productid: productid,
          item: item,
          user: name,
          image: image,
          price: price,
          quantity: 1,
        })
        .then(() => {
          Swal.fire({
            title: "Sucess Order",
            width: 600,
            padding: "3em",
            color: "#716add",
            background: "#fff url(/images/trees.png)",
            backdrop: `
            rgba(0,0,123,0.4)
            url("https://media.tenor.com/xzjlrhYq_lQAAAAj/cat-nyan-cat.gif")
            left top
            no-repeat
          `,
          });
        });
    } catch (error) {
      console.log(error);
    }
  };

  const counToPay = data?.filter((item) => item.status === "to pay") || [];
  const counToShip = data?.filter((item) => item.status === "to ship") || [];
  const counToReceive =
    data?.filter((item) => item.status === "to receive") || [];

  const completedItems =
    data?.filter((item) => item.status === "completed") || [];

  return (
    <div className="w-full h-screen bg-[#f3f3f3]">
      <div>
        <Headers />
      </div>
      <div className="px-20 py-5 mt-10  w-full">
        <div className="flex  gap-5 w-full">
          <div className="w-[25%]    ">
            <div className="flex items-center gap-5">
              <div>
                <Image
                  src={image}
                  alt="my-image"
                  width={1000} // Add the appropriate width here
                  height={1000}
                  className="w-[70px] h-[60px] rounded-full	 "
                />
              </div>
              <div>
                <h1 className="text-base font-semibold">{name}</h1>
              </div>
            </div>
          </div>
          <div className="w-[75%]">
            <div className="flex items-center   justify-center gap-5 w-full bg-[#fff] py-5 px-5 shadow-lg shadow-[#dadada] h-[65px]">
              <div className="w-[25%]">
                <h1
                  className="text-lg cursor-pointer text-center"
                  onClick={() => setNext("topay")}
                >
                  To Pay ({counToPay?.length})
                </h1>
                <div
                  className={`${
                    next == "topay"
                      ? "border-b-[2px] border-[#ee4d2d] px-5"
                      : ""
                  }`}
                ></div>
              </div>

              <div className="w-[25%]">
                <h1
                  className="text-lg cursor-pointer text-center"
                  onClick={() => setNext("toship")}
                >
                  To Ship ({counToShip?.length})
                </h1>
                <div
                  className={`${
                    next == "toship"
                      ? "border-b-[2px] border-[#ee4d2d] px-5"
                      : ""
                  }`}
                ></div>
              </div>

              <div className="w-[25%]">
                <h1
                  className="text-lg cursor-pointer text-center"
                  onClick={() => setNext("toreceive")}
                >
                  To Receive ({counToReceive?.length})
                </h1>
                <div
                  className={`${
                    next == "toreceive"
                      ? "border-b-[2px] border-[#ee4d2d] px-5"
                      : ""
                  }`}
                ></div>
              </div>
              <div className="w-[25%]">
                <h1
                  className="text-lg cursor-pointer text-center"
                  onClick={() => setNext("completed")}
                >
                  Completed ({completedItems?.length})
                </h1>
                <div
                  className={`${
                    next == "completed"
                      ? "border-b-[2px] border-[#ee4d2d] "
                      : ""
                  }`}
                ></div>
              </div>
            </div>

            <div className="w-full bg-[#fff] py-5 px-5  mt-10 h-[70vh] overflow-y-scroll ">
              <div className="w-full">
                {data?.map((item) => (
                  <div>
                    <div>
                      {next == "topay" ? (
                        <div>
                          {item.status == "to pay" ? (
                            <div className="w-full flex items-center gap-3 mt-5">
                              <div className="border-[2px] py-2 px-2 border-[#cccccc] w-[20%]">
                                <Link href={`/pages/product/${item.productid}`}>
                                  <Image
                                    src={item.image}
                                    alt="my-image"
                                    width={1000} // Add the appropriate width here
                                    height={1000}
                                    className=" h-[100px]	"
                                  />
                                </Link>
                              </div>

                              <div className="flex items-center justify-between w-[80%]">
                                <div>
                                  <div>
                                    <h1 className="text-base">{item.item}</h1>
                                  </div>

                                  <div>
                                    <p className="text-sm mt-2">
                                      x{item.quantity}
                                    </p>
                                  </div>
                                </div>
                                <div className="flex items-center justify-center gap-2">
                                  <div>
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="1em"
                                      height="1em"
                                      viewBox="0 0 20 20"
                                      className="text-2xl text-[#ee4d2d]"
                                    >
                                      <g
                                        fill="currentColor"
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                      >
                                        <g opacity="0.2">
                                          <path d="M11.5 4h-5V2h5a5 5 0 0 1 5 5v1a5 5 0 0 1-5 5h-5v-2h5a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3" />
                                          <path d="M6.5 2a1 1 0 0 1 1 1v15.5a1 1 0 1 1-2 0V3a1 1 0 0 1 1-1" />
                                          <path d="M2.5 5.936a1 1 0 0 1 1-1h14a1 1 0 1 1 0 2h-14a1 1 0 0 1-1-1m0 3a1 1 0 0 1 1-1h14a1 1 0 1 1 0 2h-14a1 1 0 0 1-1-1" />
                                        </g>
                                        <path d="M10.5 2.5h-5v-1h5A4.5 4.5 0 0 1 15 6v1a4.5 4.5 0 0 1-4.5 4.5h-5v-1h5A3.5 3.5 0 0 0 14 7V6a3.5 3.5 0 0 0-3.5-3.5" />
                                        <path d="M5.5 1.5A.5.5 0 0 1 6 2v15.5a.5.5 0 0 1-1 0V2a.5.5 0 0 1 .5-.5" />
                                        <path d="M2 4.936a.5.5 0 0 1 .5-.5h14a.5.5 0 0 1 0 1h-14a.5.5 0 0 1-.5-.5m0 3a.5.5 0 0 1 .5-.5h14a.5.5 0 0 1 0 1h-14a.5.5 0 0 1-.5-.5" />
                                      </g>
                                    </svg>
                                  </div>
                                  <div>
                                    <p className="text-[#ee4d2d] text-sm">
                                      {item.price}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                      ) : (
                        ""
                      )}
                    </div>

                    <div>
                      {next == "toship" ? (
                        <div>
                          {item.status == "to ship" ? (
                            <div className="w-full flex items-center gap-3 mt-5">
                              <div className="border-[2px] py-2 px-2 border-[#cccccc] w-[20%]">
                                <Image
                                  src={item.image}
                                  alt="my-image"
                                  width={1000} // Add the appropriate width here
                                  height={1000}
                                  className=" h-[100px]	"
                                />
                              </div>
                              <div className="flex items-center justify-between w-[80%]">
                                <div>
                                  <div>
                                    <h1 className="text-base">{item.item}</h1>
                                  </div>

                                  <div>
                                    <p className="text-sm mt-2">
                                      x{item.quantity}
                                    </p>
                                  </div>
                                </div>
                                <div className="flex items-center justify-center gap-2">
                                  <div>
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="1em"
                                      height="1em"
                                      viewBox="0 0 20 20"
                                      className="text-2xl text-[#ee4d2d]"
                                    >
                                      <g
                                        fill="currentColor"
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                      >
                                        <g opacity="0.2">
                                          <path d="M11.5 4h-5V2h5a5 5 0 0 1 5 5v1a5 5 0 0 1-5 5h-5v-2h5a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3" />
                                          <path d="M6.5 2a1 1 0 0 1 1 1v15.5a1 1 0 1 1-2 0V3a1 1 0 0 1 1-1" />
                                          <path d="M2.5 5.936a1 1 0 0 1 1-1h14a1 1 0 1 1 0 2h-14a1 1 0 0 1-1-1m0 3a1 1 0 0 1 1-1h14a1 1 0 1 1 0 2h-14a1 1 0 0 1-1-1" />
                                        </g>
                                        <path d="M10.5 2.5h-5v-1h5A4.5 4.5 0 0 1 15 6v1a4.5 4.5 0 0 1-4.5 4.5h-5v-1h5A3.5 3.5 0 0 0 14 7V6a3.5 3.5 0 0 0-3.5-3.5" />
                                        <path d="M5.5 1.5A.5.5 0 0 1 6 2v15.5a.5.5 0 0 1-1 0V2a.5.5 0 0 1 .5-.5" />
                                        <path d="M2 4.936a.5.5 0 0 1 .5-.5h14a.5.5 0 0 1 0 1h-14a.5.5 0 0 1-.5-.5m0 3a.5.5 0 0 1 .5-.5h14a.5.5 0 0 1 0 1h-14a.5.5 0 0 1-.5-.5" />
                                      </g>
                                    </svg>
                                  </div>
                                  <div>
                                    <p className="text-[#ee4d2d] text-sm">
                                      {item.price}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                      ) : (
                        ""
                      )}
                    </div>

                    <div>
                      {next == "toreceive" ? (
                        <div>
                          {item.status == "to receive" ? (
                            <div className="w-full flex items-center gap-3 mt-5">
                              <div className="border-[2px] py-2 px-2 border-[#cccccc] w-[20%]">
                                <Image
                                  src={item.image}
                                  alt="my-image"
                                  width={1000} // Add the appropriate width here
                                  height={1000}
                                  className=" h-[100px]	"
                                />
                              </div>
                              <div className="flex items-center justify-between w-[80%]">
                                <div>
                                  <div>
                                    <h1 className="text-base">{item.item}</h1>
                                  </div>

                                  <div>
                                    <p className="text-sm mt-2">
                                      x{item.quantity}
                                    </p>
                                  </div>
                                </div>
                                <div className="flex items-center justify-center gap-2">
                                  <div>
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="1em"
                                      height="1em"
                                      viewBox="0 0 20 20"
                                      className="text-2xl text-[#ee4d2d]"
                                    >
                                      <g
                                        fill="currentColor"
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                      >
                                        <g opacity="0.2">
                                          <path d="M11.5 4h-5V2h5a5 5 0 0 1 5 5v1a5 5 0 0 1-5 5h-5v-2h5a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3" />
                                          <path d="M6.5 2a1 1 0 0 1 1 1v15.5a1 1 0 1 1-2 0V3a1 1 0 0 1 1-1" />
                                          <path d="M2.5 5.936a1 1 0 0 1 1-1h14a1 1 0 1 1 0 2h-14a1 1 0 0 1-1-1m0 3a1 1 0 0 1 1-1h14a1 1 0 1 1 0 2h-14a1 1 0 0 1-1-1" />
                                        </g>
                                        <path d="M10.5 2.5h-5v-1h5A4.5 4.5 0 0 1 15 6v1a4.5 4.5 0 0 1-4.5 4.5h-5v-1h5A3.5 3.5 0 0 0 14 7V6a3.5 3.5 0 0 0-3.5-3.5" />
                                        <path d="M5.5 1.5A.5.5 0 0 1 6 2v15.5a.5.5 0 0 1-1 0V2a.5.5 0 0 1 .5-.5" />
                                        <path d="M2 4.936a.5.5 0 0 1 .5-.5h14a.5.5 0 0 1 0 1h-14a.5.5 0 0 1-.5-.5m0 3a.5.5 0 0 1 .5-.5h14a.5.5 0 0 1 0 1h-14a.5.5 0 0 1-.5-.5" />
                                      </g>
                                    </svg>
                                  </div>
                                  <div>
                                    <p className="text-[#ee4d2d] text-sm">
                                      {item.price}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                      ) : (
                        ""
                      )}
                    </div>

                    <div>
                      {next == "completed" ? (
                        <div>
                          {item.status == "completed" ? (
                            <div className="w-full flex items-center gap-3 mt-5">
                              <div className="border-[2px] py-2 px-2 border-[#cccccc] w-[20%]">
                                <Image
                                  src={item.image}
                                  alt="my-image"
                                  width={1000} // Add the appropriate width here
                                  height={1000}
                                  className=" h-[100px]	"
                                />
                              </div>
                              <div className="flex items-center justify-between w-[80%]">
                                <div>
                                  <div>
                                    <h1 className="text-base">{item.item}</h1>
                                  </div>

                                  <div>
                                    <p className="text-sm mt-2">
                                      x{item.quantity}
                                    </p>
                                  </div>
                                </div>
                                <div>
                                  <div className="flex items-center justify-center gap-2">
                                    <div>
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="1em"
                                        height="1em"
                                        viewBox="0 0 20 20"
                                        className="text-2xl text-[#ee4d2d]"
                                      >
                                        <g
                                          fill="currentColor"
                                          fill-rule="evenodd"
                                          clip-rule="evenodd"
                                        >
                                          <g opacity="0.2">
                                            <path d="M11.5 4h-5V2h5a5 5 0 0 1 5 5v1a5 5 0 0 1-5 5h-5v-2h5a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3" />
                                            <path d="M6.5 2a1 1 0 0 1 1 1v15.5a1 1 0 1 1-2 0V3a1 1 0 0 1 1-1" />
                                            <path d="M2.5 5.936a1 1 0 0 1 1-1h14a1 1 0 1 1 0 2h-14a1 1 0 0 1-1-1m0 3a1 1 0 0 1 1-1h14a1 1 0 1 1 0 2h-14a1 1 0 0 1-1-1" />
                                          </g>
                                          <path d="M10.5 2.5h-5v-1h5A4.5 4.5 0 0 1 15 6v1a4.5 4.5 0 0 1-4.5 4.5h-5v-1h5A3.5 3.5 0 0 0 14 7V6a3.5 3.5 0 0 0-3.5-3.5" />
                                          <path d="M5.5 1.5A.5.5 0 0 1 6 2v15.5a.5.5 0 0 1-1 0V2a.5.5 0 0 1 .5-.5" />
                                          <path d="M2 4.936a.5.5 0 0 1 .5-.5h14a.5.5 0 0 1 0 1h-14a.5.5 0 0 1-.5-.5m0 3a.5.5 0 0 1 .5-.5h14a.5.5 0 0 1 0 1h-14a.5.5 0 0 1-.5-.5" />
                                        </g>
                                      </svg>
                                    </div>
                                    <div>
                                      <p className="text-[#ee4d2d] text-sm">
                                        {item.price}
                                      </p>
                                    </div>
                                  </div>
                                  <div
                                    onClick={() =>
                                      handleOrder(
                                        item.productid,
                                        item.item,
                                        item.image,
                                        item.price
                                      )
                                    }
                                  >
                                    <button className="text-[12px] bg-[#EDB932] py-3 px-10 font-semibold hover:text-white mt-5">
                                      Buy Again
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
