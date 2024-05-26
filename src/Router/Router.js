import React from "react";
import { Route, Routes } from "react-router-dom";
import Tabata from "../Pages/Tabata";
import Rounds from "../Pages/Rounds";
import Stopwatch from "../Pages/Stopwatch";
import ErrorPage from "../Pages/ErrorPage";

function Router() {
  return (
    <Routes>
      <Route path="/" exact element={<Tabata />} />
      <Route path="/rounds" exact element={<Rounds />} />
      <Route path="/stopwatch" exact element={<Stopwatch />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}

export default Router;
