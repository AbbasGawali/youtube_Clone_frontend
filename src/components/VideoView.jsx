import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { BiLike, BiDislike } from "react-icons/bi";
import Comment from "./Comment";
import timeAgo from "../utils/timeAgo";
import formatNumber from "../utils/formatNumber";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const VideoView = () => {
  const params = useParams();
  const video = params.id;
  const [videoData, setVideoData] = useState([]);
  const [comments, setComments] = useState([]);
  const [channelData, setChannelData] = useState([]);
  const [channelVideos, setChannelVideos] = useState([]);

  const [videoUrl, setVideoUrl] = useState("");
  const [comment, setcomment] = useState("");
  const [commentTrigger, setCommentTrigger] = useState(false);
  const user = useSelector((store) => store.user.userDetails);

  console.log(user, "user");
  console.log("video data", videoData);
  useEffect(() => {
    // fetch videos
    const fetchData = async () => {
      const { data } = await axios.get(
        `http://localhost:8000/api/video/${video}`
      );
      if (data) {
        setVideoData(data.video);
        fetchChannelData(data.video.channelId);
        fetchChannelVideos(data.video.channelId);
      }
      if (data?.video?.videoUrl) {
        setVideoUrl(data?.video?.videoUrl.split("v=")[1]);
      }
    };
    fetchData();
  }, [params]);

  useEffect(() => {
    if (videoData) {
      fetchVideoComments();
    }
  }, [videoData, commentTrigger]);

  console.log("channel videos", channelVideos);

  const fetchChannelVideos = async (id) => {
    // console.log(channelData, "channelData");
    try {
      const { data } = await axios.get(
        `http://localhost:8000/api/video/channelVideos/${id}`
      );
      console.log("response data of channel ideos", data);

      if (data) {
        setChannelVideos(data.videos);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchChannelData = async (cId) => {
    const { data } = await axios.get(
      `http://localhost:8000/api/channel/${cId}`
    );
    if (data) {
      setChannelData(data.channel);
    }
  };

  const fetchVideoComments = async () => {
    const { data } = await axios.get(
      `http://localhost:8000/api/comment/videoComments/${video}`
    );

    if (data) {
      setComments(data.comments);
    }
  };

  const triggerCommentFetch = () => {
    setCommentTrigger(!commentTrigger);
  };

  const handleComment = async () => {
    if (comment == "") {
      return toast.error("comment cannot be empty!");
    }
    if (!user || Object.keys(user).length < 1) {
      return toast.error("login required");
    }
    const commentData = {
      video: videoData?._id,
      owner: user?._id,
      description: comment,
    };
    try {
      const data = await axios.post(
        "http://localhost:8000/api/comment/addComment",
        commentData
      );
      if (data) {
        toast.success("comment added");
        fetchVideoComments();
        setcomment("");
      }
    } catch (error) {
      toast.error(error.data.message);
      console.log(error);
    }
  };
  return (
    <div className="flex ">
      <div className=" h-[28rem] w-[60rem] ">
        <iframe
          className=" w-full h-full"
          src={`https://www.youtube.com/embed/${videoUrl}?autoplay=1&rel=0`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          rel="0"
          autoPlay="1"
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
          <div className="flex gap-2 py-2">
            <h2>{formatNumber(videoData?.views)} Views •</h2>
            <h2>{timeAgo(videoData?.createdAt)}</h2>
          </div>
          <p> {videoData?.description}</p>
        </div>

        <div className="addComment flex flex-col items-end">
          <input
            type="text"
            name="comment"
            onChange={(e) => setcomment(e.target.value)}
            value={comment}
            placeholder="comment here"
            className=" outline-none w-full border-b-2 border-black my-2 p-2"
          />
          <button
            onClick={handleComment}
            className="  bg-white w-36 p-1 border border-black hover:bg-black hover:text-white transition-all"
          >
            Comment
          </button>
        </div>

        <div className="comments py-4 flex flex-col gap-4">
          {comments && comments?.length >= 1
            ? comments?.map((item) => (
                <Comment
                  triggerCommentFetch={triggerCommentFetch}
                  video={video}
                  key={item._id}
                  id={item._id}
                  createdAt={item.createdAt}
                  owner={item.owner}
                  description={item.description}
                />
              ))
            : "No comments to display"}
        </div>
      </div>
      <div className="sideView px-4 w-[40rem]">
        <h2 className="text-xl py-4">Channel related videos</h2>
        <div className="flex flex-col gap-4">
          {channelVideos && channelVideos.length >= 1
            ? channelVideos.map((item) => (
                <Link
                  to={`/video/${item._id}`}
                  className="boxVideo flex gap-2  shadow-md rounded-md p-2"
                >
                  <img
                    className="w-44 rounded-md"
                    src={item?.thumbnailUrl}
                    alt="video img"
                  />
                  <div className="details">
                    <h2>
                      {item?.title.length > 55
                        ? item?.title?.slice(0, 55) + "..."
                        : item?.title}
                    </h2>
                    <h2>{channelData?.channelName}</h2>
                    <h2>
                      {formatNumber(item?.views)} • {timeAgo(item?.createdAt)}{" "}
                    </h2>
                  </div>
                </Link>
              ))
            : "No videos related to channel"}
        </div>
      </div>
    </div>
  );
};

export default VideoView;
