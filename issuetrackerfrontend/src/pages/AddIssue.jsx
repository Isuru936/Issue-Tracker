import { useEffect, useState } from "react";
import "../component/addIssue.css";
import NavigationBar from "../component/NavigationBar";
import axios from "axios";
import firebase from "firebase/compat/app";
import "firebase/compat/storage";

function AddIssue() {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  const [formData, setFormData] = useState({
    email: "email",
    subject: "subject",
    description: "description",
    imageURL: "",
  });

  useEffect(() => {
    if (localStorage.getItem("userEmail") === null) {
      return (window.location.href = "/login");
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(formData);
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
      setFormData({ ...formData, imageURL: url });
      setImageUrl(url);
      console.log(formData.imageURL);
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Failed to upload file. Please try again.");
    }
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Add leading zero if needed
    const day = String(currentDate.getDate()).padStart(2, "0"); // Add leading zero if needed
    const hours = String(currentDate.getHours()).padStart(2, "0"); // Add leading zero if needed
    const minutes = String(currentDate.getMinutes()).padStart(2, "0"); // Add leading zero if needed
    const seconds = String(currentDate.getSeconds()).padStart(2, "0"); // Add leading zero if needed

    const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;

    const dataWithTimeStamp = {
      ...formData,
      issueCreated: formattedDate,
    };

    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/issue",
        dataWithTimeStamp,
        {
          headers: {
            "Content-Type": "application/json", // Ensure that the Content-Type header is set to JSON
          },
        }
      );
      console.log("Issue submitted successfully:", response.data);
      console.log(imageUrl);
      setShowSuccessMessage(true);
      alert("Issue submitted successfully");
      window.location.href = "/";
    } catch (error) {
      console.log("error:>> ", error);
    }
  };
  return (
    <div>
      {showSuccessMessage && (
        <div className="alert alert-success"> Issue Notified </div>
      )}
      <NavigationBar hideSearch={true} />
      <div className="container d-flex justify-content-center align-items-center vh80 ">
        <div className="row justify-content-center">
          <div className="col-md-8" style={{ width: "650px" }}>
            <div className="card shadow-sm p-5 bg-dark-subtle">
              <h1 className="text-center mb-5">Add Issue</h1>
              <form onSubmit={handleSubmit}>
                <div className="form-group mb-4">
                  <label htmlFor="email" className="form-label fs-5">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    onChange={handleChange}
                    className="form-control rounded-3"
                    id="email"
                    placeholder="example@domain.com"
                    value={formData.email === "email" ? "" : formData.email}
                  />
                </div>
                <div className="form-group mb-4">
                  <label htmlFor="subject" className="form-label fs-5">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    required
                    value={
                      formData.subject === "subject" ? "" : formData.subject
                    }
                    onChange={handleChange}
                    className="form-control rounded-3"
                    id="subject"
                    placeholder="Example: Error Controling Issue"
                  />
                </div>
                <div className="form-group mb-4">
                  <label htmlFor="description" className="form-label fs-5">
                    Describe Your Problem
                  </label>
                  <textarea
                    name="description"
                    className="form-control rounded-3"
                    id="description"
                    rows="6"
                    required
                    value={
                      formData.description === "description"
                        ? ""
                        : formData.description
                    }
                    onChange={handleChange}
                    placeholder="Example:Description of your Issue"
                  />
                </div>
                <div className="form-group mb-4">
                  <label htmlFor="imageUploads" className="form-label fs-5">
                    Add Screenshots
                  </label>
                  {loading ? <p className="spinner-loader">Loading...</p> : ""}
                  <input
                    type="file"
                    name="imageUrl"
                    className="form-control rounded-3"
                    id="imageUrl"
                    onChange={handleFileUpload}
                    accept="image/*"
                  />
                  <div className="mt-2">
                    <img
                      src={imageUrl}
                      className="img-thumbnail mr-2"
                      alt="issue Screenshot"
                    />
                  </div>
                </div>

                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddIssue;
