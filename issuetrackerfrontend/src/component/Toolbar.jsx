import React, { useState } from "react";
import { Icon } from "@iconify/react";
import plusCircle from "@iconify/icons-ion/ios-add-circle";
import userPlus from "@iconify/icons-ion/person-add";
import refreshIcon from "@iconify/icons-ion/refresh";
import userList from "@iconify/icons-ion/list";
import { Link } from "react-router-dom";

function Toolbar() {
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const toggleSearchVisibility = () => {
    setIsSearchVisible(!isSearchVisible);
  };

  return (
    <div className="d-flex gap-4 ml-3 m-3 mt-0 mb-0 ">
      <Link to="/add-issue" className="text-decoration-none text-white ">
        <div className="p-2 rounded hover-bg-dark hover-text-dark">
          <Icon icon={plusCircle} /> Add Issue
        </div>
      </Link>
      <Link to="/add-handler" className="text-decoration-none text-white">
        <div className="p-2 rounded hover-bg-dark hover-text-dark">
          <Icon icon={userPlus} /> Add Handler
        </div>
      </Link>
      <Link to="/" className="text-decoration-none">
        <div className="p-2 rounded text-white hover-text-black hover-bg-dark hover-text-dark">
          <Icon icon={refreshIcon} /> Refresh
        </div>
      </Link>
      <Link to="" className="text-decoration-none text-white">
        <div className="p-2 rounded hover-bg-dark hover-text-dark">
          <Icon icon={userList} /> View Handlers
        </div>
      </Link>
    </div>
  );
}

export default Toolbar;
