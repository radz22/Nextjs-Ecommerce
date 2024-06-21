import React from "react";
import Headers from "@/app/components/Headers";
import Footer from "@/app/components/Footer";
export default function page() {
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
              src="https://scontent.fmnl17-4.fna.fbcdn.net/v/t39.30808-6/284896620_3162145590780591_8300955278352951487_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeEJYyLAxZMUGfl6UpTvMw_RHkztEsCWBsoeTO0SwJYGyinXIddt_UxSeVwGzzm2y2skPC34gFb_DRjXs-WEksnr&_nc_ohc=mKuXywv-qV0Q7kNvgFYvV96&_nc_ht=scontent.fmnl17-4.fna&oh=00_AYBhsCkHIiKjDJRgE_RnS3zHRE7bu-BuAxpGdCLI1byWzQ&oe=6679EF83"
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
      <div>
        <Footer />
      </div>
    </div>
  );
}
