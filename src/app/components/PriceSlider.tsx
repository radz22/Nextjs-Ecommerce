import { useState } from "react";
import ReactSlider from "react-slider";

export default function PriceSlider() {
  const [values, setValues] = useState<[number, number]>([0, 50000]);
  const handleMinChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Math.min(Number(event.target.value), values[1] - 1);
    setValues([newValue, values[1]]);
  };

  return (
    <div className="w-full">
      <input
        type="range"
        min="0"
        max="50000"
        value={values[0]}
        onChange={handleMinChange}
        className=" w-full h-1 bg-transparent slider-thumb left-thumb "
      />

      <div className="mt-2">
        <p className="text-[#6d6d6d] text-sm font-bold">
          {" "}
          <span className="font-normal ">Price:</span> {values[0]} - {values[1]}
        </p>
      </div>
    </div>
  );
}
