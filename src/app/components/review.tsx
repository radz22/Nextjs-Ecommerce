"use client";
import React, { useState, useEffect } from "react";
import Rating from "@mui/material/Rating";
import Cookies from "js-cookie";

interface CommentItem {
  _id: string;
  name: string;
  image: string;
  comment: string;
  star: number;
}
export default function Review() {
  const [comment, setComment] = useState<string>("");
  const [value, setValue] = useState<number | null>(1); // Initial value is 1
  const [data, setData] = useState<CommentItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [login, setLogin] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/comment");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result: CommentItem[] = await response.json();
        setData(result);
      } catch (error: any) {
        throw new Error(error.message);
      } finally {
        setLoading(false);
      }
    };

    const intervalId = setInterval(fetchData, 1000); // Fetch every 1 second
    const name = Cookies.get("name");
    const img = Cookies.get("image");
    const log = Cookies.get("login");

    setName(name || "");
    setImage(img || "");
    setLogin(log || "");
    return () => clearInterval(intervalId);
  }, []);

  const handleChange = (
    event: React.ChangeEvent<{}>,
    newValue: number | null
  ) => {
    setValue(newValue);
  };

  const handleAddComment = async () => {
    if (login == "true") {
      try {
        const res = await fetch("http://localhost:3000/api/comment", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            comment: comment,
            star: value,
            image: image,
            name: name,
          }),
        });

        if (res.ok) {
          setComment("");
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("pls login");
    }
  };
  return (
    <div>
      <div className="mt-4">
        <div>
          <h1 className="text-base font-semibold">Review (0)</h1>
        </div>
        <div>
          {data.map((item, index) => (
            <div className="flex mt-5 gap-5 items-center" key={index}>
              <div>
                <div>
                  {" "}
                  <img
                    src={item.image}
                    className="w-[60px] h-[60px] rounded-full	"
                  />
                </div>
              </div>
              <div>
                <p className="text-[#6c6c6c] text-base text-center mb-2 mr-2">
                  {item.name}
                </p>
                <Rating
                  name="read-only"
                  value={item.star}
                  readOnly
                  size="small"
                />

                <p className="text-[#6c6c6c] text-base">{item.comment}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="py-5 px-5 border border-[#dbdbdb] mt-20">
        <div>
          <h1 className=" text-[#6a6a6a] font-semibold text-lg">
            {" "}
            Add a review{" "}
          </h1>
          <p className="mt-2 text-sm text-[#6a6a6a]">
            Your email address will not be published. Required fields are marked
            *
          </p>
        </div>
        <div className="flex items-center mt-6 gap-3">
          <p className="text-[#6a6a6a] font-semibold text-lg">Your Rating * </p>
          <p>
            {" "}
            <Rating name="size-medium" value={value} onChange={handleChange} />
          </p>
        </div>
        <div className="mt-5">
          <div className="text-[#6a6a6a] font-semibold text-lg">
            <h1>Your review *</h1>
          </div>
          <div className="mt-4">
            <textarea
              className="py-3 px-3 border border-[#dbdbdb] w-full h-[200px] text-[#6a6a6a]"
              placeholder="comment here"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            ></textarea>
          </div>
          <div className="mt-5">
            <button
              className="text-[12px] bg-[#EDB932] py-3 px-10 font-semibold hover:text-white"
              onClick={handleAddComment}
            >
              SUBMIT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
