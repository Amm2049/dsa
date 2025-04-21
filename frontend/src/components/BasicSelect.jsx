import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { newDatas, useApp } from "./AppProvider";
import { useState } from "react";

export default function BasicSelect() {
  const {
    filterState,
    setFilterState,
    popular,
    setPopular,
    filterLoading,
    setFilterLoading,
    audioRef,
  } = useApp();

  const handleChange = async (event) => {
    setFilterLoading(true);
    setFilterState(event.target.value);

    let filter = "";
    if (event.target.value == "Latest") {
      filter = "latest";
    } else if (event.target.value == "Popular") {
      filter = "popular";
    } else {
      filter = "a-z";
    }

    const response = await fetch(`http://localhost:5000/sort/${filter}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const { results } = await response.json();
    setPopular(newDatas(results));
    setFilterLoading(false);
  };

  return (
    <Box
      sx={{
        minWidth: 120,
        alignItems: "center",
        mr: 2,
        mt: 2,
      }}
    >
      <FormControl fullWidth color="black">
        <InputLabel
          sx={{
            // Adjust label position
            fontSize: "1rem",
          }}
        >
          Label
        </InputLabel>
        <Select
          sx={{
            height: 40, // Set desired height
            "& .MuiSelect-select": {
              minHeight: "auto", // Ensure content fits within the new height
            },
          }}
          value={filterState}
          label="Label"
          onChange={handleChange}
        >
          <MenuItem value={"Latest"}>Latest</MenuItem>
          <MenuItem value={"Popular"}>Popular</MenuItem>
          <MenuItem value={"A-Z"}>A-Z</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
