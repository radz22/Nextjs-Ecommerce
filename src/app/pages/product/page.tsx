"use client";
import Footer from "@/app/components/Footer";
import Headers from "@/app/components/Headers";
import PriceSlider from "@/app/components/PriceSlider";
import axios from "axios";
import Link from "next/link";
import { useState, useEffect } from "react";
import React from "react";
import Image from "next/image";
import Cookies from "js-cookie";
import Swal from "sweetalert2";

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
import { boolean } from "zod";
interface ProductItem {
  _id: string;
  name: string;
  image: string;
  category: string;
  price: number;
}
export default function Page() {
  const [dropDown, setDropDown] = useState<string>("Default sorting");
  const [hoveredItemId, setHoveredItemId] = useState<string | null>(null);
  const [data, setData] = useState<ProductItem[]>([]);

  const [loading, setLoading] = useState<boolean>(true);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [limit, setLimit] = useState<number>(8);
  const [offset, setOffset] = useState<number>(0);
  const [totalProduct, setTotalProduct] = useState<number>();
  const [login, setLogin] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null);
  const [showModalLg, setShowModalLg] = useState(false);
  const [dataItem, setDataItem] = useState<ProductItem | any>();
  const [dataLoading, setDataLoading] = useState<boolean>(true);
  const handleDropDown = (value: string) => {
    setDropDown(value);
  };

  useEffect(() => {
    const log = Cookies.get("login");
    const name = Cookies.get("name");
    setLogin(log || null);
    setName(name || null);
    fetchData();
  }, [limit, offset]);
  const fetchData = async () => {
    try {
      setLoading(true);
      axios
        .post("http://localhost:3000/api/product/limit", {
          limit: limit,
          offset: offset,
        })

        .then((res) => {
          setData(res.data.data);
          setTotalProduct(res.data.countall);
          setLoading(false);
        });
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  const fetchProductsByCategory = async (category: string) => {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:3000/api/product/filter",
        { category }
      );

      if (response.status === 200) {
        setData(response.data);
      } else {
        console.log("error");
      }
    } catch (err) {
      console.log("error");
    } finally {
      setLoading(false);
    }
  };

  const handleFetchAllProducts = () => {
    fetchData();
  };

  const handleFilter = (category: string) => {
    fetchProductsByCategory(category);
  };

  const handleSeeMore = () => {
    setLimit(limit + 4);
  };
  const handleSeeLess = () => {
    setLimit(limit - 4);
  };
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

  console.log(dataLoading);

  return (
    <div className="w-full h-auto ">
      <div className="w-full h-auto ">
        <div>
          <Headers />
        </div>

        <div className=" mt-5 px-20 py-5 ">
          <div className="bg-white shadow-md	 shadow-[#f4f4f4] px-10 py-5 h-auto">
            <div className="flex items-center justify-between">
              <div className="flex items-center justify-center gap-2 bg-[#EDB932] py-2 px-5">
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    height="1em"
                    viewBox="0 0 21 21"
                    className="text-2xl text-black"
                  >
                    <path
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M4.5 6.5h12m-12.002 4h11.997M4.5 14.5h11.995"
                    />
                  </svg>
                </div>
                <div>
                  <button
                    className="text-sm	   font-semibold tracking-widest		"
                    onClick={() => setShowModal(true)}
                  >
                    OPTIONS
                  </button>
                </div>
              </div>
              <div>
                <TEDropdown className="flex justify-center">
                  <TERipple rippleColor="light">
                    <TEDropdownToggle className="flex items-center whitespace-nowrap rounded bg-white px-6 pb-2 pt-2.5 text-sm font-medium  leading-normal  ">
                      <h1 className=" text-[#6a6a6a]">{dropDown}</h1>
                      <span className="ml-2 [&>svg]:w-5 w-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </span>
                    </TEDropdownToggle>
                  </TERipple>

                  <TEDropdownMenu>
                    <TEDropdownItem>
                      <p
                        className="block w-full min-w-[160px] cursor-pointer whitespace-nowrap bg-transparent px-4 py-2 text-sm text-left font-normal pointer-events-auto text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:bg-neutral-100 focus:bg-neutral-100 focus:text-neutral-800 focus:outline-none active:no-underline dark:text-neutral-200 dark:hover:bg-neutral-600 dark:focus:bg-neutral-600 dark:active:bg-neutral-600"
                        onClick={() => handleDropDown("Default sorting")}
                      >
                        Default sorting
                      </p>
                    </TEDropdownItem>
                    <TEDropdownItem>
                      <p
                        onClick={() => handleDropDown(" Sort by popularity")}
                        className="block w-full min-w-[160px] cursor-pointer whitespace-nowrap bg-transparent px-4 py-2 text-sm text-left font-normal pointer-events-auto text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:bg-neutral-100 focus:bg-neutral-100 focus:text-neutral-800 focus:outline-none active:no-underline dark:text-neutral-200 dark:hover:bg-neutral-600 dark:focus:bg-neutral-600 dark:active:bg-neutral-600"
                      >
                        Sort by popularity{" "}
                      </p>
                    </TEDropdownItem>
                    <TEDropdownItem>
                      <p
                        onClick={() =>
                          handleDropDown(" Sort by average rating")
                        }
                        className="block w-full min-w-[160px] cursor-pointer whitespace-nowrap bg-transparent px-4 py-2 text-sm text-left font-normal pointer-events-auto text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:bg-neutral-100 focus:bg-neutral-100 focus:text-neutral-800 focus:outline-none active:no-underline dark:text-neutral-200 dark:hover:bg-neutral-600 dark:focus:bg-neutral-600 dark:active:bg-neutral-600"
                      >
                        Sort by average rating
                      </p>
                    </TEDropdownItem>
                  </TEDropdownMenu>
                </TEDropdown>
              </div>
            </div>

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
                <div>
                  <div className="grid grid-cols-4	 place-items-center w-full">
                    {data
                      .sort((a, b) => a.name.localeCompare(b.name))
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
                  <div className=" mt-10 flex items-center justify-center gap-10">
                    <div>
                      {limit == totalProduct ? (
                        ""
                      ) : (
                        <div
                          className="flex items-center justify-center gap-1"
                          onClick={handleSeeMore}
                        >
                          <div>
                            <button>See More</button>
                          </div>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="1em"
                            height="1em"
                            viewBox="0 0 24 24"
                            className="text-2xl"
                          >
                            <path
                              fill="none"
                              stroke="currentColor"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="m7 10l5 5l5-5"
                            />
                          </svg>
                        </div>
                      )}
                    </div>

                    <div>
                      {limit > 9 && (
                        <div
                          className="flex items-center justify-center gap-1"
                          onClick={handleSeeLess}
                        >
                          <div>
                            <button>See Less</button>
                          </div>
                          <div>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="1em"
                              height="1em"
                              viewBox="0 0 24 24"
                              className="text-2xl"
                            >
                              <path
                                fill="none"
                                stroke="currentColor"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="1.5"
                                d="m17 14l-5-5l-5 5"
                              />
                            </svg>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div>
          <Footer />
        </div>
      </div>
      <div>
        {/* <!-- Modal --> */}
        <div>
          <TEModal show={showModal} setShow={setShowModal} scrollable>
            <TEModalDialog size="fullscreen" className="h-screen  w-[500px]	">
              <TEModalContent className="h-screen">
                {/* <!--Modal body--> */}
                <TEModalBody>
                  <div className="w-full flex items-end justify-end  px-3 py-2">
                    <button
                      type="button"
                      className="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                      onClick={() => setShowModal(false)}
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
                  <div className="py-5 px-7 w-full">
                    <div className="flex ">
                      <div className="w-[70%]">
                        <input
                          type="text"
                          placeholder="Search products..."
                          className="border border-[#dedede] shadow-current	px-2 py-2 w-full "
                        />
                      </div>
                      <div>
                        <button className="  text-[12px] bg-[#EDB932] py-3 px-6 font-semibold hover:text-white">
                          SEARCH
                        </button>
                      </div>
                    </div>

                    <div className="mt-20">
                      <div>
                        <h1 className="text-[#6d6d6d] text-xl font-semibold">
                          Filter by price
                        </h1>
                      </div>

                      <div>
                        <PriceSlider />
                      </div>
                    </div>

                    <div className="mt-12">
                      <div>
                        <h1 className="text-[#6d6d6d] text-xl font-semibold">
                          Product categories{" "}
                        </h1>
                      </div>
                      <div>
                        <h1
                          className="text-[#6d6d6d] text-xl font-semibold mt-4 cursor-pointer"
                          onClick={() => {
                            handleFetchAllProducts();
                            setShowModal(false);
                          }}
                        >
                          Back All Products
                        </h1>
                      </div>

                      <div className="flex items-center justify-between mt-5">
                        <div
                          onClick={() => {
                            handleFilter("PC Parts");
                            setShowModal(false);
                          }}
                        >
                          <h1 className="cursor-pointer">PC Parts</h1>
                        </div>
                        <div>
                          <p>(0)</p>
                        </div>
                      </div>
                      <div
                        className="flex items-center justify-between mt-2"
                        onClick={() => {
                          handleFilter("Gadget");
                          setShowModal(false);
                        }}
                      >
                        <div>
                          <h1 className="cursor-pointer">Gadgets</h1>
                        </div>
                        <div>
                          <p>(0)</p>
                        </div>
                      </div>
                      <div
                        className="flex items-center justify-between mt-2"
                        onClick={() => {
                          handleFilter("School Equipment");
                          setShowModal(false);
                        }}
                      >
                        <div>
                          <h1 className="cursor-pointer">School Equipment</h1>
                        </div>
                        <div>
                          <p>(0)</p>
                        </div>
                      </div>
                      <div
                        className="flex items-center justify-between mt-2"
                        onClick={() => {
                          handleFilter("Bath Room");
                          setShowModal(false);
                        }}
                      >
                        <div>
                          <h1 className="cursor-pointer">Bathroom</h1>
                        </div>
                        <div>
                          <p>(0)</p>
                        </div>
                      </div>

                      <div
                        className="flex items-center justify-between mt-2"
                        onClick={() => {
                          handleFilter("Bed Room");
                          setShowModal(false);
                        }}
                      >
                        <div>
                          <h1 className="cursor-pointer">Bedroom</h1>
                        </div>
                        <div>
                          <p>(0)</p>
                        </div>
                      </div>

                      <div
                        className="flex items-center justify-between mt-2"
                        onClick={() => {
                          handleFilter("Cabinet");
                          setShowModal(false);
                        }}
                      >
                        <div>
                          <h1 className="cursor-pointer">Cabinet</h1>
                        </div>
                        <div>
                          <p>(0)</p>
                        </div>
                      </div>

                      <div
                        className="flex items-center justify-between mt-2"
                        onClick={() => {
                          handleFilter("Chair");
                          setShowModal(false);
                        }}
                      >
                        <div>
                          <h1 className="cursor-pointer">Chair</h1>
                        </div>
                        <div>
                          <p>(0)</p>
                        </div>
                      </div>

                      <div
                        className="flex items-center justify-between mt-2"
                        onClick={() => {
                          handleFilter("Home Office");
                          setShowModal(false);
                        }}
                      >
                        <div>
                          <h1 className="cursor-pointer">Home Office</h1>
                        </div>
                        <div>
                          <p>(0)</p>
                        </div>
                      </div>

                      <div
                        className="flex items-center justify-between mt-2"
                        onClick={() => {
                          handleFilter("Kitchen");
                          setShowModal(false);
                        }}
                      >
                        <div>
                          <h1 className="cursor-pointer">Kitchen</h1>
                        </div>
                        <div>
                          <p>(0)</p>
                        </div>
                      </div>

                      <div
                        className="flex items-center justify-between mt-2"
                        onClick={() => {
                          handleFilter("Living Room");
                          setShowModal(false);
                        }}
                      >
                        <div>
                          <h1 className="cursor-pointer">Living Room</h1>
                        </div>
                        <div>
                          <p>(0)</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </TEModalBody>
              </TEModalContent>
            </TEModalDialog>
          </TEModal>
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
                          Habitasse eaque wisi molestie, mollis pharetra
                          convallis exercitation, distinctio eu arcu fugit nibh
                          donec exercitationem, quisque imperdiet mattis
                          proident cupiditate habitant assumenda. Pariatur minus
                          nibh necessitatibus sociis minim, consectetur dapibus.
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
    </div>
  );
}
