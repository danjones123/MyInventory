import React from "react";
import {
  useNavigate,
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
} from "react-router-dom";
import "./App.css";
import AddBoxForm from "./pages/AddBoxForm";
import ViewBoxes from "./pages/ViewBoxes";
// import { useNavigate } from "react-router-dom";

function App() {
  // const nav = useNavigate();
  return (
    <Router>
      <div className="app">
        <h1>Box Manager</h1>
        <div className="box-container">
          <div className="box">
            <Link to="/add-box">
              <h2>Add New Box</h2>
            </Link>
          </div>
          <div className="box">
            <Link to="/view-box">
              <h2>View All Boxes</h2>
            </Link>
          </div>
        </div>

        <Routes>
          <Route path="/add-box" element={<AddBoxForm />} />
          <Route path="/view-box" element={<ViewBoxes />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
