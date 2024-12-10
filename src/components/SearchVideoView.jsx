import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const SearchVideoView = ({ item }) => {
  const [channelData, setChannelData] = useState([]);

  useEffect(() => {
    // fetch videos
    const fetchData = async () => {
      const { data } = await axios.get(
        `http://localhost:8000/api/channel/${item?.channelId}`
      );
      if (data) {
        setChannelData(data.channel);
      }
    };
    fetchData();
  }, []);
  console.log("channel data in search", channelData);
  return (
    <Link
      to={`/video/${item._id}`}
      className="border  rounded-md shadow-md flex p-4 gap-4 w-[85%]"
    >
      <img className="w-96" src={item?.thumbnailUrl} alt="video thumbnail" />
      <div className="data ">
        <h2 className="font-semibold text-xl">{item?.title}</h2>
        <p>
          {item?.views} . {item?.createdAt}
        </p>
        <div className="flex font-semibold py-2 gap-2 items-center">
          <img
            className="w-10 rounded-full h-10 border border-black"
            src={channelData?.channelLogo}
            alt="channel logo"
          />
          <h2>{channelData?.channelName}</h2>
        </div>
        <p>
          {item?.description.length > 198
            ? item?.description.slice(0, 198) + "..."
            : item?.description}{" "}
        </p>
      </div>
    </Link>
  );
};

export default SearchVideoView;
