import axios from "axios";
import React, { useEffect, useState } from "react";
import VideoCard from "./VideoCard";
import { useSelector } from "react-redux";
import Loader from "./Loader";

const Home = () => {
  const [videos, setvideos] = useState([]);
  const [filteredData, setFilteredData] = useState(videos);
  const [loading, setLoading] = useState(false);

  const categories = [
    "All",
    "Songs",
    "Movies",
    "Education",
    "Infotainment",
    "Food",
    "Fashion",
    "Vlog",
    "Finance",
    "Gaming",
  ];

  const userChannel = useSelector(
    (store) => store.userChannel.userChannelDetails
  );

  useEffect(() => {
    // fetch videos
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(
          "https://youtube-clone-backend-4sfa.onrender.com/api/video/"
        );
        if (data) {
          setvideos(data.videos);
          setFilteredData(data.videos);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // filtering video based on category
  const handleFilter = (filteredItem) => {
    if (filteredItem == "All") {
      setFilteredData(videos);
    } else {
      setFilteredData(
        videos.filter(
          (item) => item.category.toLowerCase() === filteredItem.toLowerCase()
        )
      );
    }
  };

  return (
    <>
      {/*  Category  */}
      <div className="category flex gap-4 py-2 w-full overflow-x-scroll scrollbar-hide   ">
        {categories?.map((item) => (
          <span
            onClick={() => handleFilter(item)}
            key={item}
            className="shadow-md bg-slate-100 hover:bg-slate-300 cursor-pointer px-5 py-1 rounded-md  "
          >
            {item}
          </span>
        ))}
      </div>

      <div className="flex flex-wrap gap-8 my-2">
        {/* video card  */}

        {loading ? (
          <Loader />
        ) : (
          <>
            {filteredData && filteredData.length >= 1 ? (
              filteredData.map((item) => (
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
          </>
        )}
      </div>
    </>
  );
};

export default Home;
