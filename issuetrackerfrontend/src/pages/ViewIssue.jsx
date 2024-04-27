import React, { useEffect, useState } from "react";
import NavigationBar from "../component/NavigationBar";
import { useParams } from "react-router-dom";
import { deleteIssue, fetchIssue, updateIssue } from "../services/apiService";
import { fetchHandlers } from "../services/handlerService";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

function ViewIssue() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [issue, setIssue] = useState({});
  const [handlers, setHandlers] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");

  useEffect(() => {
    if (localStorage.getItem("userEmail") === null) {
      return (window.location.href = "/login");
    }
    AOS.init();
    fetchIssue(id)
      .then((data) => {
        setIssue(data);
        setSelectedOption(data.technician);
        console.log(selectedOption);
      })
      .catch((error) => console.error("Error fetching issue: ", error));

    fetchHandlers()
      .then((data) => {
        setHandlers(data);
        console.log("HAdnlers", data);
      })
      .catch((error) => console.error("Error fetching handlers: ", error));
  }, [id]);

  useEffect(() => {
    console.log(selectedOption); // Log the updated value inside useEffect
  }, [selectedOption]); // Run this effect whenever selectedOption changes

  const handleTechnicianChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleDeletionButtonClick = () => {
    deleteIssue(id)
      .then(() => {
        navigate("/");
      })
      .catch((error) => console.error("ERror deleting issue:, error"));
  };

  const handleAssignButtonClick = () => {
    if (selectedOption === "Select Technician") {
      alert("Please select a technician");
    } else {
      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Add leading zero if needed
      const day = String(currentDate.getDate()).padStart(2, "0"); // Add leading zero if needed
      const hours = String(currentDate.getHours()).padStart(2, "0"); // Add leading zero if needed
      const minutes = String(currentDate.getMinutes()).padStart(2, "0"); // Add leading zero if needed
      const seconds = String(currentDate.getSeconds()).padStart(2, "0"); // Add leading zero if needed

      const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;

      updateIssue(id, selectedOption, formattedDate)
        .then((data) => {
          fetchIssue(id)
            .then((data) => {
              setIssue(data);
              setSelectedOption(data.technician);
              console.log(selectedOption);
            })
            .catch((error) => console.error("Error fetching issue: ", error));

          console.log(id, selectedOption, formattedDate, "Updated");
        })
        .catch((error) => {
          console.log("This is the updated Data>> ", error);
        });
    }
  };

  return (
    <>
      <NavigationBar />
      <div className="text-white p-3">
        <div className="d-flex justify-content-between">
          <h1>
            #{id} {issue.subject}
          </h1>
          <hr />
          <div>
            <p>
              Assigned to:{" "}
              {issue.technician === null
                ? "Not assigned yet"
                : issue.technician}
            </p>
          </div>
        </div>
        <div className="d-flex ">
          <div className="text-break flex-fill me-2">
            <hr />
            {issue.description}
            <hr />
            <p className="text-light">
              sender: {issue.email} <strong>ON</strong> {issue.issueCreated}
            </p>
            <p className="text-light">
              Assigned On:{" "}
              {issue.technician === null
                ? "Not assigned yet"
                : issue.issueAssigned}
            </p>
          </div>
          <div className="">
            <img src={issue.imageURL} style={{ width: "600px" }} alt="" />
          </div>
        </div>
        <hr />
        <div className="">
          <h2>Manage Issue</h2>
          <div className="d-inline-flex flex-column">
            <div>
              <label htmlFor="combo">Assign Technician:</label>
              <select
                className="htmlForm-select bg-dark ms-3 mb-2 text-white"
                id="combo"
                name="combo"
                value={selectedOption}
                onChange={(e) => handleTechnicianChange(e)}
              >
                {handlers.map((handler) => (
                  <option key={handler.id} value={handler.name}>
                    {handler.name} - {handler.expertise}
                  </option>
                ))}
              </select>
            </div>
            {/* <div className=" justify-content-evenly"> */}
            <button
              className="btn btn-primary"
              onClick={handleAssignButtonClick}
            >
              Assign
            </button>
            <button
              className="btn btn-danger mt-2"
              onClick={handleDeletionButtonClick}
            >
              Delete
            </button>
          </div>
          {/* </div> */}
        </div>
      </div>
    </>
  );
}

export default ViewIssue;
