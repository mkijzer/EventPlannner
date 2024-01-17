import React from "react";
import { Box } from "@chakra-ui/react";

export const EventDetail = ({
  title,
  description,
  startTime,
  endTime,
  location,
  image,
}) => {
  return (
    <div>
      <h2>{title}</h2>
      <p>{description}</p>
      <p>{startTime}</p>
      <p>{endTime}</p>
      <p>{location}</p>

      <Box boxSize="200px">
        <img src={image} alt={title} />
      </Box>
    </div>
  );
};
