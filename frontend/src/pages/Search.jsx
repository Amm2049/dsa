import React, { useState } from "react";
import { Grid, Box, Typography, Skeleton } from "@mui/material";
import { grey } from "@mui/material/colors";
import { truncateText, useApp } from "../components/AppProvider";
import Add from "../components/Add";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import SearchBox from "../components/SearchBox";
import MusicNoteIcon from "@mui/icons-material/MusicNote"; // Add an icon for no results

const Search = () => {
  const {
    queue,
    mode,
    songsSearch,
    setQueue,
    recommend,
    setCurrent,
    current,
    pause,
    setIsGlobalPlaying,
  } = useApp(); // Ensure `setQueue` is available in your context
  const [loading, setLoading] = useState(false);
  const [found, setFound] = useState(true);
  const currentQueueIds = queue.map((song) => song.id);

  return (
    <>
      <Box>
        <SearchBox
          loading={loading}
          setLoading={setLoading}
          found={found}
          setFound={setFound}
        />
      </Box>
      {loading ? (
        <Grid
          sx={{ marginX: "65px", marginY: "30px" }}
          container
          gap={3}
          justifyContent={"left"}
        >
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
      ) : found ? (
        <Grid
          sx={{
            justifyContent: "left",
            marginX: "65px",
            marginY: "30px",
          }}
          container
        >
          {songsSearch.map((song, index) => (
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
                  {truncateText(song.track_name, 12)}
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
                    {truncateText(song.artist_name, 14)}
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
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "50vh", // Center vertically
            textAlign: "center",
            color: mode === "light" ? grey[800] : grey[300], // Adjust color based on theme
          }}
        >
          <MusicNoteIcon
            sx={{
              fontSize: 80,
              marginBottom: 2,
              color: mode === "light" ? grey[500] : grey[400],
            }}
          />
          <Typography
            variant="h5"
            sx={{
              fontWeight: "bold",
              marginBottom: 1,
            }}
          >
            No Songs Found
          </Typography>
          <Typography variant="subtitle1" sx={{ color: "text.secondary" }}>
            Try searching for something else.
          </Typography>
        </Box>
      )}
    </>
  );
};

export default Search;
