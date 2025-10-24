import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMatch, useNavigate } from "react-router-dom";
import { addEducationAction } from "../../../profiles/redux/actions/profile.action";

const emptyForm = {
  school: "",
  degree: "",
  fieldofstudy: "",
  from: "",
  to: "",
  current: false,
  description: "",
};
const AddEdu = () => {
  const isCreate = Boolean(useMatch("/profile/education"));
  const [formState, setFormState] = useState(emptyForm);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { profile, error } = useSelector((state) => state.profile);
  const { school, degree, fieldofstudy, from, to, current, description } =
    formState;

  const onChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    console.log(formState);
    dispatch(addEducationAction(formState, navigate)).unwrap();
    navigate("/dashboard");
  };

  return (
    <>
      <section class="container">
        <h1 class="large text-primary">Add Your Education</h1>
        <p class="lead">
          <i class="fas fa-graduation-cap"></i> Add any school, bootcamp, etc
          that you have attended
        </p>
        <small>* = required field</small>
        <form class="form" onSubmit={onSubmit}>
          <div class="form-group">
            <input
              type="text"
              placeholder="* School or Bootcamp"
              name="school"
              value={school}
              onChange={onChange}
              required
            />
          </div>
          <div class="form-group">
            <input
              type="text"
              placeholder="* Degree or Certificate"
              name="degree"
              value={degree}
              onChange={onChange}
              required
            />
          </div>
          <div class="form-group">
            <input
              type="text"
              placeholder="Field Of Study"
              name="fieldofstudy"
              value={fieldofstudy}
              onChange={onChange}
            />
          </div>
          <div class="form-group">
            <h4>From Date</h4>
            <input type="date" name="from" value={from} onChange={onChange} />
          </div>
          <div class="form-group">
            <p>
              <input
                type="checkbox"
                name="current"
                value={current}
                onChange={() =>
                  setFormState({ ...formState, current: !current })
                }
              />
              Current School or Bootcamp
            </p>
          </div>
          <div class="form-group">
            <h4>To Date</h4>
            <input
              type="date"
              name="to"
              value={to}
              onChange={onChange}
              disabled={current}
            />
          </div>
          <div class="form-group">
            <textarea
              name="description"
              cols="30"
              rows="5"
              placeholder="Program Description"
            ></textarea>
          </div>
          <input type="submit" class="btn btn-primary my-1" />
          <a class="btn btn-light my-1" href="dashboard.html">
            Go Back
          </a>
        </form>
      </section>
    </>
  );
};

export default AddEdu;
