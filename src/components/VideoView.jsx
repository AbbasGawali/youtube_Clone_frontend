import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const VideoView = () => {
  const params = useParams();
  const video = params.id;
  const [videoData, setVideoData] = useState([]);
  const [videoUrl, setVideoUrl] = useState("");
  console.log("video", video);
  useEffect(() => {
    // fetch videos
    const fetchData = async () => {
      const { data } = await axios.get(
        `http://localhost:8000/api/video/${video}`
      );
      console.log(data, "data");
      console.log(data, "video");
      if (data) {
        setVideoData(data.video);
      }
      if (data?.video?.videoUrl) {
        console.log("has url");
        setVideoUrl(data?.video?.videoUrl.split("v=")[1]);
      }
    };
    fetchData();
  }, []);
  console.log("videourl",videoUrl);
  //   console.log("videourl", videoData.videoUrl.split("v=")[1]);
  //   src={videoData?.videoUrl?.split("v=")[1]}
  return (
    <div>
      <h2>{params.id}</h2>
      <div className=" h-[28rem] w-[45rem] ">
        <iframe
          className=" w-full h-full"
          src={`https://www.youtube.com/embed/${videoUrl}?autoplay=1&rel=0`}
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          rel="0"
          autoplay="1"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default VideoView;
