import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import NavigationBar from "../component/NavigationBar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddHandler() {
  const navigate = useNavigate();
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    expertise: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/handlers",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Handler added successfully:", response.data);
      setShowSuccessMessage(true);
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 3000);
      navigate("/");
    } catch (error) {
      console.log("Error adding handler:", error);
    }
  };

  return (
    <div>
      <NavigationBar />
      <div className="container col-md-6 border p-5 mt-5">
        <h2 className="text-light ">Add Handler</h2>
        {showSuccessMessage && (
          <div className="alert alert-success mt-3">Handler added!</div>
        )}
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="name" className="text-light">
              Name{" "}
            </Label>
            <Input
              type="name"
              name="name"
              id="name"
              placeholder="Enter name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="email" className="text-light">
              Email
            </Label>
            <Input
              type="email"
              name="email"
              id="email"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="password" className="text-light">
              Password
            </Label>
            <Input
              type="password"
              name="password"
              id="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="expertise" className="text-light">
              Expertise
            </Label>
            <Input
              type="select"
              name="expertise"
              id="expertise"
              value={formData.expertise}
              onChange={handleChange}
              required
            >
              <option value="">Select Expertise</option>
              <option value="Developer">Developer</option>
              <option value="Analyst">Analyst</option>
              <option value="UI/UX Designer">UI/UX Designer</option>
              <option value="Database Administrator">
                Database Administrator
              </option>
              <option value="Technical Writer">Technical Writer</option>
            </Input>
          </FormGroup>

          <Button type="submit" color="primary">
            Add Handler
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default AddHandler;
