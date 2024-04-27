import React, { useEffect, useState } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import NavigationBar from "../component/NavigationBar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import firebase from "firebase/compat/app";
import bcrypt from "bcryptjs";

function AddHandler() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [imageURL, setImageUrl] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    expertise: "",
    profilePic:
      "https://firebasestorage.googleapis.com/v0/b/issue-tracker-9b307.appspot.com/o/OIP%20(1).jpeg?alt=media&token=751e4769-576a-4ef8-b694-ea6cb88ab855",
  });

  useEffect(() => {
    if (localStorage.getItem("userEmail") === null) {
      return (window.location.href = "/login");
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileUpload = async (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;
    setLoading(true);
    const storageRef = firebase.storage().ref();
    const fileRef = storageRef.child(selectedFile.name);
    try {
      const snapshot = await fileRef.put(selectedFile);
      const url = await snapshot.ref.getDownloadURL();
      setFormData({ ...formData, profilePic: url });
      setImageUrl(url);
      console.log(formData.profilePic);
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Failed to upload file. Please try again.");
    }
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const hashedPassword = await bcrypt.hash(formData.password, 10);
      const updatedFormData = { ...formData, password: hashedPassword };
      setFormData(updatedFormData);

      const response = await axios.post(
        "http://localhost:8080/api/v1/handlers",
        updatedFormData,
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
          <div className="d-flex">
            {loading ? (
              <div className="spinner-border text-primary" role="status">
                {/* Spinner while uploading */}
              </div>
            ) : (
              <img
                src={formData.profilePic}
                className="rounded-circle"
                style={{ width: "100px", height: "100px" }}
                alt="profile"
              />
            )}
          </div>
          <FormGroup>
            <Label for="name" className="text-light">
              Upload image
            </Label>
            <Input
              type="file"
              name="profilePic"
              id="profilePic"
              accept="image/*"
              onChange={handleFileUpload}
            />
          </FormGroup>
          {loading ? <p>uploading</p> : ""}
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
