import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BiLike, BiDislike } from "react-icons/bi";
import Comment from "./Comment";

const VideoView = () => {
  const params = useParams();
  const video = params.id;
  const [videoData, setVideoData] = useState([]);
  const [comments, setComments] = useState([]);
  const [channelData, setChannelData] = useState([]);
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
        fetchChannelData(data.video.channelId);
        fetchVideoComments();
      }
      if (data?.video?.videoUrl) {
        console.log("has url");
        setVideoUrl(data?.video?.videoUrl.split("v=")[1]);
      }
    };
    fetchData();
  }, []);

  const fetchChannelData = async (cId) => {
    const { data } = await axios.get(
      `http://localhost:8000/api/channel/${cId}`
    );
    console.log(data, "data");
    console.log(data, "channel");
    if (data) {
      setChannelData(data.channel);
    }
  };
  const fetchVideoComments = async () => {
    const { data } = await axios.get(
      `http://localhost:8000/api/comment/videoComments/${video}`
    );

    console.log(data, "comment");
    if (data) {
      setComments(data.comments);
    }
  };

  console.log("channel", channelData);

  console.log("videourl", videoUrl);
  console.log("comments", comments);
  //   console.log("videourl", videoData.videoUrl.split("v=")[1]);
  //   src={videoData?.videoUrl?.split("v=")[1]}
  return (
    <div className="flex ">
      {/* <h2>{params.id}</h2> */}
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
        <div className="operations flex gap-2 justify-between py-4 items-center">
          <div className="flex gap-2 items-center">
            <img
              className="channel cursor-pointer w-12 h-12 rounded-full border border-black"
              src={channelData?.channelLogo}
              alt="Channel name"
            />
            <h2 className="font-bold cursor-pointer">
              {channelData?.channelName}
            </h2>
            <h2 className="px-4 py-1 cursor-pointer bg-black text-white   rounded-full">
              subscribe
            </h2>
          </div>
          <div className="flex gap-2 items-center">
            <button className="px-4 py-1 bg-slate-200 rounded-full flex items-center gap-2">
              <BiLike />
              like
            </button>
            <button className="px-4 py-1 bg-slate-200 rounded-full flex items-center gap-2">
              <BiDislike />
              dislike
            </button>
            <button className="px-4 py-1 bg-slate-200 rounded-full">
              save
            </button>
          </div>
        </div>

        <div className="comments py-2 bg-slate-100 p-2">
          <h2>
            Hi description is here, Lorem ipsum dolor, sit amet consectetur
            adipisicing elit. Recusandae, veniam atque! Totam, illum quidem.
            Dolor pariatur voluptatem maiores? Dolorem voluptas, impedit minima
            iusto necessitatibus inventore animi nemo officiis ipsum. Aperiam
            voluptas quo ex dolor laborum reprehenderit voluptate at quis amet,
            earum omnis dicta laboriosam. Harum cupiditate tempora nostrum
            consectetur alias.{" "}
          </h2>
        </div>
        <div className="comments py-4 flex flex-col gap-4">
          {comments && comments?.length >= 1
            ? comments?.map((item) => (
                <Comment
                  key={item._id}
                  createdAt={item.createdAt}
                  owner={item.owner}
                  description={item.description}
                />
              ))
            : "No comments to display"}
        </div>
      </div>
      <div className="sideView px-4">side videos</div>
    </div>
  );
};

export default VideoView;
