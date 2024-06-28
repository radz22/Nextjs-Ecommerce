"use client";
import React, { useState, useEffect } from "react";
import Rating from "@mui/material/Rating";
import Cookies from "js-cookie";
import toast, { Toaster } from "react-hot-toast";
import Image from "next/image";

interface CommentItem {
  _id: string;
  commentid: string;
  name: string;
  image: string;
  comment: string;
  star: number;
}
interface ReviewProps {
  ID: string | any;
}
export default function Review({ ID }: ReviewProps) {
  const [comment, setComment] = useState<string>("");
  const [value, setValue] = useState<number | null>(1); // Initial value is 1
  const [data, setData] = useState<CommentItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [name, setName] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [login, setLogin] = useState<string>("");
  const [id, setId] = useState<string | null>(null);
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          "http://localhost:3000/api/comment/findcomment",
          {
            method: "POST",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify({
              commentid: ID,
            }),
          }
        );

        const result: CommentItem[] = await res.json();
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
    fetchData();
    return () => clearInterval(intervalId);
  }, [ID]);

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
            commentid: ID,
            comment: comment,
            star: value,
            image: image,
            name: name,
          }),
        });

        if (res.ok) {
          setComment("");
          toast.success("Successfully Added");
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      toast.error("pls login");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:3000/api/comment/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      if (response.ok) {
        toast.success("Successfully Deleted");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div>
        <Toaster position="top-center" reverseOrder={true} />
      </div>
      <div className="mt-4">
        <div>
          <h1 className="text-base font-semibold">Review ({data.length})</h1>
        </div>

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
          <div className="h-[40vh] overflow-y-scroll py-6 mt-3 px-20 ">
            {data.map((item, index) => (
              <div
                className="flex mt-5 gap-5 items-center  bg-white py-5 px-5 shadow-md shadow-[#b8b8b8]  transition-transform duration-300 relative"
                key={index}
              >
                <div>
                  <div>
                    <Image
                      src={item.image}
                      alt="my-image"
                      width={60} // Add the appropriate width here
                      height={60}
                      className=" rounded-full	"
                    />
                  </div>
                </div>
                <div className="flex items-center justify-center gap-5 ">
                  <div className="">
                    <Rating
                      name="read-only"
                      value={item.star}
                      readOnly
                      size="small"
                    />
                    <p className="text-[#6c6c6c] text-base  mb-2 ">
                      {item.name}
                    </p>

                    <p className="text-[#6c6c6c] text-base ">{item.comment}</p>
                  </div>
                  <div className="flex items-center gap-10 ">
                    <div>
                      {item.name == name ? (
                        <div
                          onClick={() => setId(item._id)}
                          onDoubleClick={() => setId(null)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="1em"
                            height="1em"
                            viewBox="0 0 24 24"
                            className="text-3xl"
                          >
                            <path
                              fill="none"
                              stroke="currentColor"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="1.5"
                              d="M12.25 12h-.5m.5-4h-.5m.5 8h-.5"
                            />
                          </svg>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>

                    <div>
                      {id == item._id && (
                        <div className=" bg-white py-5 px-10 shadow-lg shadow-[#9e9e9e]  transition-transform duration-300">
                          <div onClick={() => handleDelete(item._id)}>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="1em"
                              height="1em"
                              viewBox="0 0 24 24"
                              className="text-2xl text-[#c20000]"
                            >
                              <path
                                fill="currentColor"
                                d="M7 21q-.825 0-1.412-.587T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413T17 21zm2-4h2V8H9zm4 0h2V8h-2z"
                              />
                            </svg>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
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
