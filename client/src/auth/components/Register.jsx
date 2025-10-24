import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUserAction } from "../redux/actions/auth.action";

import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import { Container, Box, Typography } from "@mui/material";
import { TextField } from "@mui/material";
import { Stack } from "@mui/material";
import { Button } from "@mui/material";
import { Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const initialState = {
  name: "",
  email: "",
  password: "",
  password2: "",
};

import { useSelector } from "react-redux";
import { useEffect } from "react";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(initialState);
  const [error, setError] = useState("");
  const auth = useSelector((state) => state.auth);
  const profile = useSelector((state) => state.profile);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await dispatch(registerUserAction(formData)).unwrap();
      // After registration, fetch profile (if not already fetched)
      // If profile is missing, redirect to create-profile
      if (!localStorage.getItem("profileName")) {
        navigate("/profile/create-profile");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      setError(err?.message || "Registration failed");
    }
  };

  useEffect(() => {
    // If already authenticated, check for profile
    if (auth.isAuthenticated) {
      if (!localStorage.getItem("profileName")) {
        navigate("/profile/create-profile");
      } else {
        navigate("/dashboard");
      }
    }
  }, [auth.isAuthenticated, navigate]);

  const { name, email, password, password2 } = formData;
  return (
    <>
      <Container maxWidth="sm" sx={{ mt: 8 }}>
        <Box textAlign="center" mb={4}>
          <Typography
            variant="h3"
            color="primary"
            fontWeight={700}
            gutterBottom
          >
            Sign Up
          </Typography>
          <Typography variant="h6" color="text.secondary">
            <PersonAddAltIcon sx={{ verticalAlign: "middle", mr: 1 }} />
            Create Your Account
          </Typography>
        </Box>

        <Box component="form" onSubmit={onSubmit}>
          <Stack spacing={3}>
            <TextField
              label="Name"
              name="name"
              required
              value={name}
              onChange={onChange}
              fullWidth
            />
            <TextField
              label="Email Address"
              name="email"
              type="email"
              value={email}
              onChange={onChange}
              fullWidth
              helperText="This site uses Gravatar. Use a Gravatar email for your profile image."
            />
            <TextField
              label="Password"
              name="password"
              type="password"
              inputProps={{ minLength: 6 }}
              value={password}
              onChange={onChange}
              fullWidth
            />
            <TextField
              label="Confirm Password"
              name="password2"
              type="password"
              inputProps={{ minLength: 6 }}
              value={password2}
              onChange={onChange}
              fullWidth
            />
            {error && (
              <Typography color="error" variant="body2">
                {error}
              </Typography>
            )}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              sx={{ py: 1.2, textTransform: "none", fontWeight: 600 }}
            >
              Register
            </Button>
          </Stack>
        </Box>

        <Typography variant="body1" align="center" sx={{ mt: 3 }}>
          Already have an account?{" "}
          <Link
            component={RouterLink}
            to="/auth/login"
            underline="hover"
            color="primary"
            fontWeight={600}
          >
            Sign In
          </Link>
        </Typography>
      </Container>
    </>
  );
};

export default Register;
