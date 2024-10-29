"use client";

import { DarkModeOutlined, LightModeOutlined } from "@mui/icons-material";
import { AppBar, Box, IconButton, Stack, Typography } from "@mui/material";
import { useContext } from "react";

import { ColorModeContext } from "@contexts/color-mode";

function Footer() {
  const { mode, setMode } = useContext(ColorModeContext);
  return (
    <AppBar color="default" position="sticky">
      <Stack
        width="100%"
        height="100px"
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Box display="flex" alignItems="center">
          <Typography variant="body1" fontWeight="bold">
            Choose theme
          </Typography>
          <IconButton
            onClick={() => {
              setMode();
            }}
          >
            {mode === "dark" ? <LightModeOutlined /> : <DarkModeOutlined />}
          </IconButton>
        </Box>
        <Typography variant="body2" alignSelf="center">
          © Ulyana Manuilova Test App
        </Typography>
      </Stack>
    </AppBar>
  );
}

export default Footer;
