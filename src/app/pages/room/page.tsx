"use client";
import React, { useState, useEffect } from "react";
import Headers from "@/app/components/Headers";
import Link from "next/link";
import Footer from "@/app/components/Footer";
import Image from "next/image";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import axios from "axios";

import {
  TEDropdown,
  TEDropdownToggle,
  TEDropdownMenu,
  TEDropdownItem,
  TERipple,
  TEModal,
  TEModalDialog,
  TEModalContent,
  TEModalHeader,
  TEModalBody,
  TEModalFooter,
} from "tw-elements-react";
interface ProductItem {
  _id: string;
  name: string;
  image: string;
  category: string;
  price: number;
}

export default function Page() {
  const [hoveredItemId, setHoveredItemId] = useState<string | null>(null);
  const [data, setData] = useState<ProductItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [login, setLogin] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null);
  const [showModalLg, setShowModalLg] = useState(false);
  const [dataItem, setDataItem] = useState<ProductItem | any>();
  const [dataLoading, setDataLoading] = useState<boolean>(true);
  useEffect(() => {
    const log = Cookies.get("login");
    const name = Cookies.get("name");
    setLogin(log || null);
    setName(name || null);

    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/product");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result: ProductItem[] = await response.json();
        setData(result);
      } catch (error: any) {
        throw new Error(error.message);
      } finally {
        setLoading(false);
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
    if (login == "true") {
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
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong pls login!",
      });
    }
  };

  const handleReceiveDataHover = () => {
    try {
      setDataLoading(true);
      axios
        .get(`http://localhost:3000/api/product/${hoveredItemId}`)
        .then((res) => {
          setDataItem(res.data);
          setDataLoading(false);
        });
    } catch (error: any) {
      throw new Error(error.message);
    }
  };
  return (
    <div>
      <div className="w-full h-auto">
        <div>
          <Headers />
        </div>

        <div className="mt-20 h-[250px]">
          <div>
            <h1 className="text-[40px] font-bold text-center">Rooms</h1>
          </div>
          <div className="w-full flex items-center justify-center flex-col">
            <p className=" mt-7 text-[#6a6a6a]">
              Vestibulum, diam vulputate amet cras in diam quis turpis curabitur
              tellus aliquet tellus iaculis
            </p>
            <p className="mt-2 text-[#6a6a6a]">
              tempus, sollicitudin massa duis eleifend egestas turpis sit etiam.
            </p>
          </div>
        </div>

        <div className="relative w-full">
          <div className="relative">
            <Image
              src="https://pcsite.co.uk/wp-content/uploads/2023/12/how-much-does-a-gaming-pc-cost.jpg"
              alt="my-image"
              width={1000} // Add the appropriate width here
              height={1000}
              className="w-full h-[85vh] "
            />
          </div>
          <div className="absolute top-36 right-40 w-[50%]">
            <div className="bg-white py-10 px-10 h-auto">
              <div>
                <h1 className="text-[35px] font-bold ">Gaming Room</h1>
              </div>
              <div className="mt-5">
                <p className="text-[#6a6a6a] leading-8	">
                  Massa cras egestas laoreet montes, dapibus eu sit etiam
                  curabitur faucibus habitasse lectus vestibulum leo, odio dolor
                  quis maecenas faucibus vulputate pharetra.
                </p>
              </div>

              <div className="mt-10">
                <div className="flex items-center gap-4">
                  <div className="h-[3px] w-[20px] bg-[#b98f28]"></div>
                  <div>
                    <p className="text-[#6a6a6a] font-semibold">
                      Nulla placerat viverra{" "}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 mt-2">
                  <div className="h-[3px] w-[20px] bg-[#b98f28]"></div>
                  <div>
                    <p className="text-[#6a6a6a] font-semibold">
                      Cursus viverra
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 mt-2">
                  <div className="h-[3px] w-[20px] bg-[#b98f28]"></div>
                  <div>
                    <p className="text-[#6a6a6a] font-semibold">
                      Vitae interdum eget
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 mt-2">
                  <div className="h-[3px] w-[20px] bg-[#b98f28]"></div>
                  <div>
                    <p className="text-[#6a6a6a] font-semibold">
                      Risus tempus elementum
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 mt-2">
                  <div className="h-[3px] w-[20px] bg-[#b98f28]"></div>
                  <div>
                    <p className="text-[#6a6a6a] font-semibold">
                      Aliquet dignissim
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-5">
                <button className="mt-4 text-[12px] bg-[#EDB932] py-3 px-10 font-semibold hover:text-white">
                  SHOP LIVING ROOM{" "}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20">
          <div className="group">
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
              <div className="grid grid-cols-4	 place-items-center w-full]">
                {data
                  .filter((item) => item.category == "PC Parts")
                  .map((item, index) => (
                    <div
                      key={index}
                      className="relative w-[90%] "
                      onMouseEnter={() => setHoveredItemId(item._id)}
                      onMouseLeave={() => setHoveredItemId(null)}
                    >
                      <Link href={`/pages/product/${item._id}`}>
                        <div
                          className={`mt-16 py-2  px-5 h-[300px]  ${
                            hoveredItemId == item._id
                              ? "shadow-xl shadow-[#8a8a8a]  transition-transform duration-300 h-auto"
                              : "shadow shadow-[#ededed]  transition-transform duration-300"
                          }`}
                        >
                          <div className="w-full  flex items-center justify-center">
                            <Image
                              src={item.image}
                              alt="my-image"
                              width={1000} // Add the appropriate width here
                              height={1000}
                              className="h-[150px] w-[200px]"
                            />
                          </div>
                          <div className="flex items-center justify-center flex-col w-full mt-3">
                            <div>
                              <p className="text-[11px] text-[#989898]">
                                {item.category}
                              </p>
                            </div>
                            <div>
                              <p className="text-[#b98f28] text-center w-full">
                                {item.name}
                              </p>
                            </div>
                            <div>
                              <p className="mt-2 text-[13px] text-[#595959]">
                                PHP {item.price}
                              </p>
                            </div>
                          </div>
                        </div>
                      </Link>

                      <div
                        className={`absolute inset-0 flex items-center justify-end  pr-4 opacity-0 top-0 mb-[200px]  ${
                          hoveredItemId == item._id ? "opacity-100" : ""
                        } transition-opacity duration-300`}
                      >
                        <div>
                          <div
                            onClick={() =>
                              handleOrder(
                                item._id,
                                item.name,
                                item.image,
                                item.price
                              )
                            }
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="1em"
                              height="1em"
                              viewBox="0 0 256 256"
                              className="bg-[#f1f1f1] cursor-pointer text-[#474747] py-1 px-1 rounded-full	 mt-7 text-3xl transform translate-x-full group-hover:translate-x-0 transition-transform duration-300"
                            >
                              <path
                                fill="currentColor"
                                d="M134 120v56a6 6 0 0 1-12 0v-56a6 6 0 0 1 12 0m40.83-.6l-5.6 56a6 6 0 0 0 5.37 6.6h.61a6 6 0 0 0 6-5.4l5.6-56a6 6 0 0 0-11.94-1.2Zm-93.66 0a6 6 0 0 0-11.94 1.2l5.6 56a6 6 0 0 0 6 5.4h.61a6 6 0 0 0 5.37-6.57ZM238 88.79l-15.13 113.06A14 14 0 0 1 209 214H47a14 14 0 0 1-13.87-12.15L18.05 88.79A6 6 0 0 1 24 82h45.28l54.2-61.95a6 6 0 0 1 9 0l54.2 62H232a6 6 0 0 1 6 6.74M85.22 82h85.56L128 33.11Zm139.93 12H30.85L45 200.26a2 2 0 0 0 2 1.74h162a2 2 0 0 0 2-1.74Z"
                              />
                            </svg>
                          </div>

                          <div
                            onClick={() => {
                              setShowModalLg(true);
                              handleReceiveDataHover();
                            }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="1em"
                              height="1em"
                              viewBox="0 0 24 24"
                              className="mt-3 cursor-pointer bg-[#f1f1f1] text-[#474747] py-1 px-1 rounded-full	 text-3xl transform translate-x-full group-hover:translate-x-0 transition-transform duration-300"
                            >
                              <g
                                fill="none"
                                stroke="currentColor"
                                stroke-width="2"
                              >
                                <circle cx="12" cy="12" r="3" />
                                <path d="M20.188 10.934c.388.472.582.707.582 1.066c0 .359-.194.594-.582 1.066C18.768 14.79 15.636 18 12 18c-3.636 0-6.768-3.21-8.188-4.934c-.388-.472-.582-.707-.582-1.066c0-.359.194-.594.582-1.066C5.232 9.21 8.364 6 12 6c3.636 0 6.768 3.21 8.188 4.934Z" />
                              </g>
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>

        <div className="relative mt-20 w-full">
          <div className="relative w-full">
            <Image
              src="https://images.summitmedia-digital.com/spotph/images/2021/12/02/best-gadgets-of-2021-640-1638428333.jpg"
              alt="my-image"
              width={1000} // Add the appropriate width here
              height={1000}
              className="w-full h-[85vh] "
            />
          </div>
          <div className="absolute top-36  right-40 w-[50%]">
            <div className="bg-white py-10 px-10">
              <div>
                <h1 className="text-[35px] font-bold ">Gadgets</h1>
              </div>
              <div className="mt-5">
                <p className="text-[#6a6a6a] leading-8	">
                  Massa cras egestas laoreet montes, dapibus eu sit etiam
                  curabitur faucibus habitasse lectus vestibulum leo, odio dolor
                  quis maecenas faucibus vulputate pharetra.
                </p>
              </div>

              <div className="mt-10">
                <div className="flex items-center gap-4">
                  <div className="h-[3px] w-[20px] bg-[#b98f28]"></div>
                  <div>
                    <p className="text-[#6a6a6a] font-semibold">
                      Nulla placerat viverra{" "}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 mt-2">
                  <div className="h-[3px] w-[20px] bg-[#b98f28]"></div>
                  <div>
                    <p className="text-[#6a6a6a] font-semibold">
                      Cursus viverra
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 mt-2">
                  <div className="h-[3px] w-[20px] bg-[#b98f28]"></div>
                  <div>
                    <p className="text-[#6a6a6a] font-semibold">
                      Vitae interdum eget
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 mt-2">
                  <div className="h-[3px] w-[20px] bg-[#b98f28]"></div>
                  <div>
                    <p className="text-[#6a6a6a] font-semibold">
                      Risus tempus elementum
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 mt-2">
                  <div className="h-[3px] w-[20px] bg-[#b98f28]"></div>
                  <div>
                    <p className="text-[#6a6a6a] font-semibold">
                      Aliquet dignissim
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-5">
                <button className="mt-4 text-[12px] bg-[#EDB932] py-3 px-10 font-semibold hover:text-white">
                  SHOP LIVING ROOM{" "}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20">
          <div className="group">
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
              <div className="grid grid-cols-4	 place-items-center w-full]">
                {data
                  .filter((item) => item.category == "Gadget")
                  .map((item, index) => (
                    <div
                      key={index}
                      className="relative w-[90%] "
                      onMouseEnter={() => setHoveredItemId(item._id)}
                      onMouseLeave={() => setHoveredItemId(null)}
                    >
                      <Link href={`/pages/product/${item._id}`}>
                        <div
                          className={`mt-16 py-2  px-5  h-[300px] ${
                            hoveredItemId == item._id
                              ? "shadow-xl shadow-[#8a8a8a]  transition-transform duration-300 h-auto"
                              : "shadow shadow-[#ededed]  transition-transform duration-300"
                          }`}
                        >
                          <div className="w-full  flex items-center justify-center">
                            <Image
                              src={item.image}
                              alt="my-image"
                              width={1000} // Add the appropriate width here
                              height={1000}
                              className="h-[150px] w-[200px]"
                            />
                          </div>
                          <div className="flex items-center justify-center flex-col w-full mt-3">
                            <div>
                              <p className="text-[11px] text-[#989898]">
                                {item.category}
                              </p>
                            </div>
                            <div>
                              <p className="text-[#b98f28] text-center w-full">
                                {item.name}
                              </p>
                            </div>
                            <div>
                              <p className="mt-2 text-[13px] text-[#595959]">
                                PHP {item.price}
                              </p>
                            </div>
                          </div>
                        </div>
                      </Link>

                      <div
                        className={`absolute inset-0 flex items-center justify-end  pr-4 opacity-0 top-0 mb-[200px]  ${
                          hoveredItemId == item._id ? "opacity-100" : ""
                        } transition-opacity duration-300`}
                      >
                        <div>
                          <div
                            onClick={() =>
                              handleOrder(
                                item._id,
                                item.name,
                                item.image,
                                item.price
                              )
                            }
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="1em"
                              height="1em"
                              viewBox="0 0 256 256"
                              className="bg-[#f1f1f1] cursor-pointer text-[#474747] py-1 px-1 rounded-full	 mt-7 text-3xl transform translate-x-full group-hover:translate-x-0 transition-transform duration-300"
                            >
                              <path
                                fill="currentColor"
                                d="M134 120v56a6 6 0 0 1-12 0v-56a6 6 0 0 1 12 0m40.83-.6l-5.6 56a6 6 0 0 0 5.37 6.6h.61a6 6 0 0 0 6-5.4l5.6-56a6 6 0 0 0-11.94-1.2Zm-93.66 0a6 6 0 0 0-11.94 1.2l5.6 56a6 6 0 0 0 6 5.4h.61a6 6 0 0 0 5.37-6.57ZM238 88.79l-15.13 113.06A14 14 0 0 1 209 214H47a14 14 0 0 1-13.87-12.15L18.05 88.79A6 6 0 0 1 24 82h45.28l54.2-61.95a6 6 0 0 1 9 0l54.2 62H232a6 6 0 0 1 6 6.74M85.22 82h85.56L128 33.11Zm139.93 12H30.85L45 200.26a2 2 0 0 0 2 1.74h162a2 2 0 0 0 2-1.74Z"
                              />
                            </svg>
                          </div>

                          <div
                            onClick={() => {
                              setShowModalLg(true);
                              handleReceiveDataHover();
                            }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="1em"
                              height="1em"
                              viewBox="0 0 24 24"
                              className="mt-3 cursor-pointer bg-[#f1f1f1] text-[#474747] py-1 px-1 rounded-full	 text-3xl transform translate-x-full group-hover:translate-x-0 transition-transform duration-300"
                            >
                              <g
                                fill="none"
                                stroke="currentColor"
                                stroke-width="2"
                              >
                                <circle cx="12" cy="12" r="3" />
                                <path d="M20.188 10.934c.388.472.582.707.582 1.066c0 .359-.194.594-.582 1.066C18.768 14.79 15.636 18 12 18c-3.636 0-6.768-3.21-8.188-4.934c-.388-.472-.582-.707-.582-1.066c0-.359.194-.594.582-1.066C5.232 9.21 8.364 6 12 6c3.636 0 6.768 3.21 8.188 4.934Z" />
                              </g>
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>

        <div className="relative mt-20 w-full">
          <div className="relative w-full">
            <Image
              src="https://websitedemos.net/home-decor-04/wp-content/uploads/sites/644/2020/08/home-office-img.jpg"
              alt="my-image"
              width={1000} // Add the appropriate width here
              height={1000}
              className="w-full h-[85vh]"
            />
          </div>
          <div className="absolute top-36  right-40 w-[50%]">
            <div className="bg-white py-10 px-10 ">
              <div>
                <h1 className="text-[35px] font-bold ">Home office</h1>
              </div>
              <div className="mt-5">
                <p className="text-[#6a6a6a] leading-8	">
                  Massa cras egestas laoreet montes, dapibus eu sit etiam
                  curabitur faucibus habitasse lectus vestibulum leo, odio dolor
                  quis maecenas faucibus vulputate pharetra.
                </p>
              </div>

              <div className="mt-10">
                <div className="flex items-center gap-4">
                  <div className="h-[3px] w-[20px] bg-[#b98f28]"></div>
                  <div>
                    <p className="text-[#6a6a6a] font-semibold">
                      Nulla placerat viverra{" "}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 mt-2">
                  <div className="h-[3px] w-[20px] bg-[#b98f28]"></div>
                  <div>
                    <p className="text-[#6a6a6a] font-semibold">
                      Cursus viverra
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 mt-2">
                  <div className="h-[3px] w-[20px] bg-[#b98f28]"></div>
                  <div>
                    <p className="text-[#6a6a6a] font-semibold">
                      Vitae interdum eget
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 mt-2">
                  <div className="h-[3px] w-[20px] bg-[#b98f28]"></div>
                  <div>
                    <p className="text-[#6a6a6a] font-semibold">
                      Risus tempus elementum
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 mt-2">
                  <div className="h-[3px] w-[20px] bg-[#b98f28]"></div>
                  <div>
                    <p className="text-[#6a6a6a] font-semibold">
                      Aliquet dignissim
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-5">
                <button className="mt-4 text-[12px] bg-[#EDB932] py-3 px-10 font-semibold hover:text-white">
                  SHOP LIVING ROOM{" "}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20">
          <div className="group">
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
              <div className="grid grid-cols-4	 place-items-center w-full]">
                {data
                  .filter((item) => item.category == "Home Office")
                  .map((item, index) => (
                    <div
                      key={index}
                      className="relative w-[90%] "
                      onMouseEnter={() => setHoveredItemId(item._id)}
                      onMouseLeave={() => setHoveredItemId(null)}
                    >
                      <Link href={`/pages/product/${item._id}`}>
                        <div
                          className={`mt-16 py-2  px-5  h-[300px]  ${
                            hoveredItemId == item._id
                              ? "shadow-xl shadow-[#8a8a8a]  transition-transform duration-300 h-auto"
                              : "shadow shadow-[#ededed]  transition-transform duration-300"
                          }`}
                        >
                          <div className="w-full  flex items-center justify-center">
                            <Image
                              src={item.image}
                              alt="my-image"
                              width={1000} // Add the appropriate width here
                              height={1000}
                              className="h-[150px] w-[200px]"
                            />
                          </div>
                          <div className="flex items-center justify-center flex-col w-full mt-3">
                            <div>
                              <p className="text-[11px] text-[#989898]">
                                {item.category}
                              </p>
                            </div>
                            <div>
                              <p className="text-[#b98f28] text-center w-full">
                                {item.name}
                              </p>
                            </div>
                            <div>
                              <p className="mt-2 text-[13px] text-[#595959]">
                                PHP {item.price}
                              </p>
                            </div>
                          </div>
                        </div>
                      </Link>

                      <div
                        className={`absolute inset-0 flex items-center justify-end  pr-4 opacity-0 top-0 mb-[200px]  ${
                          hoveredItemId == item._id ? "opacity-100" : ""
                        } transition-opacity duration-300`}
                      >
                        <div>
                          <div
                            onClick={() =>
                              handleOrder(
                                item._id,
                                item.name,
                                item.image,
                                item.price
                              )
                            }
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="1em"
                              height="1em"
                              viewBox="0 0 256 256"
                              className="bg-[#f1f1f1] cursor-pointer text-[#474747] py-1 px-1 rounded-full	 mt-7 text-3xl transform translate-x-full group-hover:translate-x-0 transition-transform duration-300"
                            >
                              <path
                                fill="currentColor"
                                d="M134 120v56a6 6 0 0 1-12 0v-56a6 6 0 0 1 12 0m40.83-.6l-5.6 56a6 6 0 0 0 5.37 6.6h.61a6 6 0 0 0 6-5.4l5.6-56a6 6 0 0 0-11.94-1.2Zm-93.66 0a6 6 0 0 0-11.94 1.2l5.6 56a6 6 0 0 0 6 5.4h.61a6 6 0 0 0 5.37-6.57ZM238 88.79l-15.13 113.06A14 14 0 0 1 209 214H47a14 14 0 0 1-13.87-12.15L18.05 88.79A6 6 0 0 1 24 82h45.28l54.2-61.95a6 6 0 0 1 9 0l54.2 62H232a6 6 0 0 1 6 6.74M85.22 82h85.56L128 33.11Zm139.93 12H30.85L45 200.26a2 2 0 0 0 2 1.74h162a2 2 0 0 0 2-1.74Z"
                              />
                            </svg>
                          </div>

                          <div
                            onClick={() => {
                              setShowModalLg(true);
                              handleReceiveDataHover();
                            }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="1em"
                              height="1em"
                              viewBox="0 0 24 24"
                              className="mt-3 cursor-pointer bg-[#f1f1f1] text-[#474747] py-1 px-1 rounded-full	 text-3xl transform translate-x-full group-hover:translate-x-0 transition-transform duration-300"
                            >
                              <g
                                fill="none"
                                stroke="currentColor"
                                stroke-width="2"
                              >
                                <circle cx="12" cy="12" r="3" />
                                <path d="M20.188 10.934c.388.472.582.707.582 1.066c0 .359-.194.594-.582 1.066C18.768 14.79 15.636 18 12 18c-3.636 0-6.768-3.21-8.188-4.934c-.388-.472-.582-.707-.582-1.066c0-.359.194-.594.582-1.066C5.232 9.21 8.364 6 12 6c3.636 0 6.768 3.21 8.188 4.934Z" />
                              </g>
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>

        <div className="w-full h-[50vh] flex items-center justify-center gap-10 mt-32 bg-white shadow-xl shadow-[#f2f2f2]  transition-transform duration-300 ">
          <div className="w-[50%] h-full">
            <Image
              src="https://websitedemos.net/home-decor-04/wp-content/uploads/sites/644/2020/08/newsletter-banner-img.jpg"
              alt="my-image"
              width={1000} // Add the appropriate width here
              height={1000}
              className="w-full h-full"
            />
          </div>
          <div className="h-full w-[50%]  py-10 px-12">
            <div className="flex items-center gap-4">
              <div className="h-[1px] w-[50px] bg-[#b98f28]"></div>
              <div>
                <p className="text-[#b98f28] text-[14px] uppercase">
                  Subscribe To Our Newsletter
                </p>
              </div>
            </div>
            <div className="mt-5">
              <h1 className="text-4xl  font-bold">
                See The Latest Collection &
              </h1>
              <h1 className="text-4xl  font-bold mt-2">Get Special Offer</h1>
            </div>
            <div className="mt-5 flex items-center  gap-5">
              <div>
                <input
                  type="text"
                  className="border border-black w-[350px] px-2 py-2

"
                />
              </div>
              <div>
                <button className=" text-[12px] bg-[#EDB932] py-3 px-10 font-semibold hover:text-white">
                  SUBSCRIBE
                </button>
              </div>
            </div>
            <div className="mt-5">
              <p className="text-[#989898]">
                Cras interdum lectus velit nibh senectus fringilla ut.
              </p>
            </div>
          </div>
        </div>

        <div>
          <Footer />
        </div>
      </div>

      <div>
        <TEModal show={showModalLg} setShow={setShowModalLg}>
          <TEModalDialog centered size="xl">
            <TEModalContent className="w-full 	 ">
              {dataLoading ? (
                <div className="w-full flex items-center justify-center h-[65vh]">
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
                <div className="w-full flex  justify-center gap-10 h-[65vh] overflow-y-scroll">
                  <div className="w-[50%] flex items-center justify-center">
                    <img src={dataItem?.image} className="w-4/5		h-[400px]" />
                  </div>
                  <div className="w-[50%] px-3 py-3">
                    <div className="flex justify-end items-end">
                      <button
                        type="button"
                        className="box-content border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none bg-[#e3e3e3] py-2 px-2 rounded-full	"
                        onClick={() => setShowModalLg(false)}
                        aria-label="Close"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="h-6 w-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                    <div>
                      <h1 className="text-3xl font-semibold	">
                        {dataItem?.name}
                      </h1>
                    </div>
                    <div className="mt-7">
                      <p className="  text-[#6a6a6a] font-bold text-xl">
                        PHP {dataItem?.price}
                        <span className="text-sm font-normal ml-1 ">
                          & Free Shipping
                        </span>
                      </p>
                    </div>
                    <div className="mt-4">
                      <p className="text-[#6a6a6a] text-base tracking-wide leading-7 ">
                        Habitasse eaque wisi molestie, mollis pharetra convallis
                        exercitation, distinctio eu arcu fugit nibh donec
                        exercitationem, quisque imperdiet mattis proident
                        cupiditate habitant assumenda. Pariatur minus nibh
                        necessitatibus sociis minim, consectetur dapibus.
                      </p>
                    </div>
                    <div className=" border-b-[1px] border-[#e6e6e6]  py-3 mt-3"></div>
                    <div className="mt-3">
                      <p className="text-[#6a6a6a] text-sm font-semibold ">
                        Categories:
                        <span className="font-normal text-black">
                          {dataItem?.category}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </TEModalContent>
          </TEModalDialog>
        </TEModal>
      </div>
    </div>
  );
}
