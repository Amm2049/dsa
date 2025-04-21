import React, { useContext, useState } from "react";
import {
  formatDurationMs,
  truncateText,
  useApp,
} from "../components/AppProvider"; // Adjust the path to your context file
import {
  Container,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Typography,
  Avatar,
  Box,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { green, grey } from "@mui/material/colors";
import { motion, AnimatePresence } from "framer-motion";
import Controls from "../components/Controls";
import EqualizerAnimation from "../components/EqualizerAnimation";

function Queue() {
  const { queue, mode, songs, setQueue, isGlobalPlaying } = useApp(); // Ensure `setQueue` is available in your context
  const [loading, setLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleRemoveSong = async (id) => {
    setLoading(true);

    // Simulate sending request to backend
    const response = await fetch("http://localhost:5000/queue/remove", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    });
    const { message, data } = await response.json();

    if (message) {
      setQueue(data); // Update the queue state
    }
    setLoading(false);
  };

  return (
    <Container maxWidth="lg" sx={{ marginTop: 4 }}>
      <Box
        sx={{
          display: "flex",
          alignItems: " center",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h4" gutterBottom>
          Your Queue
        </Typography>
        {queue.length !== 0 && (
          <Controls isPlaying={isPlaying} setIsPlaying={setIsPlaying} />
        )}
      </Box>

      {/* Display Queue */}
      <List>
        <AnimatePresence>
          {queue.length > 0 ? (
            queue.map((song, index) => (
              <motion.div
                key={song.id}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50, transition: { duration: 0.3 } }}
              >
                <ListItem
                  component={motion.li}
                  layout
                  sx={{
                    borderRadius: 2,
                    ":hover": {
                      backgroundColor: mode === "light" ? grey[100] : grey[900],
                    },
                    display: "flex",
                    gap: 2,
                    alignItems: "center",
                  }}
                  secondaryAction={
                    <IconButton
                      edge="end"
                      onClick={() => handleRemoveSong(song.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  }
                >
                  <Avatar src={song.track_image} sx={{}} />
                  <ListItemText
                    sx={{
                      width: "30%",
                      color: "#1dff00",
                      "& .MuiListItemText-primary": {
                        fontSize: "1.2rem", // Increase font size for primary text
                      },
                    }}
                    primary={truncateText(song.track_name, 35)}
                    secondary={truncateText(song.artist_name, 35)}
                  />
                  <ListItemText
                    sx={{ width: "30%", color: grey[400] }}
                    primary={truncateText(song.album_name, 35)}
                  />
                  <ListItemText
                    sx={{ width: "30%", color: grey[400] }}
                    primary={`${formatDurationMs(
                      song.track_duration_ms
                    )} minutes`}
                  />
                  <ListItemText
                    sx={{
                      width: "10%",
                      color: "#1dff00",
                    }}
                    primary={
                      index == 0 &&
                      isGlobalPlaying &&
                      isPlaying && <EqualizerAnimation />
                    }
                  />
                </ListItem>
              </motion.div>
            ))
          ) : (
            <Typography variant="body1">
              Your queue is empty. Add some songs!
            </Typography>
          )}
        </AnimatePresence>
      </List>
    </Container>
  );
}

export default Queue;
