import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUserAction } from "../redux/actions/auth.action";
const initialState = {
  name: "",
  email: "",
  password: "",
  password2: "",
};
const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch(); //to call the action
  const [formData, setFormData] = useState(initialState);
  //onChange
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  //onSubmit
  const onSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    dispatch(registerUserAction(formData)).unwrap();
    navigate("/dashboard");
  };
  const { name, email, password, password2 } = formData;
  return (
    <>
      <section class="container">
        <h1 class="large text-primary">Sign Up</h1>
        <p class="lead">
          <i class="fas fa-user"></i> Create Your Account
        </p>
        <form class="form" onSubmit={onSubmit}>
          <div class="form-group">
            <input
              type="text"
              placeholder="Name"
              name="name"
              required
              value={name}
              onChange={onChange}
            />
          </div>
          <div class="form-group">
            <input
              type="email"
              placeholder="Email Address"
              name="email"
              value={email}
              onChange={onChange}
            />
            <small class="form-text">
              This site uses Gravatar so if you want a profile image, use a
              Gravatar email
            </small>
          </div>
          <div class="form-group">
            <input
              type="password"
              placeholder="Password"
              name="password"
              minLength="6"
              value={password}
              onChange={onChange}
            />
          </div>
          <div class="form-group">
            <input
              type="password"
              placeholder="Confirm Password"
              name="password2"
              minLength="6"
              value={password2}
              onChange={onChange}
            />
          </div>
          <input type="submit" class="btn btn-primary" value="Register" />
        </form>
        <p class="my-1">
          Already have an account? <a href="login.html">Sign In</a>
        </p>
      </section>
    </>
  );
};

export default Register;
