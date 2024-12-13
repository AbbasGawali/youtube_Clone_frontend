import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { setUserState } from "../utils/userSlice";

const CreateChannel = () => {
  const dispatch = useDispatch();
  const userChannel = useSelector(
    (store) => store.userChannel.userChannelDetails
  );

  const user = useSelector((store) => store.user.userDetails);
  const jwtToken = useSelector((store) => store.user.token);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    channelLogo: "",
    channelName: "",
    description: "",
    channelBanner: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    let channelData = { ...formData, owner: user?._id };
    try {
      let result = await axios.post(
        "https://youtube-clone-backend-4sfa.onrender.com/api/channel/createChannel",
        channelData,
        {
          headers: {
            Authorization: `JWT ${jwtToken}`,
          },
        }
      );
      if (result) {
        toast.success("channel created");
        fetchCurrentUser();
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  };

  const fetchCurrentUser = async () => {
    try {
      let { data } = await axios.get(
        `https://youtube-clone-backend-4sfa.onrender.com/api/users/${user?._id}`
      );

      if (data) {
        dispatch(setUserState(data?.user));
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    if (userChannel && Object.keys(userChannel).length >= 1) {
      navigate("/");
    }
  }, []);

  return (
    <div className="bg-slate-50 min-h-full py-32">
      <form
        onSubmit={handleFormSubmit}
        className="form flex xs:p-6 flex-col w-[90%] xs:w-4/5 sm:w-2/4 mx-auto   bg-white"
      >
        <h2 className="font-bold text-xl">How you will appear</h2>

        <img
          className="w-44 mx-auto rounded-full"
          src={
            formData?.channelLogo ||
            "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI="
          }
          alt="channelLogo"
        />
        <label
          className="text-slate-800 font-semibold py-4"
          htmlFor="channelName"
        >
          Channel Name
        </label>
        <input
          className="border p-1  xs:p-2 border-slate-400 rounded-sm"
          id="channelName"
          type="text"
          required
          value={formData.channelName}
          name="channelName"
          onChange={handleChange}
        />

        <label
          className="text-slate-800 font-semibold py-4"
          htmlFor="channelLogo"
        >
          Channel Logo
        </label>
        <input
          className="border p-1  xs:p-2 border-slate-400 rounded-sm"
          id="channelLogo"
          type="url"
          required
          value={formData.channelLogo}
          name="channelLogo"
          onChange={handleChange}
        />

        <label
          className="text-slate-800 font-semibold py-4"
          htmlFor="channelBanner"
        >
          Channel Banner
        </label>
        <input
          className="border p-1  xs:p-2 border-slate-400 rounded-sm"
          id="channelBanner"
          type="url"
          required
          value={formData.channelBanner}
          name="channelBanner"
          onChange={handleChange}
        />

        <label
          className="text-slate-800 font-semibold py-4"
          htmlFor="description"
        >
          Channel Description
        </label>
        <input
          className="border p-1  xs:p-2 border-slate-400 rounded-sm"
          id="description"
          type="text"
          value={formData.description}
          required
          name="description"
          onChange={handleChange}
        />

        <button
          type="submit"
          className="hover:bg-black hover:text-white transition-all text-white rounded-sm border-black bg-slate-800  p-1  xs:p-2 my-4"
        >
          Create Channel
        </button>
      </form>
    </div>
  );
};

export default CreateChannel;
