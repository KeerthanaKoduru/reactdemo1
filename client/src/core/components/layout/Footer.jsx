import React from "react";
import { Box } from "@mui/material";
// const Footer = () => {
//   return <>Footer &copy; fractal {new Date().getFullYear()}</>;
// };

const Footer = () => {
  return (
    <Box
      sx={{
        bgcolor: "grey.900",
        color: "white",
        py: 2,
        textAlign: "center",
      }}
    >
      Footer &copy; fractal {new Date().getFullYear()}
    </Box>
  );
};

export default Footer;
