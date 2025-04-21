import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Avatar,
  CircularProgress,
  IconButton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { newDatas, useApp } from "./AppProvider";

const SearchBox = ({ loading, setLoading, found, setFound }) => {
  const { songs, songsSearch, setSongsSearch, setCurrent } = useApp();
  const [query, setQuery] = useState("");

  // Simulate fetching results (replace this with an actual API call)
  const handleSearch = async () => {
    const searchedIds = songs
      .filter((song) => {
        // Check if the song's track name matches the query
        return (
          song.track_name
            .replace(/\s+/g, "")
            .toLowerCase()
            .includes(query.replace(/\s+/g, "").toLowerCase()) ||
          song.artist_name
            .replace(/\s+/g, "")
            .toLowerCase()
            .includes(query.replace(/\s+/g, "").toLowerCase())
        );
      })
      .map((song) => song.id); // Extract only the `id` from the filtered songs

    if (searchedIds.length > 0) {
      setLoading(true);
      const response = await fetch("http://localhost:5000/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ids: searchedIds }),
      });
      const { results } = await response.json();
      setSongsSearch(newDatas(results));
      setLoading(false);
      setFound(true);
    } else {
      setFound(false);
    }
  };

  // Debounce utility function
  const useDebounce = (value, delay) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);

      return () => clearTimeout(handler);
    }, [value, delay]);

    return debouncedValue;
  };

  // Debounced query
  const debouncedQuery = useDebounce(query, 500);

  // Handle search when debounced query changes
  useEffect(() => {
    if (debouncedQuery.trim()) {
      handleSearch();
    }
  }, [debouncedQuery]);

  return (
    <Box sx={{ my: 0 }}>
      {/* Search Input */}
      <Box
        sx={{ my: 0, display: "flex", justifyContent: "center" }}
        noValidate
        autoComplete="off"
      >
        <Box
          component="form"
          sx={{ width: "90%", "& > :not(style)": { width: "100%" } }}
          noValidate
          autoComplete="off"
          value={query}
          placeholder="Search for songs, albums, or artists..."
          onChange={(e) => setQuery(e.target.value)}
          // onKeyDown={(e) => e.key === "Enter" && handleSearch()} // Trigger search on Enter key
        >
          <TextField
            sx={{
              "& .MuiInputLabel-root.Mui-focused": { color: "#1dff00" }, // Label focus color
              "& .MuiInput-underline:after": { borderBottomColor: "#1dff00" }, // Underline focus color
            }}
            id="standard-basic"
            label="Search any songs you like"
            variant="standard"
          />
        </Box>
      </Box>
    </Box>
  );
};

export default SearchBox;
