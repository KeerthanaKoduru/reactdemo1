import React from "react";
import { Routes, Route } from "react-router-dom";
import Landing from "./core/components/layout/Landing";
import AuthRouter from "./auth/router/AuthRouter";
import DashboardRouter from "./dashboard/router/DashboardRouter";
import ProfileRouter from "./profiles/router/ProfileRouter";
import Posts from "./dashboard/components/Posts";
import PostDetail from "./posts/components/pages/PostDetail";
const RootRouter = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />}></Route>
        <Route path="/auth/*" element={<AuthRouter />}></Route>
        <Route path="/dashboard/*" element={<DashboardRouter />}></Route>
        <Route path="/profile/*" element={<ProfileRouter />}></Route>
        <Route path="/posts" element={<Posts />}></Route>
        <Route path="/post/:id" element={<PostDetail />} />
      </Routes>
    </>
  );
};

export default RootRouter;
