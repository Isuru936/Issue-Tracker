import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, BrowserRouter, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import AddIssue from "./pages/AddIssue.jsx";
import SideBar from "./component/SideBar.jsx";
import AddHandler from "./pages/AddHandler.jsx";
import ViewIssue from "./pages/ViewIssue.jsx";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add-issue" element={<AddIssue />} />
          <Route path="/sidebar" element={<SideBar />} />
          <Route path="/add-handler" element={<AddHandler />} />
          <Route path="/view-issue" element={<ViewIssue />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
