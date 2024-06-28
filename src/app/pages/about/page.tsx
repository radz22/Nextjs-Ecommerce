import React from "react";
import Headers from "@/app/components/Headers";
import Footer from "@/app/components/Footer";
export default function Page() {
  return (
    <div className="w-full h-auto">
      <div>
        <Headers />
      </div>

      <div className="mt-20 h-[250px]">
        <div>
          <h1 className="text-[40px] font-bold text-center">About Us</h1>
        </div>
        <div className="w-full flex items-center justify-center flex-col">
          <p className=" mt-7 text-[#6a6a6a]">
            Tempus amet, sit erat malesuada lorem purus dictum pretium, posuere
            sagittis ultricies enim
          </p>
          <p className="mt-2 text-[#6a6a6a]">
            massa nisi neque augue in condimentum diam commodo ornare.
          </p>
        </div>
      </div>
      <div className="w-full  flex items-center justify-center">
        <div className="w-[50%]  flex items-center justify-center mt-[200px]">
          <img
            src="https://websitedemos.net/home-decor-04/wp-content/uploads/sites/644/2020/08/furniture-store-about-product-img.jpg"
            className="w-[70%] "
          />
        </div>

        <div className="w-[50%]  gap-5">
          <div className="w-[80%]">
            <img
              src="https://scontent.fmnl17-1.fna.fbcdn.net/v/t39.30808-6/284896620_3162145590780591_8300955278352951487_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=a5f93a&_nc_eui2=AeEJYyLAxZMUGfl6UpTvMw_RHkztEsCWBsoeTO0SwJYGyinXIddt_UxSeVwGzzm2y2skPC34gFb_DRjXs-WEksnr&_nc_ohc=K--0Tk08fIMQ7kNvgFRqmT4&_nc_ht=scontent.fmnl17-1.fna&oh=00_AYCfuLbnD-KUteaMAcdi-6NGm8NhKhJJ0ksTvU8m7deQvw&oe=66836243"
              className="h-[650px] w-full"
            />
          </div>
          <div className="w-[80%] mt-10   	">
            <p className="text-[#6a6a6a] leading-8	 tracking-wide">
              Eu egestas felis et viverra amet dictum ornare turpis gravida orci
              bibendum odio sit volutpat proin at enim ultrices dolor nullam
              tortor ornare cursus nibh sit adipiscing adipiscing enim erat nunc
              donec tellus, egestas commodo netus adipiscing ultrices at
              phasellus ut vitae nunc malesuada id nec suspen disse sit turpis
              mauris biben dum amet dignissim in sit duis pharetra vehicula eget
              suspen disse at vitae integer gravida sagittis.
            </p>
          </div>
          <div className="mt-5">
            <h1 className="text-[#6a6a6a] font-bold font-mono	text-base">
              RADZ S. SANTILLAN
            </h1>
            <p className="text-[#6a6a6a]  mt-2 text-sm">Founder of KAYUU</p>
          </div>
        </div>
      </div>

      <div className="w-full flex items-center justify-center mt-32">
        <div className="w-[50%] flex items-center justify-center flex-col">
          <div>
            <h1 className="text-[40px] font-bold">The Best Quality</h1>
            <h1 className="text-[40px] font-bold ">Furniture Store in Town</h1>
          </div>
          <div className="w-full flex items-center justify-center">
            <p className=" mt-7 text-[#6a6a6a] w-[70%] leading-7	 ">
              Sagittis enim, auctor ultrices dui etiam viverra nulla scelerisque
              in semper porttitor pharetra, tortor amet lorem cursus velit
              posuere tristique tempus, tincidunt non velit quis congue lectus a
              ullamcorper iaculis.
            </p>
          </div>

          <div className="mt-7 w-[70%]">
            <div className=" flex  gap-2">
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
                    d="M7 12v1h10v-1a3 3 0 0 1 2.993-3a4.592 4.592 0 0 0-.07-.78a4 4 0 0 0-3.143-3.143C16.394 5 15.93 5 15 5H9c-.93 0-1.394 0-1.78.077A4 4 0 0 0 4.077 8.22a4.588 4.588 0 0 0-.07.78A3 3 0 0 1 7 12"
                  />
                  <path
                    fill="currentColor"
                    d="M18.444 18H5.556a3.57 3.57 0 0 1-.806-.092V19a.75.75 0 0 1-1.5 0v-1.849A3.548 3.548 0 0 1 2 14.444V12a2 2 0 1 1 4 0v1.2a.8.8 0 0 0 .8.8h10.4a.8.8 0 0 0 .8-.8V12a2 2 0 1 1 4 0v2.444a3.548 3.548 0 0 1-1.25 2.707V19a.75.75 0 0 1-1.5 0v-1.092a3.57 3.57 0 0 1-.806.092"
                  />
                </svg>
              </div>
              <div>
                <div>
                  <h1 className="font-bold"> Huge Selection </h1>
                </div>
                <div>
                  <p className="text-[#6a6a6a] mt-1">
                    {" "}
                    Sagittis enim, auctor ultrices dui etiam viverra nulla.{" "}
                  </p>
                </div>
              </div>
            </div>

            <div className=" flex  gap-2 mt-5">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  viewBox="0 0 256 256"
                  className="text-[#EDB932] text-2xl"
                >
                  <path
                    fill="currentColor"
                    d="M216 64H56a8 8 0 0 1 0-16h136a8 8 0 0 0 0-16H56a24 24 0 0 0-24 24v128a24 24 0 0 0 24 24h160a16 16 0 0 0 16-16V80a16 16 0 0 0-16-16m-36 80a12 12 0 1 1 12-12a12 12 0 0 1-12 12"
                  />
                </svg>
              </div>
              <div>
                <div>
                  <h1 className="font-bold"> Low Price Everyday </h1>
                </div>
                <div>
                  <p className="text-[#6a6a6a] mt-1">
                    {" "}
                    Tincidunt sed eget nunc tellus viverra sapien massa cursus.
                  </p>
                </div>
              </div>
            </div>

            <div className=" flex  gap-2 mt-5">
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
                    fill-rule="evenodd"
                    d="M2 2a1 1 0 0 0-1 1v14c0 1.354.897 2.498 2.129 2.872a3 3 0 0 0 5.7.128h6.341a3 3 0 0 0 5.7-.128A3.001 3.001 0 0 0 23 17v-4a5 5 0 0 0-5-5h-4V3a1 1 0 0 0-1-1zm13.171 16H14v-8h4a3 3 0 0 1 3 3v4a.997.997 0 0 1-.293.707a3 3 0 0 0-5.536.293m-9.878.293a1 1 0 1 1 1.414 1.414a1 1 0 0 1-1.414-1.414M17 19a1 1 0 1 1 2 0a1 1 0 0 1-2 0"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>
              <div>
                <div>
                  <h1 className="font-bold"> Same Day Delivery </h1>
                </div>
                <div>
                  <p className="text-[#6a6a6a] mt-1">
                    {" "}
                    Pretium, tempus ultricies lacus eleifend scelerisque sem.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-[50%]">
          <div>
            <img src="https://websitedemos.net/home-decor-04/wp-content/uploads/sites/644/2020/08/furniture-store-about-store-img.jpg" />
          </div>
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}
