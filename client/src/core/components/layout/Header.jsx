import React from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Stack,
} from "@mui/material";
import CodeIcon from "@mui/icons-material/Code";

const Header = () => {
  return (
    <AppBar position="static" sx={{ bgcolor: "grey.900" }}>
      <Toolbar>
        {/* Logo / Title */}
        <IconButton
          component={RouterLink}
          to="/"
          edge="start"
          color="inherit"
          sx={{ mr: 1 }}
        >
          <CodeIcon />
        </IconButton>

        <Typography
          variant="h6"
          component={RouterLink}
          to="/"
          sx={{
            color: "inherit",
            textDecoration: "none",
            flexGrow: 1,
            fontWeight: 600,
          }}
        >
          DevConnector
        </Typography>

        {/* Navigation Links */}
        <Stack direction="row" spacing={2}>
          <Button
            color="inherit"
            component={RouterLink}
            to="/profiles"
            sx={{ textTransform: "none" }}
          >
            Developers
          </Button>
          <Button
            color="inherit"
            component={RouterLink}
            to="/auth/register"
            sx={{ textTransform: "none" }}
          >
            Register
          </Button>
          <Button
            color="inherit"
            component={RouterLink}
            to="/auth/login"
            sx={{ textTransform: "none" }}
          >
            Login
          </Button>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
