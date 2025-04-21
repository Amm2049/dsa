import React, { useState } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import PendingIcon from "@mui/icons-material/Pending";
import { useApp } from "./AppProvider";
import { yellow } from "@mui/material/colors";

const Add = ({ song }) => {
  const { queue, setQueue } = useApp();
  const [loading, setLoading] = useState(false);

  const addToQueue = async (e) => {
    e.stopPropagation();
    setLoading(true);

    // Send request to backend
    const response = await fetch("http://localhost:5000/queue/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ song }),
    });
    const { message, data } = await response.json();
    if (message) {
      setQueue(data);
    }
    setLoading(false);
  };

  return (
    <>
      {loading ? (
        <PendingIcon
          sx={{
            fontSize: 40,
            color: yellow[700],
          }}
        />
      ) : (
        <AddCircleIcon
          onClick={addToQueue}
          sx={{
            fontSize: 40,
            ":hover": {
              color: "#1dff00",
            },
          }}
        />
      )}
    </>
  );
};

export default Add;
