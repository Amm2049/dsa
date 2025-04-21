import {
  Box,
  List,
  ListItem,
  ListItemText,
  Skeleton,
  Typography,
} from "@mui/material";
import React from "react";
import { formatDurationMs, truncateText, useApp } from "./AppProvider";
import { grey } from "@mui/material/colors";
import Add from "./Add";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const Popular = ({ popularSongs, setCurrent }) => {
  const {
    mode,
    loading,
    queue,
    filterState,
    filterLoading,
    isGlobalPlaying,
    setIsGlobalPlaying,
    current,
    audioRef,
  } = useApp();
  const currentQueueIds = queue.map((song) => song.id);

  return (
    <Box
      sx={{
        width: "50%",
        overflow: "scroll",
        backgroundColor: "transparent",
        maxHeight: "100%",
        position: "relative", // Ensure the parent container is positioned properly
      }}
    >
      {/* Sticky Typography */}
      <Box
        sx={{
          display: "flex",
          justifyItems: "left",
          borderBottom: `0.5px solid ${
            mode === "light" ? grey[300] : grey[800]
          }`, // Thin border for the container
          pb: 1,
          px: 2,
          position: "sticky",
          top: 0, // Stick to the top of the container
          zIndex: 1, // Ensure it stays above other content
          backgroundColor: mode === "light" ? "white" : "#121212",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            pb: 1,
            position: "sticky",
            top: 0, // Stick to the top of the container
            zIndex: 1, // Ensure it stays above other content
            // backgroundColor: mode === "light" ? grey[100] : grey[900], // Match the background color
            width: "3%",
          }}
        >
          #
        </Typography>
        <Typography
          variant="h6"
          sx={{
            pb: 1,
            px: 2,
            position: "sticky",
            top: 0, // Stick to the top of the container
            zIndex: 1, // Ensure it stays above other content
            // backgroundColor: mode === "light" ? grey[100] : grey[900], // Match the background color
            width: "40%",
          }}
        >
          {filterState}
        </Typography>
        <Typography
          variant="h6"
          sx={{
            pb: 1,
            px: 2,
            position: "sticky",
            top: 0, // Stick to the top of the container
            zIndex: 1, // Ensure it stays above other content
            // backgroundColor: mode === "light" ? grey[100] : grey[900], // Match the background color
            width: "35%",
          }}
        >
          Album
        </Typography>
        <Typography
          variant="h6"
          sx={{
            pb: 1,
            pl: 2,
            position: "sticky",
            top: 0, // Stick to the top of the container
            zIndex: 1, // Ensure it stays above other content
            // backgroundColor: mode === "light" ? grey[100] : grey[900], // Match the background color
          }}
        >
          Duration
        </Typography>
      </Box>

      {/* List of songs  */}
      {loading || filterLoading ? (
        <List>
          <ListItem sx={{ m: 0, p: 0 }}>
            <Skeleton variant="text" height={"100px"} width={"100%"} />
          </ListItem>
          <ListItem sx={{ m: 0, p: 0 }}>
            <Skeleton variant="text" height={"100px"} width={"100%"} />
          </ListItem>
          <ListItem sx={{ m: 0, p: 0 }}>
            <Skeleton variant="text" height={"100px"} width={"100%"} />
          </ListItem>
          <ListItem sx={{ m: 0, p: 0 }}>
            <Skeleton variant="text" height={"100px"} width={"100%"} />
          </ListItem>
        </List>
      ) : (
        <List>
          {popularSongs.length > 0 ? (
            popularSongs.map((song, index) => (
              <ListItem
                onClick={() => {
                  setCurrent(song);
                  setIsGlobalPlaying(true); // Always set to true when selecting a new song
                  localStorage.setItem("id", song.id);
                  localStorage.setItem("playing", 0);
                }}
                sx={{
                  display: "flex",
                  justifyItems: "left",
                  ":hover": {
                    backgroundColor: mode == "light" ? grey[100] : grey[900],
                  },
                  borderRadius: 2,
                }}
                key={index}
              >
                <Typography
                  variant="subtitle1"
                  sx={{
                    marginRight: 3,
                    width: "2%",
                  }}
                >
                  {index + 1}
                </Typography>
                <img
                  style={{ borderRadius: 10 }}
                  width={50}
                  src={song.track_image}
                />
                <ListItemText
                  sx={{
                    marginLeft: 3,
                    marginRight: 3,
                    color: "#1dff00",

                    width: "40%",
                  }}
                  primary={truncateText(song.track_name)}
                  secondary={truncateText(song.artist_name)}
                />
                <Typography
                  variant="subtitle1"
                  sx={{
                    marginRight: 3,
                    width: "50%",
                    color: grey[400],
                  }}
                >
                  {song.album_name}
                </Typography>
                <Typography
                  variant="subtitle1"
                  sx={{
                    marginRight: 3,
                    color: grey[400],
                    width: "10%",
                  }}
                >
                  {formatDurationMs(song.track_duration_ms)}
                </Typography>
                {currentQueueIds.includes(song.id) ? (
                  <CheckCircleIcon
                    sx={{
                      fontSize: 40,

                      color: "#1dff00",
                    }}
                  />
                ) : (
                  <Add song={song} />
                )}
              </ListItem>
            ))
          ) : (
            <Typography variant="body1">There is no popular music.</Typography>
          )}
        </List>
      )}
    </Box>
  );
};

export default Popular;
