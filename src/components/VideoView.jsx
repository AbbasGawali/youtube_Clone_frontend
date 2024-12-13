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
  const token = useSelector((store) => store.user.token);

  // like function for video
  const handleLike = async () => {
    if (!user || Object.keys(user).length < 1) {
      return toast.error("Login first");
    }
    try {
      let uId = user._id;
      const { data } = await axios.put(
        `https://youtube-clone-backend-4sfa.onrender.com/api/video/likeVideo/${video}`,
        { uId },
        {
          headers: {
            Authorization: `JWT ${token}`,
          },
        }
      );
      if (data) {
        toast.success("video Liked");
        setVideoData((prev) => ({
          ...prev,
          likes: data.video.likes,
          dislikes: data.video.dislikes,
        }));
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
  };

  // disLike function for video
  const handleDisLike = async () => {
    if (!user || Object.keys(user).length < 1) {
      return toast.error("Login first");
    }

    try {
      let uId = user._id;
      const { data } = await axios.put(
        `https://youtube-clone-backend-4sfa.onrender.com/api/video/disLikeVideo/${video}`,
        { uId },
        {
          headers: {
            Authorization: `JWT ${token}`,
          },
        }
      );
      if (data) {
        toast.success("video Disliked");
        setVideoData((prev) => ({
          ...prev,
          dislikes: data.video.dislikes,
          likes: data.video.likes,
        }));
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
  };

  useEffect(() => {
    // fetch video
    const fetchData = async () => {
      const { data } = await axios.get(
        `https://youtube-clone-backend-4sfa.onrender.com/api/video/${video}`
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

  // fetching channel videos
  const fetchChannelVideos = async (id) => {
    try {
      const { data } = await axios.get(
        `https://youtube-clone-backend-4sfa.onrender.com/api/video/channelVideos/${id}`
      );

      if (data) {
        setChannelVideos(data.videos);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // function to fetch channel data
  const fetchChannelData = async (cId) => {
    const { data } = await axios.get(
      `https://youtube-clone-backend-4sfa.onrender.com/api/channel/${cId}`
    );
    if (data) {
      setChannelData(data.channel);
    }
  };

  // function to fetch video comments
  const fetchVideoComments = async () => {
    const { data } = await axios.get(
      `https://youtube-clone-backend-4sfa.onrender.com/api/comment/videoComments/${video}`
    );

    if (data) {
      setComments(data.comments);
    }
  };

  // trigger function to rerender component
  const triggerCommentFetch = () => {
    setCommentTrigger(!commentTrigger);
  };

  // function to add comment
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
        "https://youtube-clone-backend-4sfa.onrender.com/api/comment/addComment",
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

  // function to subscribe to channel
  const handleSubscribe = async () => {
    if (!user || Object.keys(user).length < 1) {
      return toast.error("Login first");
    }
    try {
      const { data } = await axios.put(
        `https://youtube-clone-backend-4sfa.onrender.com/api/channel/subscribeChannel/${channelData?._id}/${user?._id}`,
        {},
        {
          headers: {
            Authorization: `JWT ${token}`,
          },
        }
      );
      if (data) {
        toast.success("channel subscribed");
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col   mlg:flex-row ">
      <div className="  mlg:w-[60rem]   ">
        <iframe
          className=" w-full h-[30vh] xs:h-[50vh] md:h-[28rem] "
          src={`https://www.youtube.com/embed/${videoUrl}?autoplay=1&rel=0`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          rel="0"
          autoPlay="1"
          allowFullScreen
        ></iframe>
        <div className="operations flex flex-col sm:flex-row gap-2 justify-between   py-4 items-center">
          <div className="flex gap-2 pb-2 sm:pb-0 w-full items-center">
            <Link
              to={`/channel/${channelData?._id}`}
              className="flex items-center gap-2"
            >
              <img
                className="channel cursor-pointer w-12 h-12 rounded-full border border-black"
                src={channelData?.channelLogo}
                alt="Channel name"
              />
              <h2 className="font-bold cursor-pointer">
                {channelData?.channelName}
              </h2>
            </Link>
            <button
              onClick={handleSubscribe}
              className="px-4 py-1 cursor-pointer bg-slate-800 transition-all hover:bg-black text-white   rounded-full"
            >
              subscribe
            </button>
          </div>
          <div className="flex text-[14px] sm:text-[16px] w-full gap-2 items-center  sm:justify-end">
            <button
              onClick={handleLike}
              className="px-4 py-1 bg-slate-200 rounded-full flex items-center gap-2"
            >
              <BiLike />
              <h2>|</h2>
              {videoData?.likes?.length}
            </button>
            <button
              onClick={handleDisLike}
              className="px-4 py-1 bg-slate-200 rounded-full flex items-center gap-2"
            >
              <BiDislike />
              <h2>|</h2>
              {videoData?.dislikes?.length}
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
          <p className="text-[14px] sm:text-[16px]">
            {" "}
            {videoData?.description}
          </p>
        </div>

        <div className="addComment flex flex-col items-end">
          <input
            type="text"
            name="comment"
            onChange={(e) => setcomment(e.target.value)}
            value={comment}
            placeholder="comment here"
            className=" outline-none w-full border-b-2 border-black my-2 p-2 text-[14px] sm:text-[16px]"
          />
          <button
            onClick={handleComment}
            className="  bg-white text-[14px] sm:text-[16px] w-36 p-1 border border-black hover:bg-black hover:text-white transition-all"
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
      <div className="sideView px-4 mlg:w-[40rem]    ">
        <h2 className="text-xl py-4">Channel related videos</h2>
        <div className="flex flex-col gap-4">
          {channelVideos && channelVideos.length >= 1
            ? channelVideos.map((item) => (
                <Link
                  key={item._id}
                  to={`/video/${item._id}`}
                  className="boxVideo flex items-center sm:items-start gap-2  shadow-md rounded-md p-2"
                >
                  <img
                    className="w-16  h-14   sm:h-auto sm:w-44 rounded-md"
                    src={item?.thumbnailUrl}
                    alt="video img"
                  />
                  <div className="details">
                    <h2 className="text-[14px] sm:text-[16px]">
                      {item?.title.length > 55
                        ? item?.title?.slice(0, 55) + "..."
                        : item?.title}
                    </h2>
                    <h2 className="text-[14px] sm:text-[16px]">
                      {channelData?.channelName}
                    </h2>
                    <h2 className="text-[14px] sm:text-[16px]">
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
