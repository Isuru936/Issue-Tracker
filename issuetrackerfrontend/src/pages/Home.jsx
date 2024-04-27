import React, { useEffect, useState } from "react";
import SideBar from "../component/SideBar";
import "../component/sidebar.css";
import NavigationBar from "../component/NavigationBar";
import { fetchIssues } from "../services/apiService";
import Toolbar from "../component/Toolbar";
import { Icon } from "@iconify/react/dist/iconify.js";
import AOS from "aos";
import "aos/dist/aos.css";

function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedDivData, setSelectedDivData] = useState(null);
  const [issues, setIssues] = useState([]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleDivClick = (data) => {
    setSelectedDivData(data);
    setSidebarOpen(true);
  };

  const refreshSidebarData = () => {
    fetchIssues()
      .then((data) => setIssues(data))
      .catch((error) => console.error("Error fetching issues: ", error));
  };

  useEffect(() => {
    if (localStorage.getItem("userEmail") === null) {
      return (window.location.href = "/login");
    }
    AOS.init();
    fetchIssues()
      .then((data) => setIssues(data))
      .catch((error) => console.error("Error fetching issues: ", error));
  }, []);

  useEffect(() => {
    if (sidebarOpen) {
      AOS.refresh();
    }
  }, [sidebarOpen]);

  return (
    <div>
      <div>
        <NavigationBar hideSearch={false} />
        <Toolbar />
      </div>
      <div>{console.log(issues)}</div>
      <div>
        <div className="container-fluid bg-dark">
          <div className="row ">
            <div className="">
              {/* Main content goes here */}
              <div className="d-flex flex-column  fs-5 ">
                <div className="p-2 flex-fill p-3 bg-dark">
                  {issues.map((data, index) => (
                    <div
                      key={index}
                      className={`d-flex flex-column p-1 border rounded-4 mb-3 bg-light shadow ${
                        sidebarOpen ? "w-75" : "w-100"
                      }`}
                      style={{ animationDelay: `${index * 100}ms` }} // Apply delay based on index
                      onClick={() =>
                        handleDivClick({
                          id: data.id,
                          subject: data.subject,
                          content: data.description,
                          email: data.email,
                        })
                      }
                      data-aos={sidebarOpen ? "" : "fade-left"} // Disable AOS animation when sidebar is open
                    >
                      <div className="d-flex flex-row pb-1 border-bottom ">
                        <div
                          className="pt-1 mr-5 pt-3 fw-light text-center"
                          style={{ width: "150px" }}
                        >
                          <div>#{data.id}</div>
                          {data.status === 0 && (
                            <div className="bg-danger fw-bold text-white">
                              New
                            </div>
                          )}
                          {data.status === 1 && (
                            <div className="bg-warning fw-bold text-white">
                              Assigned
                            </div>
                          )}
                          {data.status === 2 && (
                            <div className="bg-success fw-bold text-white">
                              Completed
                            </div>
                          )}
                        </div>
                        <div className="p-1 mr-2">
                          <div className="fs-2">{data.subject}</div>
                          <div className="fs-6 fw-light">
                            {data.description}
                          </div>
                        </div>
                        <div className="ms-auto me-3">
                          {data.imageURL ? (
                            <Icon
                              icon="carbon:document-attachment"
                              width="24"
                              height="24"
                              color="blue"
                            />
                          ) : (
                            ""
                          )}
                        </div>
                      </div>

                      <div className="d-flex justify-content-evenly fw-light fs-6 pt-3">
                        <div className="border-right">
                          <p>Assignee</p>
                          <p className="fw-semibold">{data.email}</p>
                        </div>
                        <div className="border-right">
                          <p>Created Date</p>
                          <div className="fw-semibold">
                            <p>
                              {" "}
                              {data.issueCreated.split("T")[0]}{" "}
                              {data.issueCreated.split("T")[1]}
                            </p>
                          </div>
                        </div>

                        <div className="border-right">
                          <p>Assigned to</p>
                          <div className="border-right text-center fw-semibold">
                            {data.issueAssigned !== null
                              ? data.technician
                              : "Not Assigned"}
                          </div>
                        </div>
                        <div className="border-right">
                          <p>Assigned date</p>
                          <div className="border-right fw-semibold text-center">
                            {data.issueAssigned !== null ? (
                              <div>
                                <p>
                                  {data.issueAssigned.split("T")[0]}{" "}
                                  {data.issueAssigned.split("T")[1]}
                                </p>
                              </div>
                            ) : (
                              "-"
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="">
              <div className={`wrapper ${sidebarOpen ? "sidebar-open" : ""}`}>
                <SideBar
                  isOpen={sidebarOpen}
                  toggleSidebar={toggleSidebar}
                  selectedDivData={selectedDivData}
                  refreshSidebarData={refreshSidebarData}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
