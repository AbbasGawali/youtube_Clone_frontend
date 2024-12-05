import axios from "axios";
import React, { useEffect, useState } from "react";
import { BiDislike, BiLike } from "react-icons/bi";
import { HiOutlineDotsVertical } from "react-icons/hi";
const Comment = ({ createdAt, owner, description }) => {
  const [commentOwner, setCommentOwner] = useState({});

  useEffect(() => {
    const fetchOwner = async () => {
      const { data } = await axios.get(
        `http://localhost:8000/api/users/${owner}`
      );

      if (data) {
        setCommentOwner(data.user);
      }
    };
    fetchOwner();
  }, []);

  return (
    <div className="flex gap-4 bg-slate-100 justify-between  px-2 py-2">
      <div className="flex gap-2">
        <img
          className=" w-12 h-12 rounded-full border border-black"
          src={commentOwner?.avatar}
          alt="avatar"
        />
        <div className="data flex flex-col gap-1">
          <h2>{commentOwner?.userName}</h2>
          <p>{description}</p>
          <div className="flex gap-2 items-center">
            <button>
              {" "}
              <BiLike />{" "}
            </button>
            <button>
              {" "}
              <BiDislike />
            </button>
            <button>reply </button>
          </div>
        </div>
      </div>
      <div className="btn  ">
        <HiOutlineDotsVertical />
      </div>
    </div>
  );
};

export default Comment;
