import React from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import Dashboard from "../Pages/Dashboard";
import Details from "../Pages/Details";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Dashboard />} />
        <Route index element={<Details />} />
        <Route />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
