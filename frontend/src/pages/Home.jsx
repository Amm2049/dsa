import React, { useEffect, useState } from "react";
import { Typography, Box, Skeleton } from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useApp } from "../components/AppProvider";
import RecommendedSongs from "../components/RecommendedSongs";
import CurrentPlaying from "../components/CurrentPlaying";
import Popular from "../components/Popular";

function Home() {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const [randomSongs, setRandomSongs] = useState([]);

  const { mode, songs, popular, recommend, loading, current, setCurrent } =
    useApp(); // Destructure `current` and `setCurrent` from `useApp`

  useEffect(() => {
    if (songs.length !== 0) {
      const randomElements = songs
        .sort(() => Math.random() - 0.5) // Shuffle the array
        .slice(0, 5); // Pick the first 5 elements
      setRandomSongs(randomElements);
    }
  }, [songs]);

  return (
    <Box sx={{ p: 3, overflow: "hidden" }}>
      {/* Slider-Popular Section */}
      <Box sx={{ mb: 4, height: "400px", display: "flex", gap: 4 }}>
        <Box sx={{ width: "30%" }}>
          {loading ? (
            <>
              <Skeleton
                sx={{ borderRadius: 5, width: "100%", height: "300px" }}
                variant="avatar"
              />
              <Skeleton
                sx={{ m: "auto" }}
                variant="text"
                width={200}
                height={50}
              />
            </>
          ) : (
            <>
              <Slider arrows={false} {...settings}>
                {randomSongs.map((song) => (
                  <Box key={song.id} sx={{ textAlign: "center" }}>
                    <img
                      src={song.track_image}
                      alt={song.track_name}
                      style={{
                        width: "100%",
                        height: "300px",
                        objectFit: "cover",
                        borderRadius: 20,
                      }}
                    />
                    <Typography variant="h5" sx={{ mt: 2 }}>
                      {song.track_name}
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      sx={{ color: "text.secondary" }}
                    >
                      {song.artist_name}
                    </Typography>
                  </Box>
                ))}
              </Slider>
            </>
          )}
        </Box>

        {/* Popular Section */}
        <Popular popularSongs={popular} setCurrent={setCurrent} />

        <Box sx={{ width: "20%" }}>
          <CurrentPlaying current={current} />
        </Box>
      </Box>

      {/* Recommend Section */}
      <RecommendedSongs setCurrent={setCurrent} />
    </Box>
  );
}

export default Home;
