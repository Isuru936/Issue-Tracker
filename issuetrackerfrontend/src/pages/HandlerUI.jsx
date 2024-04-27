import React, { useEffect, useState } from "react";

function HandlerUI() {
  const [email, setEmail] = useState("");
  useEffect(() => {
    setEmail(localStorage.getItem("userEmail"));
    if (email === null) {
      window.location.href = "/login";
    }
  }, []);
  return <div className="text-white">hello {email}</div>;
}

export default HandlerUI;
