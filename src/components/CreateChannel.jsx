import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CreateChannel = () => {
  const userChannel = useSelector((store) => store.user.userChannelDetails);

  const navigate = useNavigate();
  useEffect(() => {
    if (userChannel && Object.keys(userChannel).length >= 1) {
      navigate("/");
    }
  }, []);
  return <div>CreateChannel</div>;
};

export default CreateChannel;
