import React, { useEffect } from "react";
import DashboardAction from "./DashboardAction";
import ExpDetails from "./ExpDetails";
import EduDetails from "./EduDetails";
import {
  deleteEducationAction,
  deleteExperienceAction,
} from "../../profiles/redux/actions/profile.action";
import { getCurrentProfileAction } from "../../profiles/redux/actions/profile.action";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
const Dashboard = () => {
  //useEffect
  //dispatch
  const handleDeleteEdu = (id) => {
    dispatch(deleteEducationAction(id));
  };

  const handleDeleteExp = (id) => {
    dispatch(deleteExperienceAction(id));
  };

  const dispatch = useDispatch();
  //selector=>used to get the data from store
  //to get profile data from store and get it here we use const {profile,error}=useSelector((state)=>state.profile)
  //when u will register the user/1st time login the user => do u have profile? no if we access /api/profile => it will return error
  const { profile, loading } = useSelector((state) => state.profile);
  // useEffect(() => {
  //   //to call the action
  //   //then according to the response we will show the create profile or dashboard with details
  //   dispatch(getCurrentProfileAction());
  // }, []); // no dependency coz we want to call it only once when component loads
  useEffect(() => {
    dispatch(getCurrentProfileAction());
  }, [dispatch]);
  if (loading || !profile) {
    return <div>Loading...</div>;
  }

  const renderDashboard = (
    <section class="container">
      <h1 class="large text-primary">Dashboard</h1>
      <p class="lead">
        <i class="fas fa-user"></i> Welcome John Doe
      </p>
      <DashboardAction />

      <h2 class="my-2">Education Credentials</h2>

      <EduDetails education={profile.education} onDelete={handleDeleteEdu} />
      <ExpDetails experience={profile.experience} onDelete={handleDeleteExp} />

      <div class="my-2">
        <button class="btn btn-danger">
          <i class="fas fa-user-minus"></i>
          Delete My Account
        </button>
      </div>
    </section>
  );
  const createProfile = (
    <section className="container">
      <h2 className="my-2">Dashboard</h2>
      <p>You haven’t created a profile yet.</p>
      <Link to="/profile/create-profile" className="btn btn-primary">
        Create Profile
      </Link>
    </section>
  );
  return (
    <>{profile == null ? createProfile : renderDashboard}</>
    /**
    if i will write the conditions here , would be difficult to trace them */
    //can also use profile==null instead of error!=null
  );
};

export default Dashboard;
