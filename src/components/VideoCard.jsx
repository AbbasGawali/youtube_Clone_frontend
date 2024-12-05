import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const VideoCard = ({ videoId, title, thumbnailUrl, channelId }) => {
  const [channelData, setChannelData] = useState([]); 
  useEffect(() => {
    // fetch videos
    const fetchData = async () => {
      const { data } = await axios.get(
        `http://localhost:8000/api/channel/${channelId}`
      ); 
      if (data) {
        setChannelData(data.channel);
      }
    };
    fetchData();
  }, []);
 
  return (
    <div className="video_card w-96">
      <Link to={`/video/${videoId}`}>
        <img
          src={thumbnailUrl}
          alt={title}
          className="box w-96 h-52 border border-black"
        />
      </Link>
      <div className="flex items-center gap-2 ps-2">
        <img
          className="channel w-12 h-12 rounded-full border border-black"
          src={channelData.channelLogo}
          alt="Channel name"
        />
        <div className="description">
          {/* <h2>Video Title is here and you can watch it very easily </h2> */}
          <h2>{title}</h2>
          <Link
            to={`/channel/${channelData?._id}`}
            className="channel_views text-sm text-gray-500"
          >
            {/* <p>Thapa Technical </p> */}
            <p>{channelData?.channelName}</p>
            <p>1.3k views . 2 days ago</p>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default VideoCard;
