import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUserAction } from "../redux/actions/auth.action";

const initialState = {
  email: "",
  password: "",
};

const Login = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(initialState);
  const [error, setError] = useState("");
  const user = useSelector((state) => state.auth.user);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setError("Please enter both email and password.");
      return;
    }
    setError("");
    console.log(formData);
    dispatch(loginUserAction(formData));
  };

  useEffect(() => {
    if (user) {
      console.log("Logged in user details:", user);
    }
  }, [user]);

  const { email, password } = formData;

  return (
    <>
      <section className="container">
        <h1 className="large text-primary">Sign In</h1>
        <p className="lead">
          <i className="fas fa-user"></i> Sign into Your Account
        </p>
        <form className="form" onSubmit={onSubmit} autoComplete="on">
          <div className="form-group">
            <input
              type="email"
              placeholder="Email Address"
              name="email"
              value={email}
              onChange={onChange}
              required
              autoComplete="username"
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={onChange}
              required
              autoComplete="current-password"
            />
          </div>
          <input type="submit" className="btn btn-primary" value="Login" />
        </form>
        {/* User details are not shown on the UI anymore */}
      </section>
    </>
  );
};

export default Login;
