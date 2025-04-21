import React, { useState } from "react";
import { Box, Typography, Slider, IconButton, Avatar } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import { grey } from "@mui/material/colors";
import { truncateText, useApp } from "./AppProvider";

const CurrentPlaying = ({ current }) => {
  // State for current song details
  const { mode } = useApp();
  const [isPlaying, setIsPlaying] = useState(false); // Play/Pause state

  // Toggle play/pause
  const togglePlayback = () => {
    setIsPlaying((prev) => !prev);
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        backgroundColor: mode == "light" ? grey[100] : "transparent",
        p: 3,
        borderRadius: 2,
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
      }}
    >
      {/* Song Image */}
      <Box sx={{ mb: 2 }}>
        <Avatar
          alt="Song Cover"
          src={current?.track_image}
          sx={{
            borderRadius: 2,
            width: 150,
            height: 130,
            mx: "auto",
            my: 2,
            "&:hover": {
              transform: "scale(1.1)", // Zoom in on hover
              transition: "transform 0.3s ease-in-out",
            },
          }}
        />
      </Box>

      {/* Song Details */}
      {current !== null ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
            {truncateText(current.track_name, 15)}
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{ color: "text.secondary", mb: 1 }}
          >
            {current.artist_name}
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{ color: "text.secondary", mb: 1 }}
          >
            {current.album_name}
          </Typography>
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: "bold", mb: 1 }}>
            No song is playing
          </Typography>
        </Box>
      )}

      {/* Play/Pause Button */}
      {/* <Box sx={{ display: "flex", justifyContent: "center" }}>
        <IconButton onClick={togglePlayback} size="large" disabled={!current}>
          {isPlaying ? (
            <PauseIcon fontSize="large" />
          ) : (
            <PlayArrowIcon fontSize="large" />
          )}
        </IconButton>
      </Box> */}

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="subtitle1" sx={{ color: "text.secondary", mb: 1 }}>
          {!current ? "" : current.release_date}
        </Typography>
      </Box>
    </Box>
  );
};

export default CurrentPlaying;
