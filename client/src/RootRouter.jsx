import React from "react";
import { Routes, Route } from "react-router-dom";
import Landing from "./core/components/layout/Landing";
import AuthRouter from "./auth/router/AuthRouter";
import DashboardRouter from "./dashboard/router/DashboardRouter";
const RootRouter = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />}></Route>
        <Route path="/auth/*" element={<AuthRouter />}></Route>
        <Route path="/dashboard/*" element={<DashboardRouter />}></Route>
      </Routes>
    </>
  );
};

export default RootRouter;
