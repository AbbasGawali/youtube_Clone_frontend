import { IoMdMenu } from "react-icons/io";
import { GoSearch } from "react-icons/go";
import { RiVideoUploadLine } from "react-icons/ri";
import { FaRegBell } from "react-icons/fa6";
import { FaUserCircle } from "react-icons/fa";

export default function () {
  return (
    <div className="header flex justify-between items-center py-3 px-6">
      <div className="logo flex items-center gap-2">
        <IoMdMenu size={20} />
        <img src="/images/youtubeLogo.png" alt="Youtube" className="w-24" />
      </div>
      <div className="search flex items-center gap-2 relative ">
        {" "}
        <input
          type="text"
          placeholder="Search"
          className="border px-4 pr-16 py-1 outline-none  border-gray-200 rounded-full w-[34rem]"
        />
        <div className="search bg-gray-200 rounded-r-full h-full flex items-center justify-center w-14 absolute right-0 ">
          <GoSearch className=" " size={20} />
        </div>
      </div>
      <div className="userOp flex gap-4">
        <RiVideoUploadLine size={20} />
        <FaRegBell size={20} />
        <FaUserCircle size={20} />
      </div>
    </div>
  );
}
