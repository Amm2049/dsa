import React from "react";
import { Box, Skeleton } from "@mui/material";

const SkeletonLoader = ({ variant, width, height }) => {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
      {/* Avatar Skeleton */}
      {variant === "avatar" && (
        <Skeleton variant="circular" width={40} height={40} />
      )}

      {/* Text Skeleton */}
      {variant === "text" && (
        <Skeleton variant="text" width={width || "80%"} height={height || 20} />
      )}

      {/* Rectangular Skeleton (e.g., card or image) */}
      {variant === "rect" && (
        <Skeleton
          variant="rectangular"
          width={width || 210}
          height={height || 118}
        />
      )}
    </Box>
  );
};

export default SkeletonLoader;
