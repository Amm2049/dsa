// AudioPlayer.jsx
import React, { useEffect, useRef, useState } from "react";
import { Card, CardContent, Typography, IconButton, Box } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import { truncateText, useApp } from "./AppProvider";
import EqualizerAnimation from "./EqualizerAnimation";
import { grey } from "@mui/material/colors";

function AudioPlayer() {
  // const audioRef = useRef(null);
  const { current, isGlobalPlaying, setIsGlobalPlaying, audiRef, play, pause } =
    useApp();

  // const play = () => {
  //   setIsGlobalPlaying(!isGlobalPlaying);
  //   audioRef.current.play();
  // };
  // const pause = () => {
  //   setIsGlobalPlaying(!isGlobalPlaying);
  //   audioRef.current.pause();
  // };

  // useEffect(() => {
  //   if (current) {
  //     // play();
  //   }
  // }, [current]);

  if (!current) return null;

  return (
    <Box
      sx={{
        width: "25%",
        backgroundColor: grey[900],
        display: "flex",
        justifyContent: "left",
        alignItems: "center",
        borderRadius: 5,
        mr: 5,
        ml: 20,
      }}
    >
      {isGlobalPlaying ? (
        <IconButton onClick={pause} sx={{ mr: 2 }}>
          <PauseIcon sx={{ color: "#1dff00", fontSize: 30 }} />
        </IconButton>
      ) : (
        <IconButton onClick={play} sx={{ mr: 2 }}>
          <PlayArrowIcon sx={{ color: "#1dff00", fontSize: 30 }} />
        </IconButton>
      )}
      <Typography variant="h6" sx={{ mr: 3, color: "#1dff00" }}>
        {truncateText(current?.track_name, 20)}
      </Typography>
      {isGlobalPlaying && <EqualizerAnimation />}

      {/* <audio
        ref={audioRef}
        src={current?.url}
        onEnded={() => setIsGlobalPlaying(false)}
        // preload="metadata"
      /> */}
    </Box>
  );
}

export default AudioPlayer;
