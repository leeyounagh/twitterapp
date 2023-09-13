import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<h1>홈페이지</h1>} />
    </Routes>
  );
}

export default App;
