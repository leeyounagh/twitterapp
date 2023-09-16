import React from "react";
import { BsHouse } from "react-icons/bs";
import { BiUserCircle } from "react-icons/bi";
import { MdLogout } from "react-icons/md";
import { useNavigate } from "react-router-dom";

function MenuList() {
  const navigate = useNavigate();
  return (
    <div className="footer">
      <div className="footer_grid">
        <button
          type="button"
          onClick={() => {
            navigate("/");
          }}
        >
          <BsHouse />
          Home
        </button>
        <button
          type="button"
          onClick={() => {
            navigate("/profile");
          }}
        >
          <BiUserCircle />
          Profile
        </button>
        <button
          type="button"
          onClick={() => {
            navigate("/");
          }}
        >
          <MdLogout />
          Logout
        </button>
      </div>
    </div>
  );
}

export default MenuList;
