import React, { useEffect, useState } from "react";
import { Stack, Box } from "@mui/material/";
import CircularProgress from "@mui/material/CircularProgress";
import imgLoad from "../../Images/logoVSP.png";
import "./LoadingSSO.css"; // Import CSS file for styles

export default function LoaddingSSO() {
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setOpacity((prevOpacity) => prevOpacity - 0.2);
      if (opacity <= 0) {
        clearInterval(interval);
      }
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <Box
      className="loading-container"
      style={{ opacity: opacity }}
    >
      <Stack className="center-D">
        <img src={imgLoad} alt="" width={500} />
      </Stack>
      <Stack
        sx={{ color: "grey.500", justifyContent: "center" }}
        spacing={2}
        direction="row"
      >
        <CircularProgress color="success" />
      </Stack>
    </Box>
  );
}
