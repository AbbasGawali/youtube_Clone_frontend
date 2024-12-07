import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const UpdateVideoForm = () => {
  const params = useParams("");
  const userChannel = useSelector(
    (store) => store.userChannel.userChannelDetails
  );
  const user = useSelector((store) => store.user.userDetails);
  const jwtToken = useSelector((store) => store.user.token);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    thumbnailUrl: "",
    description: "",
    videoUrl: "",
  });

  useEffect(() => {
    // fetch videos
    const fetchData = async () => {
      const { data } = await axios.get(
        `http://localhost:8000/api/video/${params.id}`
      );

      console.log("data", data.video.uploader);
      if (data.video.uploader !== user._id) {
        navigate("/");
        toast.error("unauthorised access !");
      }
      if (data) {
        setFormData({
          title: data?.video?.title || "",
          thumbnailUrl: data?.video?.thumbnailUrl || "",
          description: data?.video?.description || "",
          videoUrl: data?.video?.videoUrl || "",
        });
      }
    };
    fetchData();
  }, [params]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    // /updateVideo/:id/:cId/:uId
    try {
      let result = await axios.put(
        `http://localhost:8000/api/video/updateVideo/${params.id}/${userChannel?._id}/${user?._id}`,
        formData,
        {
          headers: {
            Authorization: `JWT ${jwtToken}`,
          },
        }
      );
      console.log(result);
      if (result) {
        toast.success("video updated");
        setFormData({
          title: "",
          thumbnailUrl: "",
          description: "",
          videoUrl: "",
        });
        navigate(`/channel/${userChannel?._id}`);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <form
      onSubmit={handleFormSubmit}
      className="updateVideo form flex p-6 flex-col w-2/4 mx-auto  bg-white"
    >
      <h2 className="font-bold text-xl">Edit Video</h2>

      <img
        className="w-44 mx-auto rounded-full"
        src={
          "https://png.pngtree.com/png-vector/20190215/ourmid/pngtree-play-video-icon-graphic-design-template-vector-png-image_530837.jpg"
        }
        alt=""
      />
      <label className="text-slate-800 font-semibold py-4" htmlFor="title">
        Video Title
      </label>
      <input
        className="border p-2 border-slate-400 rounded-sm"
        id="title"
        type="text"
        required
        value={formData.title}
        name="title"
        onChange={handleChange}
      />

      <label
        className="text-slate-800 font-semibold py-4"
        htmlFor="thumbnailUrl"
      >
        Thumbnail Url
      </label>
      <input
        className="border p-2 border-slate-400 rounded-sm"
        id="thumbnailUrl"
        type="url"
        required
        value={formData.thumbnailUrl}
        name="thumbnailUrl"
        onChange={handleChange}
      />

      <label className="text-slate-800 font-semibold py-4" htmlFor="videoUrl">
        Video Url
      </label>
      <input
        className="border p-2 border-slate-400 rounded-sm"
        id="videoUrl"
        type="url"
        required
        value={formData.videoUrl}
        name="videoUrl"
        onChange={handleChange}
      />

      <label
        className="text-slate-800 font-semibold py-4"
        htmlFor="description"
      >
        Video Description
      </label>
      <textarea
        rows={5}
        className="border p-2 border-slate-400 rounded-sm"
        id="description"
        type="text"
        value={formData.description}
        required
        name="description"
        onChange={handleChange}
      />

      <button
        type="submit"
        className="hover:bg-black hover:text-white transition-all text-white rounded-sm border-black bg-slate-800  p-2 my-4"
      >
        Save
      </button>
    </form>
  );
};

export default UpdateVideoForm;
