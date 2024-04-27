import React, { useState, useEffect } from "react";
import { Card, CardBody, CardTitle, CardSubtitle } from "reactstrap";
import NavigationBar from "../component/NavigationBar";
import axios from "axios";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

function ViewHandlers() {
  const [handlers, setHandlers] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("userEmail") === null) {
      return (window.location.href = "/login");
    }
    AOS.init();
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/v1/handlers");
      setHandlers(response.data);
    } catch (error) {
      console.log("Error fetching handlers:", error);
    }
  };

  return (
    <div>
      <NavigationBar />
      <div className="container mt-5">
        <h2 className="text-light mb-4">Our Team</h2>
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {handlers.map((handler) => (
            <div key={handler.id} className="col">
              <Card className="h-100" data-aos="fade-up">
                <CardBody className="d-flex flex-column justify-content-center align-items-center">
                  <img
                    src={handler.profilePic}
                    className="rounded-circle mb-3"
                    style={{ width: "170px", height: "170px" }}
                    alt=""
                  />

                  <CardTitle tag="h5">{handler.name}</CardTitle>
                  <CardSubtitle tag="h6" className="mb-2 text-muted">
                    {handler.expertise}
                  </CardSubtitle>
                </CardBody>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ViewHandlers;
