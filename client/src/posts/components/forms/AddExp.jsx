import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useMatch } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
import { addExperienceAction } from "../../../profiles/redux/actions/profile.action";
const emptyForm = {
  title: "",
  company: "",
  location: "",
  from: "",
  to: "",
  current: false,
  description: "",
};
const AddExp = () => {
  const isCreate = Boolean(useMatch("/profile/experience"));
  const [formState, setFormState] = useState(emptyForm);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { profile, error } = useSelector((state) => state.profile);
  const { title, company, location, from, to, current, description } =
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
    dispatch(addExperienceAction(formState, navigate)).unwrap();
    navigate("/dashboard");
  };
  return (
    <>
      <section class="container">
        <h1 class="large text-primary">Add An Experience</h1>
        <p class="lead">
          <i class="fas fa-code-branch"></i> Add any developer/programming
          positions that you have had in the past
        </p>
        <small>* = required field</small>
        <form class="form" onSubmit={onSubmit}>
          <div class="form-group">
            <input
              type="text"
              placeholder="* Job Title"
              name="title"
              value={title}
              onChange={onChange}
              required
            />
          </div>
          <div class="form-group">
            <input
              type="text"
              placeholder="* Company"
              name="company"
              value={company}
              onChange={onChange}
              required
            />
          </div>
          <div class="form-group">
            <input
              type="text"
              placeholder="Location"
              name="location"
              value={location}
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
              Current Job
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
              placeholder="Job Description"
              value={description}
              onChange={onChange}
            ></textarea>
          </div>
          <input type="submit" class="btn btn-primary my-1" />
          <Link to="dashboard.jsx" class="btn btn-light my-1">
            Go Back
          </Link>
        </form>
      </section>
    </>
  );
};

export default AddExp;
