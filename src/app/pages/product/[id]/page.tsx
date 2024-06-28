"use client";
import Headers from "@/app/components/Headers";
import Review from "@/app/components/review";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import Footer from "@/app/components/Footer";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";

interface ProductItem {
  _id: string;
  name: string;
  image: string;
  category: string;
  price: number;
}
export default function Page() {
  const { id } = useParams();
  const [data, setData] = useState<ProductItem | any>();
  const [loading, setLoading] = useState<boolean>(true);
  const [count, setCount] = useState<number>(1);
  const [name, setName] = useState<string>("");
  const [login, setLogin] = useState<string>("");
  const [showContent, setShowContent] = useState(false);
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const [limitDataProduct, setLimitDataProduct] = useState<ProductItem[]>([]);
  const [offset, setOffset] = useState<number>(0);
  const [totalProduct, setTotalProduct] = useState<number>();
  const [limit, setLimit] = useState<number>(4);
  const [hoveredItemId, setHoveredItemId] = useState<string | null>(null);
  const [offsetDefult, setOffsetDefult] = useState<number>(4);
  const handleIncrement = () => {
    setCount((prev) => prev + 1);
  };

  const handleDecrement = () => {
    if (count !== 1) {
      setCount((prev) => prev - 1);
    }
  };
  const handleScroll = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop === 0) {
      // If at the top, hide the content
      setShowContent(false);
    } else if (scrollTop > lastScrollTop) {
      // Scrolling down
      setShowContent(true);
    }
    // Update last scroll position
    setLastScrollTop(scrollTop <= 0 ? 0 : scrollTop);
  };

  useEffect(() => {
    const name = Cookies.get("name");
    const log = Cookies.get("login");
    const fetchData = async () => {
      try {
        setLoading(true);
        axios.get(`http://localhost:3000/api/product/${id}`).then((res) => {
          setData(res.data);
        });
      } catch (error: any) {
        throw new Error(error.message);
      } finally {
        setLoading(false);
      }
    };
    const fetch = async () => {
      try {
        setLoading(true);
        axios
          .post("http://localhost:3000/api/product/limit", {
            limit: limit,
            offset: offset,
          })

          .then((res) => {
            setLimitDataProduct(res.data.data);
            setTotalProduct(res.data.countall);
            setLoading(false);
          });
      } catch (error: any) {
        throw new Error(error.message);
      }
    };
    fetch();
    setName(name || "");
    setLogin(log || "");
    fetchData();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollTop, limit, offset]);

  const handleOrder = async () => {
    if (login == "true") {
      try {
        axios
          .post(`http://localhost:3000/api/order`, {
            productid: data?._id,
            item: data?.name,
            user: name,
            image: data?.image,
            price: data?.price,
            quantity: count,
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

  const handleSeeMore = () => {
    setOffset(offset + limit);
    setOffsetDefult((prev) => prev + limit);
  };

  const handleSeeLess = () => {
    setOffset(Math.max(0, offset - limit));
    setOffsetDefult(Math.max(0, offsetDefult - limit));
  };

  console.log(offset, offsetDefult);
  return (
    <div className="relative">
      <div className="w-full h-auto relative bg-[#f3f3f3]">
        <div>
          <Headers />
        </div>

        <div className="mt-5 px-20 py-5">
          <div className="bg-[#fff] shadow-md	 shadow-[#f4f4f4] px-10 py-5 h-auto">
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
              <div className="flex justify-center gap-5 w-full">
                <div className="px-5 w-6/12	">
                  <div className="w-full">
                    <Image
                      src={data?.image}
                      alt="my-image"
                      width={1000}
                      height={1000}
                      className="w-[90%] h-[430px]"
                    />
                  </div>
                </div>
                <div className="w-6/12	">
                  <div>
                    <h1 className="text-[#6a6a6a] text-sm">
                      <span>Home </span> / <span>{data?.category}</span> /{" "}
                      <span>{data?.name}</span>
                    </h1>
                  </div>
                  <div className="mt-5">
                    <h1 className="text-black text-4xl font-semibold tracking-wider	">
                      {data?.name}
                    </h1>
                  </div>
                  <div className="mt-5">
                    <div>
                      <h1 className="  text-[#6a6a6a] font-bold text-xl">
                        PHP {data?.price}
                        {""}
                        <span className="text-sm font-normal ml-2 ]">
                          & Free Shipping
                        </span>{" "}
                      </h1>
                    </div>
                  </div>

                  <div className="mt-2">
                    <p className="text-[#6a6a6a] text-base tracking-wide	leading-7	">
                      Habitasse eaque wisi molestie, mollis pharetra convallis
                      exercitation, distinctio eu arcu fugit nibh donec
                      exercitationem, quisque imperdiet mattis proident
                      cupiditate habitant assumenda. Pariatur minus nibh
                      necessitatibus sociis minim, consectetur dapibus.
                    </p>
                  </div>
                  <div className="mt-3 flex gap-8">
                    <div className="flex items-center justify-center">
                      <div
                        className="border border-[#dadada] px-4 py-2 cursor-pointer"
                        onClick={handleDecrement}
                      >
                        <p>-</p>
                      </div>
                      <div className="border border-black py-2 cursor-pointer px-4 items-center">
                        <p>{count}</p>
                      </div>
                      <div
                        className="border border-[#dadada] px-4 py-2 cursor-pointer"
                        onClick={handleIncrement}
                      >
                        <p>+</p>
                      </div>
                    </div>
                    <div>
                      <button
                        className="text-[12px] bg-[#EDB932] py-3 px-10 font-semibold hover:text-white"
                        onClick={handleOrder}
                      >
                        ADD TO CART
                      </button>
                    </div>
                  </div>

                  <div className="text-[#6a6a6a] text-sm font-semibold mt-4">
                    Categories:{" "}
                    <span className="font-normal text-black">
                      {data?.category}
                    </span>
                  </div>
                </div>
              </div>
            )}

            <div className="border-b-[1px] border-[#f3f3f3]  py-3 mt-8"></div>
            <div>
              <Review ID={id} />
            </div>

            <div className="mt-12  py-5">
              <div>
                <h1 className="text-3xl font-bold">Another products</h1>
              </div>

              <div>
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
                      {limitDataProduct.length == 0 ? (
                        <div className="text-center text-3xl font-bold mt-10">
                          <h1>No Product</h1>
                        </div>
                      ) : (
                        <div className="grid grid-cols-4	 place-items-center w-full]">
                          {limitDataProduct.map((item, index) => (
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
                                    <Image
                                      src={item.image}
                                      alt="my-image"
                                      width={250}
                                      height={250}
                                      className="object-cover"
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
                  )}
                </div>
                <div className=" mt-10 flex items-center justify-center gap-10">
                  <div>
                    {offsetDefult == totalProduct ? (
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
                    {offset > 1 ? (
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
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div
            className={`fixed bottom-0 left-0 w-full bg-[#fafafa]  shadow-2xl

 shadow-[#dfdfdf] z-50 transform transition-transform duration-300 ease-in-out ${
   showContent
     ? "translate-y-0 opacity-100 delay-300"
     : "translate-y-full opacity-0 delay-150"
 }`}
          >
            <div className="flex item-center justify-between   px-20 py-5  w-full">
              <div className="flex items-center gap-5">
                <div>
                  <Image
                    src={data?.image}
                    alt="my-image"
                    width={50} // Add the appropriate width here
                    height={50}
                  />
                </div>
                <div>
                  <h1 className="text-[#6a6a6a] text-sm	font-semibold  ">
                    {data?.name}
                  </h1>
                </div>
              </div>
              <div className="flex items-center gap-5">
                <div>
                  <h1 className="text-[#6a6a6a] text-sm	font-semibold">
                    PHP {data?.price}
                  </h1>
                </div>
                <div className="flex items-center justify-center">
                  <div
                    className="border border-[#dadada] px-4 py-2 cursor-pointer"
                    onClick={handleDecrement}
                  >
                    <p>-</p>
                  </div>
                  <div className="border border-black py-2 cursor-pointer px-4 items-center">
                    <p>{count}</p>
                  </div>
                  <div
                    className="border border-[#dadada] px-4 py-2 cursor-pointer"
                    onClick={handleIncrement}
                  >
                    <p>+</p>
                  </div>
                </div>
                <div>
                  <button
                    className="text-[12px] bg-[#EDB932] py-3 px-10 font-semibold hover:text-white"
                    onClick={handleOrder}
                  >
                    ADD TO CART
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <Footer />
        </div>
      </div>
    </div>
  );
}
