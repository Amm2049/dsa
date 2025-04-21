import React, { useEffect, useState } from "react";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import { newDatas, useApp } from "./AppProvider";

const Controls = ({ setIsPlaying, isPlaying }) => {
  const {
    queue,
    setQueue,
    history,
    setHistory,
    current,
    setCurrent,
    isGlobalPlaying,
    setIsGlobalPlaying,
    play,
    pause,
  } = useApp();

  const pre = async () => {
    if (history.length !== 0) {
      localStorage.setItem("playing", 1);

      setIsPlaying(true);
      setIsGlobalPlaying(true);

      const response = await fetch("http://localhost:5000/queue/play-pre", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      });
      const { message, queueData, historyData } = await response.json();

      if (message) {
        setQueue(newDatas(queueData)); // Update the queue state
        setHistory(newDatas(historyData));
        setCurrent(history[history.length - 1]);
        localStorage.setItem("id", queue[0].id);
      }
    }
  };

  const next = async () => {
    if (queue.length > 0) {
      localStorage.setItem("playing", 1);

      setIsPlaying(true);
      setIsGlobalPlaying(true);
      const response = await fetch("http://localhost:5000/queue/play-next", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const { message, queueData, historyData } = await response.json();

      if (message) {
        setQueue(newDatas(queueData)); // Update the queue state
        setHistory(newDatas(historyData));
        setCurrent(queue.filter((song) => song.id == queue[1].id)[0]);
        localStorage.setItem("id", queue[0].id);
      }
    }
  };

  const playSong = () => {
    localStorage.setItem("playing", 1);
    setIsPlaying(true);
    play();
    if (queue.length !== 0) {
      setCurrent(queue.filter((song) => song.id == queue[0].id)[0]);

      localStorage.setItem("id", queue[0].id);
    }
  };
  const pauseSong = () => {
    localStorage.setItem("playing", 1);
    setIsPlaying(false);
    pause();
  };

  useEffect(() => {
    if (localStorage.getItem("playing")) {
      if (localStorage.getItem("playing") == 1) {
        setIsPlaying(true);
      } else {
        setIsPlaying(false);
      }
    }
  }, [isGlobalPlaying]);

  return (
    <div>
      {" "}
      <SkipPreviousIcon
        onClick={pre}
        sx={{ fontSize: 50, ":hover": { color: "#1dff00" } }}
      />
      {isGlobalPlaying && isPlaying ? (
        <PauseIcon
          onClick={pauseSong}
          sx={{ fontSize: 50, ":hover": { color: "#1dff00" } }}
        />
      ) : (
        <PlayArrowIcon
          onClick={playSong}
          sx={{ fontSize: 50, ":hover": { color: "#1dff00" } }}
        />
      )}
      <SkipNextIcon
        onClick={next}
        sx={{ fontSize: 50, ":hover": { color: "#1dff00" } }}
      />
    </div>
  );
};

export default Controls;
