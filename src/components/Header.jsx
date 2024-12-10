import { IoMdMenu } from "react-icons/io";
import { GoSearch } from "react-icons/go";
import { RiVideoUploadLine } from "react-icons/ri";
import { FaRegBell } from "react-icons/fa6";
import { FaUserCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearToken, clearUserState } from "../utils/userSlice";
import { toast } from "react-toastify";
import { setUserChannelDetails } from "../utils/userChannelSlice";
import axios from "axios";

export default function ({ sideBarToggle, setSideBarToggle }) {
  // const [userChannel, setUserchannel] = useState({});
  const [toggle, setToggle] = useState(false);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const user = useSelector((store) => store.user.userDetails);
  // const userChannel = useSelector((store) => store.user.userChannelDetails);
  const userChannel = useSelector(
    (store) => store.userChannel.userChannelDetails
  );
  console.log("in header, userchannel is this ", userChannel);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user && user?.channel?.length >= 1) {
      const fetchUserChannel = async () => {
        try {
          let { data } = await axios.get(
            `http://localhost:8000/api/channel/${user?.channel[0]}`
          );
          dispatch(setUserChannelDetails(data.channel));
          console.log(data);
        } catch (error) {
          console.log(error);
        }
      };
      fetchUserChannel();
    }
  }, [user]);

  const handleLogout = () => {
    dispatch(clearToken());
    dispatch(clearUserState());
    toast.success("Logout success");
    setToggle(false);
  };

  const handleSideBarToggle = () => {
    setSideBarToggle(!sideBarToggle);
  };
  const handleSearchSubmit = () => {
    if (search.length <= 0) {
      return toast.error("enter something to search");
    }
    navigate(`/search/${search}`);
    setSearch("");
  };

  return (
    <div className="header flex justify-between items-center py-3 px-6 shadow-sm">
      <div className="logo flex items-center gap-2">
        <IoMdMenu size={20} onClick={handleSideBarToggle} />
        <Link to={"/"}>
          <img src="/images/youtubeLogo.png" alt="Youtube" className="w-24" />
        </Link>
      </div>
      <div className="search flex items-center gap-2 relative ">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          placeholder="Search"
          className="border px-4 pr-16 py-1 outline-none  border-gray-200 rounded-full w-[34rem]"
        />
        <button
          type="submit"
          onClick={handleSearchSubmit}
          className="search cursor-pointer bg-gray-200 rounded-r-full h-full flex items-center justify-center w-14 absolute right-0 "
        >
          <GoSearch className=" " size={20} />
        </button>
      </div>
      <div className="userOp flex items-center gap-4 relative">
        {user && Object.keys(user).length > 0 ? (
          <>
            {userChannel && Object.keys(userChannel).length >= 1 ? (
              <>
                <Link to={"/uploadVideo"}>
                  <RiVideoUploadLine size={20} />
                </Link>
              </>
            ) : (
              ""
            )}
            <FaRegBell size={20} />
            {user && Object.keys(user).length >= 1 ? (
              <img
                src={user?.avatar}
                onClick={() => setToggle(!toggle)}
                onError={(e) =>
                  (e.target.src =
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrAe6Juu6QDvA4po0DCjhamerR5HnNsL8GWw&s")
                }
                className="w-8 h-8 cursor-pointer rounded-full border"
                alt="userAvatar"
              />
            ) : (
              <FaUserCircle
                onClick={() => setToggle(!toggle)}
                className="cursor-pointer"
                size={20}
              />
            )}
            {toggle ? (
              <ul className="dropdown absolute right-0 top-12 bg-white border border-gray-200 rounded-lg shadow-lg w-48 z-10">
                <Link
                  to={"/userAccount"}
                  onClick={() => setToggle(false)}
                  className="py-2 px-4 text-sm text-gray-700 w-full block hover:bg-gray-100 cursor-pointer rounded"
                >
                  My Account
                </Link>
                {userChannel && Object.keys(userChannel).length >= 1 ? (
                  <Link
                    onClick={() => setToggle(false)}
                    to={`/channel/${userChannel._id}`}
                    className="py-2 block w-full px-4 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer rounded"
                  >
                    My Channel
                  </Link>
                ) : (
                  <Link
                    onClick={() => setToggle(false)}
                    to={"/createChannel"}
                    className="py-2 block w-full px-4 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer rounded"
                  >
                    Create Channel
                  </Link>
                )}
                <Link
                  onClick={() => setToggle(false)}
                  to={"/"}
                  className="py-2 block w-full px-4 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer rounded"
                >
                  Home
                </Link>
                <li
                  onClick={handleLogout}
                  className="py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer rounded"
                >
                  Logout
                </li>
              </ul>
            ) : (
              ""
            )}
          </>
        ) : (
          <Link
            to="/login"
            className="border p-1 px-4 rounded-full flex items-center gap-2"
          >
            <FaUserCircle size={20} /> login
          </Link>
        )}
      </div>
    </div>
  );
}
