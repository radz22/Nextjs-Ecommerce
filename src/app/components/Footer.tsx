import React from "react";

export default function Footer() {
  return (
    <div className=" bg-[#1c1c1c] h-auto">
      <div className="flex items-center justify-between gap-4 w-full mt-20 px-20">
        <div className="w-[25%]">
          <div>
            {" "}
            <img
              src="https://websitedemos.net/home-decor-04/wp-content/uploads/sites/644/2020/08/kayuu-logo-white.svg"
              className="w-[130px] h-[130px]"
            />
          </div>
        </div>
        <div className="w-[25%]">
          <div>
            <h1 className="text-2xl text-white  font-normal">Useful Links</h1>
          </div>
        </div>
        <div className="w-[25%]">
          <div>
            <h1 className="text-2xl text-white  font-normal">Rooms</h1>
          </div>
        </div>
        <div className="w-[25%]">
          <div>
            <h1 className="text-2xl text-white font-normal">Stay In Touch</h1>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between gap-4 w-full  px-20">
        <div className="w-[25%]">
          <div>
            <p className="text-white text-[14px]">
              3538 Torrance Blvd, Torrance, CA 90503, USA
            </p>
          </div>
          <div className="mt-2">
            <p className="text-white text-[14px]">+1 123 456 7890</p>
          </div>
          <div className="mt-2">
            <p className="text-white text-[14px]">info@example.com</p>
          </div>
          <div className="mt-2">
            <p className="text-white text-[14px]">Visit Our Store</p>
          </div>
        </div>

        <div className="w-[25%]">
          <div className="mt-2">
            <p className="text-white text-[14px]">Home</p>
          </div>
          <div className="mt-2">
            <p className="text-white text-[14px]">Products</p>
          </div>
          <div className="mt-2">
            <p className="text-white text-[14px]">Rooms</p>
          </div>

          <div className="mt-2">
            <p className="text-white text-[14px]">About Us</p>
          </div>
          <div className="mt-2">
            <p className="text-white text-[14px]">Contact</p>
          </div>
        </div>
        <div className="w-[25%]">
          <div className="mt-2">
            <p className="text-white text-[14px]">Living Room</p>
          </div>

          <div className="mt-2">
            <p className="text-white text-[14px]">Bedroom</p>
          </div>

          <div className="mt-2">
            <p className="text-white text-[14px]">Kitchen</p>
          </div>

          <div className="mt-2">
            <p className="text-white text-[14px]">Bath Room</p>
          </div>

          <div className="mt-2">
            <p className="text-white text-[14px]">Home Office</p>
          </div>
        </div>
        <div className="w-[25%]">
          <div className="mt-2">
            <p className="text-white text-[14px]">
              Lorem ipsum dolor sit amet,{" "}
            </p>
          </div>
          <div className="mt-2">
            <p className="text-white text-[14px]">
              consectetur adipiscing elit.{" "}
            </p>
          </div>

          <div className="flex items-center justify-start gap-4 mt-4">
            <div className="px-2 py-2 bg-[#464646]">
              {" "}
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

            <div className="px-2 py-2 bg-[#464646]">
              {" "}
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

            <div className="px-2 py-2 bg-[#464646]">
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

            <div className="px-2 py-2 bg-[#464646]">
              {" "}
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

      <div className="w-full h-[1px] bg-[#888888] mt-10"></div>
      <div className=" w-full  px-20 flex items-center justify-between mt-12">
        <div>
          <p className="text-[14px] text-white">
            Copyright © 2024 Online Furniture Store
          </p>
        </div>

        <div>
          <p className="text-[14px] text-white">
            Powered by Online Furniture Store
          </p>
        </div>
      </div>
    </div>
  );
}
