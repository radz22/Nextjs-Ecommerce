"use client";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { doLogout } from "../actions/Auth";
import Link from "next/link";
import { TEModal, TEModalDialog, TEModalContent } from "tw-elements-react";
import { doSocialLogin } from "@/app/actions/Auth";
interface OrderItem {
  _id: string;
  item: string;
  user: string;
  image: string;
  price: number;
  quantity: number;
}
export default function Header() {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [login, setLogin] = useState("");
  const [userNav, setUserNav] = useState(false);
  const [show, setShow] = useState<boolean>(false);
  const [data, setData] = useState<OrderItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    // Get the value of the cookie named 'myCookie'
    const name = Cookies.get("name");
    const img = Cookies.get("image");
    const log = Cookies.get("login");

    setName(name || "");
    setImage(img || "");
    setLogin(log || "");

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

  const handleLogout = async () => {
    // Perform the logout action
    await doLogout();
    setUserNav(false);
    // Reload the browser after the action is completed
    window.location.reload();
  };

  const handleOpen = () => {
    setUserNav(!userNav);
  };

  const handleOpenModal = () => {
    setShow(true);
  };

  const handleCloseModal = () => {
    setShow(false);
  };
  return (
    <div>
      <div className="border-b-[1px] border-[#777676] py-5">
        <div className="flex items-center justify-between px-20">
          <div>
            <img
              src="https://websitedemos.net/home-decor-04/wp-content/uploads/sites/644/2020/08/kayuu-logo-white.svg"
              className="max-w-[140px] w-[140px] h-auto"
            />
          </div>
          <div className="flex items-center justify-center gap-7 ">
            <div>
              <h1 className="text-white text-base">Home</h1>
            </div>

            <div>
              <Link href="/pages/product">
                {" "}
                <h1 className="text-white text-base">Product</h1>
              </Link>
            </div>

            <div>
              <Link href="/pages/room">
                {" "}
                <h1 className="text-white text-base">Rooms</h1>{" "}
              </Link>
            </div>

            <div>
              <Link href="/pages/about">
                {" "}
                <h1 className="text-white text-base">About Us</h1>{" "}
              </Link>
            </div>

            <div className="relative">
              <div>
                {login == "true" ? (
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center">
                      <div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="1em"
                          height="1em"
                          viewBox="0 0 24 24"
                          className="text-[#EDB932] text-2xl"
                        >
                          <path
                            fill="currentColor"
                            d="M21.947 10.941a2.82 2.82 0 0 0-.52-1.09a2.77 2.77 0 0 0-.94-.76a2.47 2.47 0 0 0-.92-.25a7.46 7.46 0 0 0-2.19-4.62a7.6 7.6 0 0 0-10.74 0a7.46 7.46 0 0 0-2.19 4.62a2.47 2.47 0 0 0-.92.25a2.68 2.68 0 0 0-.94.76a2.74 2.74 0 0 0-.52 2.3l1.57 6.43a4.65 4.65 0 0 0 4.5 3.42h7.71a4.67 4.67 0 0 0 4.51-3.44l1.56-6.41c.1-.396.11-.81.03-1.21m-13.1 6.42a.75.75 0 0 1-1.5 0v-3.94a.75.75 0 1 1 1.5 0zm3.91 0a.75.75 0 1 1-1.5 0v-3.94a.75.75 0 0 1 1.5 0zm3.91 0a.75.75 0 1 1-1.5 0v-3.94a.75.75 0 0 1 1.5 0zm-10.71-8.54a6 6 0 0 1 1.74-3.54a6.11 6.11 0 0 1 8.62 0a6 6 0 0 1 1.74 3.54z"
                          />
                        </svg>
                      </div>
                      <div>
                        {loading ? (
                          <div className="w-full flex items-center justify-center h-auto">
                            {" "}
                            <div
                              className="inline-block h-4 w-4 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                              role="status"
                            >
                              <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                                Loading...
                              </span>
                            </div>
                          </div>
                        ) : (
                          <Link href="/pages/cart">
                            <div className="bg-[#EDB932] rounded-full	px-2 mb-4">
                              <p>{data.length}</p>
                            </div>
                          </Link>
                        )}
                      </div>
                    </div>
                    <div
                      className="flex items-center justify-center gap-2 "
                      onClick={handleOpen}
                    >
                      <div>
                        <img src={image} className="w-6	 h-6 rounded-full		" />
                      </div>
                      <div>
                        {" "}
                        <h1 className="text-white">{name}</h1>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div>
                    <button onClick={handleOpenModal} className="text-white">
                      Signup & Signin
                    </button>
                  </div>
                )}
              </div>
              <div>
                {userNav && (
                  <div className="absolute top-10 right-5  bg-white w-[120px] h-[100px] px-3 py-3 ">
                    <div>
                      <button>My Account</button>
                    </div>
                    <div className="mt-2">
                      <button onClick={handleLogout}>Logout</button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div>
          <TEModal show={show} setShow={setShow}>
            <TEModalDialog centered size="xl">
              <TEModalContent className="w-full 	">
                <div className="w-full flex  justify-center">
                  <div className="w-2/4 px-5 py-5">
                    <div className="flex items-end justify-end">
                      <button
                        type="button"
                        className="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                        onClick={handleCloseModal}
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
                      <h1 className="text-2xl font-semibold mt-2">
                        Welcome Back
                      </h1>
                    </div>
                    <div className="h-[150px] mt-20">
                      <form
                        className="w-full flex items-center justify-center mt-5 gap-4"
                        action={doSocialLogin}
                      >
                        <button type="submit" name="action" value="facebook">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="1em"
                            height="1em"
                            viewBox="0 0 256 256"
                            className="text-5xl"
                          >
                            <path
                              fill="#1877f2"
                              d="M256 128C256 57.308 198.692 0 128 0S0 57.308 0 128c0 63.888 46.808 116.843 108 126.445V165H75.5v-37H108V99.8c0-32.08 19.11-49.8 48.348-49.8C170.352 50 185 52.5 185 52.5V84h-16.14C152.959 84 148 93.867 148 103.99V128h35.5l-5.675 37H148v89.445c61.192-9.602 108-62.556 108-126.445"
                            />
                            <path
                              fill="#fff"
                              d="m177.825 165l5.675-37H148v-24.01C148 93.866 152.959 84 168.86 84H185V52.5S170.352 50 156.347 50C127.11 50 108 67.72 108 99.8V128H75.5v37H108v89.445A129 129 0 0 0 128 256a129 129 0 0 0 20-1.555V165z"
                            />
                          </svg>
                        </button>

                        <button type="submit" name="action" value="github">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="1em"
                            height="1em"
                            viewBox="0 0 24 24"
                            className="text-5xl"
                          >
                            <g fill="none">
                              <g clip-path="url(#akarIconsGithubFill0)">
                                <path
                                  fill="currentColor"
                                  fill-rule="evenodd"
                                  d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385c.6.105.825-.255.825-.57c0-.285-.015-1.23-.015-2.235c-3.015.555-3.795-.735-4.035-1.41c-.135-.345-.72-1.41-1.23-1.695c-.42-.225-1.02-.78-.015-.795c.945-.015 1.62.87 1.845 1.23c1.08 1.815 2.805 1.305 3.495.99c.105-.78.42-1.305.765-1.605c-2.67-.3-5.46-1.335-5.46-5.925c0-1.305.465-2.385 1.23-3.225c-.12-.3-.54-1.53.12-3.18c0 0 1.005-.315 3.3 1.23c.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23c.66 1.65.24 2.88.12 3.18c.765.84 1.23 1.905 1.23 3.225c0 4.605-2.805 5.625-5.475 5.925c.435.375.81 1.095.81 2.22c0 1.605-.015 2.895-.015 3.3c0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12"
                                  clip-rule="evenodd"
                                />
                              </g>
                              <defs>
                                <clipPath id="akarIconsGithubFill0">
                                  <path fill="#fff" d="M0 0h24v24H0z" />
                                </clipPath>
                              </defs>
                            </g>
                          </svg>
                        </button>
                        <button type="submit" name="action" value="google">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="1em"
                            height="1em"
                            viewBox="0 0 128 128"
                            className="text-5xl"
                          >
                            <path
                              fill="#fff"
                              d="M44.59 4.21a63.28 63.28 0 0 0 4.33 120.9a67.6 67.6 0 0 0 32.36.35a57.13 57.13 0 0 0 25.9-13.46a57.44 57.44 0 0 0 16-26.26a74.3 74.3 0 0 0 1.61-33.58H65.27v24.69h34.47a29.72 29.72 0 0 1-12.66 19.52a36.2 36.2 0 0 1-13.93 5.5a41.3 41.3 0 0 1-15.1 0A37.2 37.2 0 0 1 44 95.74a39.3 39.3 0 0 1-14.5-19.42a38.3 38.3 0 0 1 0-24.63a39.25 39.25 0 0 1 9.18-14.91A37.17 37.17 0 0 1 76.13 27a34.3 34.3 0 0 1 13.64 8q5.83-5.8 11.64-11.63c2-2.09 4.18-4.08 6.15-6.22A61.2 61.2 0 0 0 87.2 4.59a64 64 0 0 0-42.61-.38"
                            />
                            <path
                              fill="#e33629"
                              d="M44.59 4.21a64 64 0 0 1 42.61.37a61.2 61.2 0 0 1 20.35 12.62c-2 2.14-4.11 4.14-6.15 6.22Q95.58 29.23 89.77 35a34.3 34.3 0 0 0-13.64-8a37.17 37.17 0 0 0-37.46 9.74a39.25 39.25 0 0 0-9.18 14.91L8.76 35.6A63.53 63.53 0 0 1 44.59 4.21"
                            />
                            <path
                              fill="#f8bd00"
                              d="M3.26 51.5a63 63 0 0 1 5.5-15.9l20.73 16.09a38.3 38.3 0 0 0 0 24.63q-10.36 8-20.73 16.08a63.33 63.33 0 0 1-5.5-40.9"
                            />
                            <path
                              fill="#587dbd"
                              d="M65.27 52.15h59.52a74.3 74.3 0 0 1-1.61 33.58a57.44 57.44 0 0 1-16 26.26c-6.69-5.22-13.41-10.4-20.1-15.62a29.72 29.72 0 0 0 12.66-19.54H65.27c-.01-8.22 0-16.45 0-24.68"
                            />
                            <path
                              fill="#319f43"
                              d="M8.75 92.4q10.37-8 20.73-16.08A39.3 39.3 0 0 0 44 95.74a37.2 37.2 0 0 0 14.08 6.08a41.3 41.3 0 0 0 15.1 0a36.2 36.2 0 0 0 13.93-5.5c6.69 5.22 13.41 10.4 20.1 15.62a57.13 57.13 0 0 1-25.9 13.47a67.6 67.6 0 0 1-32.36-.35a63 63 0 0 1-23-11.59A63.7 63.7 0 0 1 8.75 92.4"
                            />
                          </svg>
                        </button>
                      </form>
                    </div>
                    <div>
                      <p className="text-sm	text-center	mt-6  text-[#525252]	w-full">
                        By continuing, you agree to KAYUU
                        <span className="border-b-[1px] border-[#000]">
                          Terms of Use
                        </span>
                        . Read
                      </p>
                      <p className="text-sm	text-center	  text-[#525252]	 mt-2 w-full">
                        our
                        <span className="border-b-[1px] border-[#000] ml-1">
                          Privacy Policy
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="w-2/4	">
                    <img
                      src="https://lifestylebucket.com/wp-content/uploads/2023/06/Samsung-Sale.jpg"
                      className="h-[410px] w-full	"
                    />
                  </div>
                </div>
              </TEModalContent>
            </TEModalDialog>
          </TEModal>
        </div>
      </div>
    </div>
  );
}
