import React from "react";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Enumeration from "./pages/Enumeration";
import Detail from "./pages/Detail";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/enumeration" element={<Enumeration />} />
        <Route path="/detail/:subdomain" element={<Detail />} />
      </Routes>
    </Router>
  );
}

export default App;
