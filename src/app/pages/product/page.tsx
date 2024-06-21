"use client";
import Footer from "@/app/components/Footer";
import Headers from "@/app/components/Headers";
import PriceSlider from "@/app/components/PriceSlider";
import Link from "next/link";
import { useState, useEffect } from "react";
import React from "react";

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
export default function page() {
  const [dropDown, setDropDown] = useState<string>("Default sorting");
  const [hoveredItemId, setHoveredItemId] = useState<string | null>(null);
  const [data, setData] = useState<ProductItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const [showModal, setShowModal] = useState<boolean>(false);
  const handleDropDown = (value: string) => {
    setDropDown(value);
  };
  useEffect(() => {
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
                <div className="grid grid-cols-4	 place-items-center w-full">
                  {data.map((item, index) => (
                    <div
                      key={index}
                      className="relative "
                      onMouseEnter={() => setHoveredItemId(item._id)}
                      onMouseLeave={() => setHoveredItemId(null)}
                    >
                      <Link href={`/pages/product/${item._id}`}>
                        <div
                          className={`mt-16 py-2 px-10 ${
                            hoveredItemId == item._id
                              ? "shadow-xl shadow-[#8a8a8a]  transition-transform duration-300"
                              : "shadow shadow-[#ededed]  transition-transform duration-300"
                          }`}
                        >
                          <div>
                            <img
                              src={item.image}
                              className="w-[250px] h-[250px]  object-cover"
                            />
                          </div>
                          <div className="flex items-center justify-center flex-col">
                            <div>
                              <p className="text-[11px] text-[#989898]">
                                {item.category}
                              </p>
                            </div>
                            <div className="mt-2">
                              <p className="text-[#b98f28]">{item.name}</p>
                            </div>
                            <div>
                              <p className="mt-2 text-[13px] text-[#595959]">
                                PHP ${item.price}
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
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="1em"
                            height="1em"
                            viewBox="0 0 256 256"
                            className="bg-[#f1f1f1] text-[#474747] py-1 px-1 rounded-full	 mt-7 text-3xl transform translate-x-full group-hover:translate-x-0 transition-transform duration-300"
                          >
                            <path
                              fill="currentColor"
                              d="M134 120v56a6 6 0 0 1-12 0v-56a6 6 0 0 1 12 0m40.83-.6l-5.6 56a6 6 0 0 0 5.37 6.6h.61a6 6 0 0 0 6-5.4l5.6-56a6 6 0 0 0-11.94-1.2Zm-93.66 0a6 6 0 0 0-11.94 1.2l5.6 56a6 6 0 0 0 6 5.4h.61a6 6 0 0 0 5.37-6.57ZM238 88.79l-15.13 113.06A14 14 0 0 1 209 214H47a14 14 0 0 1-13.87-12.15L18.05 88.79A6 6 0 0 1 24 82h45.28l54.2-61.95a6 6 0 0 1 9 0l54.2 62H232a6 6 0 0 1 6 6.74M85.22 82h85.56L128 33.11Zm139.93 12H30.85L45 200.26a2 2 0 0 0 2 1.74h162a2 2 0 0 0 2-1.74Z"
                            />
                          </svg>

                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="1em"
                            height="1em"
                            viewBox="0 0 24 24"
                            className="mt-3 bg-[#f1f1f1] text-[#474747] py-1 px-1 rounded-full	 text-3xl transform translate-x-full group-hover:translate-x-0 transition-transform duration-300"
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
                  ))}
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
        <TEModal show={showModal} setShow={setShowModal} scrollable>
          <TEModalDialog size="fullscreen" className="w-[460px]">
            <TEModalContent>
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

                    <div className="flex items-center justify-between mt-5">
                      <div>
                        <h1>Bathroom</h1>
                      </div>
                      <div>
                        <p>(0)</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <div>
                        <h1>Bedroom</h1>
                      </div>
                      <div>
                        <p>(0)</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <div>
                        <h1>Cabinet</h1>
                      </div>
                      <div>
                        <p>(0)</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <div>
                        <h1>Chair</h1>
                      </div>
                      <div>
                        <p>(0)</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <div>
                        <h1>Home Office</h1>
                      </div>
                      <div>
                        <p>(0)</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <div>
                        <h1>Kitchen</h1>
                      </div>
                      <div>
                        <p>(0)</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <div>
                        <h1>Living Room</h1>
                      </div>
                      <div>
                        <p>(0)</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <div>
                        <h1>Sofa</h1>
                      </div>
                      <div>
                        <p>(0)</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <div>
                        <h1>Sofa</h1>
                      </div>
                      <div>
                        <p>(0)</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <div>
                        <h1>Stool</h1>
                      </div>
                      <div>
                        <p>(0)</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <div>
                        <h1>Stool</h1>
                      </div>
                      <div>
                        <p>(0)</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <div>
                        <h1>Stool</h1>
                      </div>
                      <div>
                        <p>(0)</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <div>
                        <h1>Other...</h1>
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
    </div>
  );
}
