import React from "react";
import { Route, Routes } from "react-router-dom";
import CreateProfile from "../../posts/components/forms/CreateProfile";
import AddExp from "../../posts/components/forms/AddExp";
import AddEdu from "../../posts/components/forms/AddEdu";

const ProfileRouter = () => {
  return (
    <>
      <Routes>
        <Route path="/create-profile" element={<CreateProfile />} />
        <Route path="/edit-profile" element={<CreateProfile />} />
        <Route path="/education" element={<AddEdu />}></Route>
        <Route path="/experience" element={<AddExp />}></Route>
      </Routes>
    </>
  );
};

export default ProfileRouter;
