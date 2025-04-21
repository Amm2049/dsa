import React, { useRef, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import {
  ThemeProvider,
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
} from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4"; // Dark mode icon
import Brightness7Icon from "@mui/icons-material/Brightness7"; // Light mode icon

import Home from "./pages/Home";
import Queue from "./pages/Queue";
import BasicSelect from "./components/BasicSelect";
import Search from "./pages/Search";
import { useApp } from "./components/AppProvider";
import AudioPlayer from "./components/AudioPlayer";

function App() {
  const { mode, setMode, showFilter, current } = useApp();

  // Toggle between light and dark mode
  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  const routes = [
    { id: 1, name: "Home", path: "/" },
    { id: 2, name: "Queue", path: "/queue" },
    { id: 3, name: "Search", path: "/search" },
  ];

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          backgroundColor: "background.paper",
          color: "text.primary",
          py: 1,
        }}
      >
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            QueueWave: Music Player
          </Typography>

          {/* Filter  */}
          {showFilter ? (
            <BasicSelect />
          ) : (
            <Box
              sx={{
                minWidth: 120,
                alignItems: "center",
                mr: 2,
                mt: 2,
              }}
            ></Box>
          )}

          {/* Global song  */}
          <AudioPlayer />

          {/* Navigation Links */}
          {routes.map((route) => {
            return (
              <Button
                key={route.id}
                sx={{ mx: 1 }}
                color="inherit"
                component={Link}
                to={route.path}
                onClick={() => {
                  const selected = route.id;
                }}
              >
                {route.name}
              </Button>
            );
          })}

          {/* Theme Toggle Button */}
          <IconButton color="inherit" onClick={toggleTheme}>
            {mode === "light" ? <Brightness4Icon /> : <Brightness7Icon />}
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/queue" element={<Queue />} />
        <Route path="/Search" element={<Search />} />
      </Routes>
    </>
  );
}

export default App;
