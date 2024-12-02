import axios from "axios";
import React, { useEffect, useState } from "react";
import VideoCard from "./VideoCard";

const Home = () => {
  const [videos, setvideos] = useState([]);

  useEffect(() => {
    // fetch videos
    const fetchData = async () => {
      const { data } = await axios.get("http://localhost:8000/api/video/");
      console.log(data);
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
          />
        ))
      ) : (
        <h2>no videos to display</h2>
      )}
    </div>
  );
};

export default Home;
