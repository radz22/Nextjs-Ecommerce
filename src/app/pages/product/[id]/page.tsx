"use client";
import Headers from "@/app/components/Headers";
import Review from "@/app/components/review";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface ProductItem {
  _id: string;
  name: string;
  image: string;
  category: string;
  price: number;
}
export default function page() {
  const { id } = useParams();

  const [data, setData] = useState<ProductItem | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [count, setCount] = useState<number>(1);

  const handleIncrement = () => {
    setCount((prev) => prev + 1);
  };

  const handleDecrement = () => {
    if (count !== 1) {
      setCount((prev) => prev - 1);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/product/${id}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result: ProductItem = await response.json();
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
    <div>
      <div className="w-full h-auto">
        <div>
          <Headers />
        </div>

        <div className="mt-5 px-20 py-5">
          <div className="bg-white shadow-md	 shadow-[#f4f4f4] px-10 py-5 h-auto">
            <div className="flex justify-center gap-5 w-full">
              <div className="px-5 w-6/12	">
                <div className="w-full">
                  <img src={data?.image} className="w-full  h-[430px]" />
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
                    exercitationem, quisque imperdiet mattis proident cupiditate
                    habitant assumenda. Pariatur minus nibh necessitatibus
                    sociis minim, consectetur dapibus.
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
                    <button className="text-[12px] bg-[#EDB932] py-3 px-10 font-semibold hover:text-white">
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

            <div className="border-b-[1px] border-[#dbdbdb]  py-3 mt-8"></div>
            <div>
              <Review />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
