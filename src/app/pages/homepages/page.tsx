"use client";
import { useState, useEffect } from "react";
import Header from "@/app/components/Header";
import Link from "next/link";
import Footer from "@/app/components/Footer";
import axios from "axios";

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
  const [limit, setLimit] = useState<number>(8);
  const [offset, setOffset] = useState<number>(0);
  const [totalProduct, setTotalProduct] = useState<number>();
  const [productFilter, setProductFilter] = useState<ProductItem[]>([]);
  useEffect(() => {
    fetchData();
    fetch();
  }, [limit, offset]);
  const fetch = async () => {
    try {
      setLoading(true);
      axios.get("http://localhost:3000/api/product").then((res) => {
        setProductFilter(res.data);
      });
    } catch (error: any) {
      throw new Error(error.message);
    } finally {
      setLoading(false);
    }
  };
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

  const handleSeeMore = () => {
    setLimit(limit + 4);
  };
  const handleSeeLess = () => {
    setLimit(limit - 4);
  };
  return (
    <div className="w-full h-auto">
      <div
        className="relative bg-cover bg-center h-auto z-0"
        style={{
          backgroundImage:
            "url('https://websitedemos.net/home-decor-04/wp-content/uploads/sites/644/2020/08/furniture-store-hero-bg.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 h-auto"></div>
        {/*  Header*/}
        <div className=" relative  z-50 bg-transparent]">
          <Header />
        </div>
        {/*  Content*/}

        <div className="mt-36 px-20 relative  z-10">
          <div className="flex items-center gap-3 ">
            <div className="w-[50px] h-[1px] bg-[#EDB932]"></div>
            <p className="text-[#EDB932] text-base">Kayuu Furniture Store</p>
          </div>

          <div className="mt-10">
            <div>
              <h1 className="text-white text-5xl font-bold">
                Make Yourself At Home
              </h1>
            </div>
            <div className="mt-10 w-[40%]">
              <p className="text-white leading-7">
                Vestibulum, diam vulputate amet cras in diam quis turpis
                curabitur tellus aliquet tellus iaculis tempus, sollicitudin
                massa duis eleifend egestas turpis sit etiam commodo viverra
                lacinia ipsum convallis sed augue purus scelerisque non
                vestibulum elementum mi, pellentesque leo tincidunt integer.
              </p>
            </div>

            <div>
              <button className="mt-4 text-[12px] bg-[#EDB932] py-3 px-10 font-semibold hover:text-white">
                SHOP NOW
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between mt-20 py-3">
            <div>
              <a href="#new">
                <p className="text-white text-[11px]">SCROLL DOWN</p>
              </a>
            </div>

            <div className="flex items-center justify-center  gap-3">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  viewBox="0 0 24 24"
                  className="text-white text-xl"
                >
                  <path
                    fill="currentColor"
                    d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95"
                  />
                </svg>
              </div>

              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  viewBox="0 0 24 24"
                  className="text-white text-xl"
                >
                  <path
                    fill="currentColor"
                    d="M22.46 6c-.77.35-1.6.58-2.46.69c.88-.53 1.56-1.37 1.88-2.38c-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29c0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15c0 1.49.75 2.81 1.91 3.56c-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.2 4.2 0 0 1-1.93.07a4.28 4.28 0 0 0 4 2.98a8.52 8.52 0 0 1-5.33 1.84q-.51 0-1.02-.06C3.44 20.29 5.7 21 8.12 21C16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56c.84-.6 1.56-1.36 2.14-2.23"
                  />
                </svg>
              </div>

              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  viewBox="0 0 24 24"
                  className="text-white text-xl"
                >
                  <path
                    fill="currentColor"
                    fill-rule="evenodd"
                    d="M21.7 8.037a4.26 4.26 0 0 0-.789-1.964a2.84 2.84 0 0 0-1.984-.839c-2.767-.2-6.926-.2-6.926-.2s-4.157 0-6.928.2a2.84 2.84 0 0 0-1.983.839a4.2 4.2 0 0 0-.79 1.965a30 30 0 0 0-.2 3.206v1.5a30 30 0 0 0 .2 3.206c.094.712.364 1.39.784 1.972c.604.536 1.38.837 2.187.848c1.583.151 6.731.2 6.731.2s4.161 0 6.928-.2a2.84 2.84 0 0 0 1.985-.84a4.3 4.3 0 0 0 .787-1.965a30 30 0 0 0 .2-3.206v-1.516a31 31 0 0 0-.202-3.206m-11.692 6.554v-5.62l5.4 2.819z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  viewBox="0 0 24 24"
                  className="text-white text-xl"
                >
                  <path
                    fill="currentColor"
                    d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4zm9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8A1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5a5 5 0 0 1-5 5a5 5 0 0 1-5-5a5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/*   2nd content */}
      <div className="h-auto w-full bg-white relative" id="new">
        <div className="mt-36 px-20">
          <div className="flex justify-center w-full gap-10">
            <div className="w-6/12	flex items-center justify-center">
              <img
                src="https://websitedemos.net/home-decor-04/wp-content/uploads/sites/644/2020/08/new-collection-furniture-img.jpg"
                className="h-[390px] w-[85%]"
              />
            </div>

            <div className="w-6/12 mt-10	">
              <div className="flex items-center gap-4">
                <div className="h-[1px] w-[50px] bg-[#b98f28]"></div>
                <p className="text-[#b98f28] text-[14px]">NEW COLLECTION</p>
              </div>
              <div className="mt-5 w-[70%] ">
                <div>
                  <h1 className="text-[40px] font-bold">
                    A Perfect Set For Your Living Room
                  </h1>
                </div>
                <div className="mt-3">
                  <p className="leading-6">
                    Massa cras egestas laoreet montes, dapibus eu sit etiam
                    curabitur faucibus habitasse lectus vestibulum leo, odio
                    dolor quis maecenas faucibus vulputate pharetra nunc sed
                    maecenas diam quisque habitasse.
                  </p>
                </div>
              </div>

              <div>
                <button className="mt-4 text-[12px] bg-[#EDB932] py-3 px-10 font-semibold hover:text-white">
                  SHOP THIS COLLECTION
                </button>
              </div>
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
              <div className="grid grid-cols-4	 place-items-center w-full]">
                {productFilter
                  .filter((item) => item.category == "Living Room")
                  .map((item, index) => (
                    <div
                      key={index}
                      className="relative w-[90%] "
                      onMouseEnter={() => setHoveredItemId(item._id)}
                      onMouseLeave={() => setHoveredItemId(null)}
                    >
                      <Link href={`/pages/product/${item._id}`}>
                        <div
                          className={`mt-16 py-2  px-5  h-auto${
                            hoveredItemId == item._id
                              ? "shadow-xl shadow-[#8a8a8a]  transition-transform duration-300 h-auto"
                              : "shadow shadow-[#ededed]  transition-transform duration-300"
                          }`}
                        >
                          <div className="w-full  flex items-center justify-center">
                            <img
                              src={item.image}
                              className="w-[250px] h-[250px]  object-cover"
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

      {/*   3rd content */}
      <div className="w-full mt-24 grid-cols-4	grid place-items-center">
        <div className="relative w-full  ">
          <div className="relative">
            <img
              src="https://websitedemos.net/home-decor-04/wp-content/uploads/sites/644/2020/08/living-room-bg.jpg"
              className="w-full h-[450px] brightness-50						"
            />
          </div>
          <div className="absolute bottom-10 left-10">
            <div className="flex items-center justify-center gap-1">
              <div>
                <button className="text-xl font-semibold text-white">
                  Living Room
                </button>
              </div>
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  viewBox="0 0 24 24"
                  className="text-white text-4xl"
                >
                  <path
                    fill="currentColor"
                    d="M13.47 8.53a.75.75 0 0 1 1.06-1.06l4 4a.75.75 0 0 1 0 1.06l-4 4a.75.75 0 1 1-1.06-1.06l2.72-2.72H6.5a.75.75 0 0 1 0-1.5h9.69z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div className="relative w-full  ">
          <div className="relative">
            <img
              src="https://websitedemos.net/home-decor-04/wp-content/uploads/sites/644/2020/08/bedroom-bg.jpg"
              className="w-full h-[450px] brightness-50						"
            />
          </div>
          <div className="absolute bottom-10 left-10">
            <div className="flex items-center justify-center gap-1">
              <div>
                <button className="text-xl font-semibold text-white">
                  Bed Room
                </button>
              </div>
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  viewBox="0 0 24 24"
                  className="text-white text-4xl"
                >
                  <path
                    fill="currentColor"
                    d="M13.47 8.53a.75.75 0 0 1 1.06-1.06l4 4a.75.75 0 0 1 0 1.06l-4 4a.75.75 0 1 1-1.06-1.06l2.72-2.72H6.5a.75.75 0 0 1 0-1.5h9.69z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="relative w-full  ">
          <div className="relative">
            <img
              src="https://websitedemos.net/home-decor-04/wp-content/uploads/sites/644/2020/08/kitchen-bg.jpg"
              className="w-full h-[450px] brightness-50						"
            />
          </div>
          <div className="absolute bottom-10 left-10">
            <div className="flex items-center justify-center gap-1">
              <div>
                <button className="text-xl font-semibold text-white">
                  Kitchen
                </button>
              </div>
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  viewBox="0 0 24 24"
                  className="text-white text-4xl"
                >
                  <path
                    fill="currentColor"
                    d="M13.47 8.53a.75.75 0 0 1 1.06-1.06l4 4a.75.75 0 0 1 0 1.06l-4 4a.75.75 0 1 1-1.06-1.06l2.72-2.72H6.5a.75.75 0 0 1 0-1.5h9.69z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div className="relative w-full  ">
          <div className="relative">
            <img
              src="https://websitedemos.net/home-decor-04/wp-content/uploads/sites/644/2020/08/bath-room-bg.jpg"
              className="w-full h-[450px] brightness-50						"
            />
          </div>
          <div className="absolute bottom-10 left-10">
            <div className="flex items-center justify-center gap-1">
              <div>
                <button className="text-xl font-semibold text-white">
                  Bath Room
                </button>
              </div>
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  viewBox="0 0 24 24"
                  className="text-white text-4xl"
                >
                  <path
                    fill="currentColor"
                    d="M13.47 8.53a.75.75 0 0 1 1.06-1.06l4 4a.75.75 0 0 1 0 1.06l-4 4a.75.75 0 1 1-1.06-1.06l2.72-2.72H6.5a.75.75 0 0 1 0-1.5h9.69z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/*   4th content */}

      <div className="w-full h-auto px-20 mt-20">
        <div className="flex items-center gap-4">
          <div className="h-[1px] w-[50px] bg-[#b98f28]"></div>
          <div>
            <p className="text-[#b98f28] text-[14px]">BEST SELLER </p>
          </div>
        </div>
        <div className="flex items-center justify-between mt-12">
          <div>
            <p className="text-4xl		font-bold">Discover Our</p>
            <p className="text-4xl		font-bold mt-2">Most Selling Products</p>
          </div>
          <div>
            <button className="mt-4 text-[12px] bg-[#EDB932] py-3 px-10 font-semibold hover:text-white">
              VIEW ALL BEST SELLERS
            </button>
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
              <div className="grid grid-cols-4	 place-items-center w-full]">
                {data.map((item, index) => (
                  <div
                    key={index}
                    className="relative w-[90%] "
                    onMouseEnter={() => setHoveredItemId(item._id)}
                    onMouseLeave={() => setHoveredItemId(null)}
                  >
                    <Link href={`/pages/product/${item._id}`}>
                      <div
                        className={`mt-16 py-2  px-5  h-[420px] ${
                          hoveredItemId == item._id
                            ? "shadow-xl shadow-[#8a8a8a]  transition-transform duration-300 h-auto"
                            : "shadow shadow-[#ededed]  transition-transform duration-300"
                        }`}
                      >
                        <div className="w-full  flex items-center justify-center">
                          <img
                            src={item.image}
                            className="w-[250px] h-[250px]  object-cover"
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
                          <g fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="12" cy="12" r="3" />
                            <path d="M20.188 10.934c.388.472.582.707.582 1.066c0 .359-.194.594-.582 1.066C18.768 14.79 15.636 18 12 18c-3.636 0-6.768-3.21-8.188-4.934c-.388-.472-.582-.707-.582-1.066c0-.359.194-.594.582-1.066C5.232 9.21 8.364 6 12 6c3.636 0 6.768 3.21 8.188 4.934Z" />
                          </g>
                        </svg>
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

      {/*   5th content */}

      <div className="w-full  mt-44 relative ">
        <div className="flex items-center justify-end relative">
          <img
            src="https://websitedemos.net/home-decor-04/wp-content/uploads/sites/644/2020/08/promo-banner-img.jpg"
            className="h-[470px] w-[70%]"
          />
        </div>

        <div className="absolute bottom-24	left-44  ">
          <div className="bg-white py-10 px-10 shadow-xl shadow-[#8a8a8a]  transition-transform duration-300 w-[45%] h-[280px] ">
            <div>
              <h1 className="text-2xl font-bold text-center">
                Sales up to 50% OFF
              </h1>
            </div>
            <div className="mt-5">
              <p className=" leading-7	">
                Molestie amet tempor, diam id magna ridiculus tincidunt cursus
                curabitur non ipsum mattis in vel venenatis nam enim facilisis
                mi, egestas metus, nunc at.
              </p>
            </div>
            <div className="mt-5">
              <button className="mt-4 text-[12px] bg-[#EDB932] py-3 px-10 font-semibold hover:text-white">
                SHOP NOW
              </button>
            </div>
          </div>
        </div>
      </div>

      {/*   6th content */}
      <div className="w-full h-auto mt-36	 px-20">
        <div className="flex items-center gap-4">
          <div className="h-[1px] w-[50px] bg-[#b98f28]"></div>
          <div>
            <p className="text-[#b98f28] text-[14px]">If you wonder</p>
          </div>
        </div>
        <div className="mt-10">
          <h1 className="text-4xl  font-bold">Why Choose Us</h1>
        </div>
        <div className="border-b-[1px] border-[#efefef] py-5"></div>

        <div className="grid-cols-4	 grid place-content-center gap-4 mt-10">
          <div>
            <div>
              <img
                src="https://websitedemos.net/blingg-jewelry-store-04/wp-content/uploads/sites/1119/2022/08/icon-04.png"
                className="w-[120px] h-[90px]"
              />
            </div>
            <div className="mt-3">
              <div>
                <h1 className="text-xl font-semibold">Big Discounts</h1>
              </div>
              <div className="w-[85%] mt-3 ">
                <p className="text-[#989898]">
                  Integer euismod blandit nunc sit amet sollicitudin. Fusce quis
                  orci viverra, cursus justo.
                </p>
              </div>
            </div>
          </div>

          <div>
            <div>
              <img
                src="https://websitedemos.net/blingg-jewelry-store-04/wp-content/uploads/sites/1119/2022/08/icon-01.png"
                className="w-[120px] h-[90px]"
              />
            </div>
            <div className="mt-3">
              <div>
                <h1 className="text-xl font-semibold">Free Shipping</h1>
              </div>
              <div className="w-[85%] mt-3 ">
                <p className="text-[#989898]">
                  Integer euismod blandit nunc sit amet sollicitudin. Fusce quis
                  orci viverra, cursus justo.
                </p>
              </div>
            </div>
          </div>

          <div>
            <div>
              <img
                src="https://websitedemos.net/blingg-jewelry-store-04/wp-content/uploads/sites/1119/2022/08/icon-02.png"
                className="w-[120px] h-[90px]"
              />
            </div>
            <div className="mt-3">
              <div>
                <h1 className="text-xl font-semibold">Secure Payments</h1>
              </div>
              <div className="w-[85%] mt-3 ">
                <p className="text-[#989898]">
                  Integer euismod blandit nunc sit amet sollicitudin. Fusce quis
                  orci viverra, cursus justo.
                </p>
              </div>
            </div>
          </div>

          <div>
            <div>
              <img
                src="https://websitedemos.net/blingg-jewelry-store-04/wp-content/uploads/sites/1119/2022/08/icon-03.png"
                className="w-[120px] h-[90px]"
              />
            </div>
            <div className="mt-3">
              <div>
                <h1 className="text-xl font-semibold">Order Tracking</h1>
              </div>
              <div className="w-[85%] mt-3 ">
                <p className="text-[#989898]">
                  Integer euismod blandit nunc sit amet sollicitudin. Fusce quis
                  orci viverra, cursus justo.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/*   7th content */}

      <div className="w-full h-[50vh] flex items-center justify-center gap-10 mt-32 bg-white shadow-xl shadow-[#f2f2f2]  transition-transform duration-300 ">
        <div className="w-[50%] h-full">
          <img
            src="https://websitedemos.net/home-decor-04/wp-content/uploads/sites/644/2020/08/newsletter-banner-img.jpg"
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
            <h1 className="text-4xl  font-bold">See The Latest Collection &</h1>
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
      {/*   footer */}
      <div className="w-full">
        <Footer />
      </div>
    </div>
  );
}
