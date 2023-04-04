import React from "react";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Enumeration from "./pages/Enumeration";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/enumeration" element={<Enumeration />} />
      </Routes>
    </Router>
  );
}

export default App;
