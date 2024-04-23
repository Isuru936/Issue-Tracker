import React from "react";
import NavigationBar from "../component/NavigationBar";

function ViewIssue() {
  return (
    <>
      <NavigationBar />
      <div className="text-white p-3">
        <div className="d-flex justify-content-between">
          <h1>#2 Issue Heading</h1>
          <hr />
          <div>
            <p>Assigned to: Isuru</p>
          </div>
        </div>
        <div className="d-flex ">
          <div className=" text-break flex-fill">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sequi
            voluptas cupiditate suscipit quo harum quasi! Vel nam harum soluta
            voluptate, facere corporis? Commodi accusantium ab laboriosam optio
            voluptatum, voluptas sit?
          </div>
          <div className="flex-md-fill">imagesd</div>
        </div>
      </div>
    </>
  );
}

export default ViewIssue;
