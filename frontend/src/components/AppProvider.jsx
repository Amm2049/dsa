import {
  createTheme,
  CssBaseline,
  ThemeProvider,
  Typography,
} from "@mui/material";
import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useRef,
} from "react";
import { useLocation } from "react-router-dom";
import urls from "../data/srcs";

export const AppContext = createContext();

export const useApp = () => {
  return useContext(AppContext);
};

// format duration
export function formatDurationMs(milliseconds) {
  const totalSeconds = Math.floor(milliseconds / 1000); // Convert ms to seconds
  const mins = Math.floor(totalSeconds / 60); // Calculate minutes
  const secs = totalSeconds % 60; // Calculate remaining seconds
  return `${mins}:${secs < 10 ? "0" : ""}${secs}`; // Format as MM:SS
}

export function truncateText(text, maxLength = 13) {
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
}

// add url to datas
export const newDatas = (datas) => {
  const mergedSongs = datas.map((song) => {
    const matchingUrl = urls.find((url) => url.id === song.id);
    return {
      ...song,
      url: matchingUrl ? matchingUrl.url : null, // or skip if not found
    };
  });
  return mergedSongs;
};

export const AppProvider = ({ children }) => {
  const [mode, setMode] = useState("dark");
  const [songs, setSongs] = useState([]);
  const [songsSearch, setSongsSearch] = useState([]);
  const [queue, setQueue] = useState([]);
  const [history, setHistory] = useState([]);
  const [popular, setPopular] = useState([]);
  const [recommend, setRecommend] = useState([]);
  const [loading, setLoading] = useState(false);
  const [current, setCurrent] = useState(null);
  const [filterState, setFilterState] = useState("Popular");
  const [filterLoading, setFilterLoading] = useState(false);
  const [isGlobalPlaying, setIsGlobalPlaying] = useState(false);

  const route = useLocation();
  const showFilter = route.pathname === "/";

  // Define the theme based on the current mode
  const theme = createTheme({
    palette: {
      mode: mode, // Set the mode dynamically
    },
  });

  // Fetch data only once when the app starts
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:5000/fetchDatas");
        const result = await response.json();

        setSongs(newDatas(result.all) || []);
        setSongsSearch(newDatas(result.all) || []);
        setQueue(newDatas(result.queue) || []);
        setPopular(newDatas(result.popular) || []);
        setRecommend(newDatas(result.recommend) || []);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures this runs only once

  const audioRef = useRef();
  const play = () => {
    setIsGlobalPlaying(true);
    audioRef.current.play();
  };
  const pause = () => {
    setIsGlobalPlaying(false);
    audioRef.current.pause();
  };

  useEffect(() => {
    if (current) {
      play();
    }
  }, [current]);

  return (
    <AppContext.Provider
      value={{
        mode,
        setMode,
        songs,
        setSongs,
        songsSearch,
        setSongsSearch,
        queue,
        setQueue,
        popular,
        setPopular,
        recommend,
        setRecommend,
        loading,
        setLoading,
        current,
        setCurrent,
        history,
        setHistory,
        showFilter,
        filterState,
        setFilterState,
        filterLoading,
        setFilterLoading,
        isGlobalPlaying,
        setIsGlobalPlaying,
        audioRef,
        play,
        pause,
      }}
    >
      <ThemeProvider theme={theme}>
        {/* CssBaseline ensures consistent styling across browsers */}
        <CssBaseline />
        <audio
          ref={audioRef}
          src={current?.url}
          onEnded={() => setIsGlobalPlaying(false)}
        />
        {children}{" "}
      </ThemeProvider>
    </AppContext.Provider>
  );
};
