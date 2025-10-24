// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { loginUserAction } from "../redux/actions/auth.action";
// import { useNavigate } from "react-router-dom";
// import Container from "@mui/material/Container";
// import Box from "@mui/material/Box";
// import Typography from "@mui/material/Typography";
// import TextField from "@mui/material/TextField";
// import Button from "@mui/material/Button";
// import Stack from "@mui/material/Stack";
// import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
// const initialState = {
//   email: "",
//   password: "",
// };

// const Login = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState(initialState);
//   const [error, setError] = useState("");
//   const user = useSelector((state) => state.auth.user);

//   const onChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const onSubmit = (e) => {
//     e.preventDefault();
//     if (!formData.email || !formData.password) {
//       setError("Please enter both email and password.");
//       return;
//     }
//     setError("");
//     console.log(formData);
//     dispatch(loginUserAction(formData));
//     navigate("/dashboard");
//   };

//   useEffect(() => {
//     if (user) {
//       console.log("Logged in user details:", user);
//     }
//   }, [user]);

//   const { email, password } = formData;

//   return (
//     <>
//       <section className="container">
//         <h1 className="large text-primary">Sign In</h1>
//         <p className="lead">
//           <i className="fas fa-user"></i> Sign into Your Account
//         </p>
//         <form className="form" onSubmit={onSubmit} autoComplete="on">
//           <div className="form-group">
//             <input
//               type="email"
//               placeholder="Email Address"
//               name="email"
//               value={email}
//               onChange={onChange}
//               required
//               autoComplete="username"
//             />
//           </div>
//           <div className="form-group">
//             <input
//               type="password"
//               placeholder="Password"
//               name="password"
//               value={password}
//               onChange={onChange}
//               required
//               autoComplete="current-password"
//             />
//           </div>
//           <input type="submit" className="btn btn-primary" value="Login" />
//         </form>
//         {/* User details are not shown on the UI anymore */}
//       </section>

//       {/* <Container maxWidth="sm" sx={{ mt: 8 }}>
//         {/* Header */}
//       <Box textAlign="center" mb={4}>
//         <Typography variant="h3" color="primary" fontWeight={700} gutterBottom>
//           Sign In
//         </Typography>
//         <Typography variant="h6" color="text.secondary">
//           <PersonAddAltIcon sx={{ verticalAlign: "middle", mr: 1 }} />
//           Sign into Your Account
//         </Typography>
//       </Box>

//       {/* Form */}
//       <Box component="form" onSubmit={onSubmit}>
//         <Stack spacing={3}>
//           <TextField
//             label="Email Address"
//             name="email"
//             type="email"
//             value={email}
//             onChange={onChange}
//             fullWidth
//             helperText="This site uses Gravatar. Use a Gravatar email for your profile image."
//           />
//           <TextField
//             label="Password"
//             name="password"
//             type="password"
//             value={password}
//             onChange={onChange}
//             fullWidth
//           />

//           <Button
//             type="submit"
//             variant="contained"
//             color="primary"
//             size="large"
//             sx={{ py: 1.2, textTransform: "none", fontWeight: 600 }}
//           >
//             Login
//           </Button>
//         </Stack>
//       </Box>
//       {/* </Container> */}

//     </>
//   );
// };

// export default Login;

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUserAction } from "../redux/actions/auth.action";
import { getCurrentProfileAction } from "../../profiles/redux/actions/profile.action";
import { useNavigate } from "react-router-dom";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";

const initialState = {
  email: "",
  password: "",
};

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialState);
  const [error, setError] = useState("");
  const user = useSelector((state) => state.auth.user);
  const authError = useSelector((state) => state.auth.error); // adjust if your slice uses a different name
  const profile = useSelector((state) => state.profile);

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
    dispatch(loginUserAction(formData)).then((resultAction) => {
      if (loginUserAction.fulfilled.match(resultAction)) {
        dispatch(getCurrentProfileAction());
      }
    });
    // Do NOT navigate here; wait for login/profile to succeed
  };

  useEffect(() => {
    if (user && profile && profile.loading === false) {
      // Debugging logs
      console.log("User object:", user);
      console.log("Profile slice:", profile);
      console.log("Profile.profile:", profile.profile);
      if (
        profile.profile &&
        typeof profile.profile === "object" &&
        Object.keys(profile.profile).length > 0
      ) {
        if (!localStorage.getItem("profileName")) {
          localStorage.setItem("profileName", profile.profile.name || "");
        }
        navigate("/dashboard");
      } else if (profile.profile === null) {
        navigate("/profile/create-profile");
      }
    }
  }, [user, profile, navigate]);

  useEffect(() => {
    // Show backend error if login fails
    if (authError) {
      setError(authError.message || "Login failed. Please try again.");
    }
  }, [authError]);

  const { email, password } = formData;

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
            Sign In
          </Typography>
          <Typography variant="h6" color="text.secondary">
            <PersonAddAltIcon sx={{ verticalAlign: "middle", mr: 1 }} />
            Sign into Your Account
          </Typography>
        </Box>

        <Box component="form" onSubmit={onSubmit}>
          <Stack spacing={3}>
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
              value={password}
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
              Login
            </Button>
          </Stack>
        </Box>
      </Container>
    </>
  );
};

export default Login;
