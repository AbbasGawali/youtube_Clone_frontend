import axios from "axios";
import React, { useEffect, useState } from "react";
import VideoCard from "./VideoCard";
import { useSelector } from "react-redux";

const Home = () => {
  const [videos, setvideos] = useState([]);
  const userChannel = useSelector(
    (store) => store.userChannel.userChannelDetails
  );
  console.log("userChannel from redux in home", userChannel);
  useEffect(() => {
    // fetch videos
    const fetchData = async () => {
      const { data } = await axios.get("http://localhost:8000/api/video/");
      if (data) {
        setvideos(data.videos);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="flex flex-wrap gap-8">
      {/* video card  */}

      {videos && videos.length >= 1 ? (
        videos.map((item) => (
          <VideoCard
            key={item._id}
            videoId={item._id}
            title={item.title}
            channelId={item.channelId}
            thumbnailUrl={item.thumbnailUrl}
            views={item.views}
            createdAt={item.createdAt}
          />
        ))
      ) : (
        <h2>no videos to display</h2>
      )}
    </div>
  );
};

export default Home;
