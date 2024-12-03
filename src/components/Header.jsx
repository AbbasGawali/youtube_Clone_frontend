import { IoMdMenu } from "react-icons/io";
import { GoSearch } from "react-icons/go";
import { RiVideoUploadLine } from "react-icons/ri";
import { FaRegBell } from "react-icons/fa6";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function ({ sideBarToggle, setSideBarToggle }) {
  const handleSideBarToggle = () => {
    console.log(sideBarToggle);
    setSideBarToggle(!sideBarToggle);
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

        <Link to="/login" className="border p-1 px-4 rounded-full flex items-center gap-2"><FaUserCircle size={20} /> login</Link> 
        
{/*         
        <RiVideoUploadLine size={20} />
        <FaRegBell size={20} />
        <FaUserCircle size={20} /> */}
      </div>
    </div>
  );
}
