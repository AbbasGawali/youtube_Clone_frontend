import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import VideoCard from "./VideoCard";
import timeAgo from "../utils/timeAgo";
import { useSelector } from "react-redux";

const ChannelDetail = () => {
  const params = useParams();
  const [channelData, setChannelData] = useState({});
  const [channelVideos, setChannelVideos] = useState([]);
  const user = useSelector((store) => store.user.userDetails);

  useEffect(() => {
    const fetchChannelData = async () => {
      const { data } = await axios.get(
        `http://localhost:8000/api/channel/${params.id}`
      );
      console.log(data, "data");
      console.log(data, "channel");
      if (data) {
        setChannelData(data.channel);
        fetchVideos(data?.channel?._id);
      }
    };
    fetchChannelData();
  }, [params]);

  const fetchVideos = async (channelId) => {
    const { data } = await axios.get(
      `http://localhost:8000/api/video/channelVideos/${channelId}`
    );
    console.log(data?.channel?.channelName, "videos");
    if (data) {
      setChannelVideos(data.videos);
    }
  };

  console.log("channel is ", channelData);
  console.log("channel videos is ", channelVideos);
  console.log("user  is ", user);
  return (
    <div className="px-24">
      <img
        src={channelData?.channelBanner}
        className="rounded-md"
        alt="channelBanner"
      />
      <div className="channelDetails flex gap-8 py-4">
        <img
          src={channelData?.channelLogo}
          className="rounded-full border-8"
          alt="channellogo"
        />
        <div className="details">
          <h2 className="text-3xl font-bold">{channelData?.channelName}</h2>
          <p>Videos : {channelData?.videos?.length}</p>
          <p>Subscribers : {channelData?.subscribers}</p>
          {/* <p>Created At : {channelData?.createdAt.split("T")[0]}</p> */}
          <p>
            {channelData?.description?.length >= 330
              ? channelData?.description.slice(0, 330) + "..."
              : channelData?.description}
          </p>
        </div>
      </div>
      <div className="toggles">
        <h2 className="py-4 bg-slate-100 px-6 my-6 rounded-md flex gap-3 items-center">
          Videos
          {channelData?.owner == user?._id ? (
            <>
              :{" "}
              <Link
                to={"/uploadVideo"}
                className=" transition-all bg-gray-700 text-white rounded-md  hover:bg-black px-4 py-1 border "
              >
                Upload Video
              </Link>
            </>
          ) : (
            ""
          )}
        </h2>

        {/* display video grid below */}
        <div className="flex flex-wrap gap-8">
          {channelVideos && channelVideos.length >= 1 ? (
            channelVideos.map((item) => (
              <div className="video_card w-96" key={item._id}>
                <Link to={`/video/${item._id}`}>
                  <img
                    src={item.thumbnailUrl}
                    alt={item.title.slice(0, 10) + "..."}
                    className="box w-96 h-52 border border-black"
                  />
                </Link>
                <div className="flex items-center gap-2 ps-2">
                  <div className="description">
                    {/* <h2>Video Title is here and you can watch it very easily </h2> */}
                    <h2>
                      {item?.title?.length > 72
                        ? item?.title.slice(0, 72) + "..."
                        : item?.title}
                    </h2>
                    <p>
                      {item?.views} views . {timeAgo(item?.createdAt)}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <h2>no videos to display</h2>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChannelDetail;
