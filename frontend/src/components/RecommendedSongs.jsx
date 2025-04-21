import React from "react";
import { Grid, Box, Typography, Skeleton } from "@mui/material";
import { grey } from "@mui/material/colors";
import { truncateText, useApp } from "./AppProvider";
import Add from "./Add";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

function RecommendedSongs({ setCurrent }) {
  const { mode, loading, recommend, queue, setIsGlobalPlaying, current } =
    useApp(); // Replace with your actual theme mode
  const currentQueueIds = queue.map((song) => song.id);

  return (
    <>
      <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>
        Recommended Songs
      </Typography>
      {loading ? (
        <Grid container gap={3} justifyContent={"left"}>
          {[1, 2, 3, 4, 5, 6, 7].map((a) => {
            return (
              <Grid key={a} item xs={12} sm={6} md={4}>
                <Skeleton
                  sx={{ borderRadius: 4 }}
                  variant="card"
                  height={"200px"}
                  width={190}
                />
              </Grid>
            );
          })}
        </Grid>
      ) : (
        <Grid sx={{ justifyContent: "space-evenly" }} container>
          {recommend.map((song, index) => (
            <Grid item xs={12} sm={6} md={4} key={song.id}>
              <Box
                onClick={() => {
                  setCurrent(song);
                  setIsGlobalPlaying(true); // Always set to true when selecting a new song
                  localStorage.setItem("id", song.id);
                  localStorage.setItem("playing", 0);
                }}
                sx={{
                  position: "relative", // Enable absolute positioning for the play button
                  padding: 2,
                  ":hover": {
                    backgroundColor: mode === "light" ? grey[100] : grey[900],
                  },
                  borderRadius: 2,
                  width: "200px",
                }}
              >
                {/* Image */}
                <Box
                  sx={{
                    position: "relative", // Container for the image and play button
                  }}
                >
                  <img
                    src={song.track_image}
                    alt={song.track_name}
                    style={{
                      borderRadius: 5,
                      width: "100%",
                      height: "170px",
                      objectFit: "cover",
                      marginBottom: "5px",
                    }}
                  />
                </Box>

                {/* Song Details */}
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "bold",
                    margin: 0,
                    my: 0,
                    py: 0,
                    color: "#1dff00",
                  }}
                >
                  {truncateText(song.track_name, 14)}
                </Typography>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      color: "text.secondary",
                      margin: 0,
                      my: 0,
                      py: 0,
                    }}
                  >
                    {truncateText(song.artist_name, 12)}
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
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      )}
    </>
  );
}

export default RecommendedSongs;
