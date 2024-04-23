import { useEffect, useState } from "react";
import "./sidebar.css";
import { deleteIssue, fetchIssues, updateIssue } from "../services/apiService";
import { fetchHandlers } from "../services/handlerService";
import { Icon } from "@iconify/react/dist/iconify.js";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const SideBar = ({
  isOpen,
  toggleSidebar,
  selectedDivData,
  refreshSidebarData,
}) => {
  const [selectedOption, setSelectedOption] = useState("");
  const [options, setOptions] = useState([]);
  const [error] = useState(false);

  useEffect(() => {
    fetchHandlers()
      .then((data) => {
        if (data === null) {
          console.log("Data Received Null");
          setOptions([]);
        } else {
          const fetchOptions = data.map((item) => {
            return {
              expertise: item.expertise,
              handlerName: item.name,
            };
          });
          setOptions(fetchOptions);
        }
      })
      .catch((error) => {
        console.error("Error Fetch Handlers ", error);
      });
  }, []);

  const id = selectedDivData?.id;
  const technician = selectedDivData?.technician;

  const handleCloseClick = () => {
    toggleSidebar();
  };

  const handleDeletionButtonClick = () => {
    if (selectedDivData && selectedDivData.id !== null) {
      deleteIssue(selectedDivData.id)
        .then(() => {
          fetchIssues().then(() => {
            refreshSidebarData();
            toggleSidebar();
          });
        })
        .catch((error) => console.error("ERror deleting issue:, error"));
    } else {
      console.log("ID not available");
    }
  };

  const handleTechnicianChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleAssignButtonClick = () => {
    if (selectedOption === "Select Technician") {
      alert("Please select a technician");
    } else {
      // TODO: SEPERATE THE DATES TO A NEW FUNCTION
      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Add leading zero if needed
      const day = String(currentDate.getDate()).padStart(2, "0"); // Add leading zero if needed
      const hours = String(currentDate.getHours()).padStart(2, "0"); // Add leading zero if needed
      const minutes = String(currentDate.getMinutes()).padStart(2, "0"); // Add leading zero if needed
      const seconds = String(currentDate.getSeconds()).padStart(2, "0"); // Add leading zero if needed

      const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;

      updateIssue(selectedDivData.id, selectedOption, formattedDate)
        .then((data) => {
          console.log(
            selectedDivData.id,
            selectedOption,
            formattedDate,
            "Updated"
          );
          refreshSidebarData();
        })
        .catch((error) => {
          console.log("This is the updated Data>> ", error);
        });
    }
  };

  return (
    <div className={`sidebar p-4 text-white ${isOpen ? "" : "d-none"}`}>
      <div className="row justify-content-between">
        <div className="col-10 text-wrap fs-5">{selectedDivData?.subject}</div>

        <div className="col-2 d-flex justify-content-end mb-2">
          <Link to={`/view-issue/${id}`} target="_blank">
            <button className="bg-dark text-ash">
              <Icon
                icon="radix-icons:open-in-new-window"
                width="24"
                height="24"
                color="white"
              />
            </button>
          </Link>
          <button className="bg-dark text-ash ms-2" onClick={handleCloseClick}>
            <Icon
              icon="mingcute:close-fill"
              width="24"
              height="24"
              color="white"
            />
          </button>
        </div>

        <div className="w-20% bg-dark text-white h-50 p-2 rounded-2 shadow text-wrap fs-6 mb-3">
          {selectedDivData?.content}
          {selectedDivData?.imageURL && (
            <img src={selectedDivData.imageURL} alt="" />
          )}
        </div>

        <p>
          Sender: <span className="text-ash">{selectedDivData?.email}</span>
        </p>
        <div className="d-flex flex-column">
          <p>Technician:{technician}</p>
          <label htmlFor="combo">Assign Technician:</label>
          <select
            className="htmlForm-select bg-dark text-white"
            id="combo"
            name="combo"
            value={selectedOption}
            onChange={handleTechnicianChange}
          >
            {options.map((option) => (
              <option key={option.id} value={option.handlerName}>
                <span style={{ fontWeight: "bold" }}>{option.handlerName}</span>{" "}
                <p className="text-secondary">{option.expertise}</p>
              </option>
            ))}
          </select>
        </div>
        {error && (
          <div className="invalid-feedback">Please select a technician</div>
        )}
        <div className="row">
          <div className="col-12 d-flex flex-column justify-content-center">
            <button
              className="btn btn-success btn-block mt-5"
              onClick={handleAssignButtonClick}
            >
              Assign Technician
            </button>
            <button
              className="btn btn-danger btn-block mt-2"
              onClick={handleDeletionButtonClick}
            >
              Delete Issue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

SideBar.propTypes = {
  isOpen: PropTypes.bool,
  toggleSidebar: PropTypes.func,
  selectedDivData: PropTypes.object,
  refreshSidebarData: PropTypes.func,
};

export default SideBar;
