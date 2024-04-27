import React, { useState } from "react";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ usernameOrEmail: username, password: password }),
      });
      if (!response.ok) {
        throw new Error("Authentication failed");
      }
      localStorage.setItem("userEmail", username);
      window.location.href = "/";
      console.log("successful");
    } catch (error) {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center text-white">
        <div className="col-md-6">
          <h2 className="mb-4">Login</h2>
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label htmlFor="usernameOrEmail" className="form-label">
                Username or Email:
              </label>
              <input
                type="text"
                className="form-control text-black"
                id="usernameOrEmail"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password:
              </label>
              <input
                type="password"
                className="form-control text-black"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </form>
          {error && <p className="text-danger mt-3">{error}</p>}
        </div>
      </div>
    </div>
  );
}

export default Login;
