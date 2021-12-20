import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import BasicGraph from "../components/basicGraph/BasicGraph";

const UserRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<BasicGraph />} />
      </Routes>
    </BrowserRouter>
  );
};

export default UserRouter;
