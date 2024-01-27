import React from "react";
import { Link } from "react-router-dom";
import { Box, Text, Image, Card } from "@chakra-ui/react";

export const EventCard = ({ event }) => {
  const formatStartDate = (startDate) => {
    try {
      const date = new Date(startDate);
      if (isNaN(date)) {
        throw new Error("Invalid date");
      }
      const options = { year: "numeric", month: "long", day: "numeric" };
      return date.toLocaleDateString("en-US", options);
    } catch (error) {
      console.error("Error formatting date:", error);
      return "Invalid date"; // Return a default message or an empty string
    }
  };

  return (
    <Link to={`/event/${event.id}`}>
      <Card
        maxW={{ base: "200px", md: "330px", lg: "300px" }}
        minW={{ base: "270px", md: "330px", lg: "350px" }}
        border=""
        borderRadius="md"
        p="4"
        m="2"
        cursor="pointer"
        // maxW="800px"
        // minW="345px"
        minH="150px"
        overflow="hidden"
        position="relative"
        boxShadow="xl"
        rounded="md"
        bg="black"
        _hover={{
          transform: "translateY(-2px)",
          "& > div > img": {
            transform: "scale(1.05)",
          },
        }}
      >
        <Box
          position="absolute"
          top="0"
          left="0"
          width="100%"
          height="100%"
          borderRadius="md"
          overflow="hidden"
        >
          <Image
            src={event.image}
            alt={event.title}
            objectFit="cover"
            boxSize="100%"
            transition="transform 0.3s ease-in-out"
          />
          <Box
            position="absolute"
            top="0"
            left="0"
            width="100%"
            height="100%"
            backgroundColor="rgba(15, 98, 146, 0.6)"
          ></Box>
        </Box>
        <Box zIndex="1" position="relative">
          <Text
            fontSize="2xl"
            maxW="100%"
            color="#16FF00"
            fontFamily="monospace"
            marginTop="35px"
          >
            {event.title}
          </Text>
          <Text
            fontSize="xs"
            overflow="hidden"
            whiteSpace="nowrap"
            textOverflow="ellipsis"
            mb="2"
            maxWidth="100%"
            color="#FFED00"
            fontFamily="monospace"
            marginLeft="2px" // Add left margin of 2px
          >
            {event.location}
          </Text>
        </Box>
        <Text
          fontSize="sm"
          color="#FFED00"
          position="absolute"
          top="2"
          right="2"
          fontFamily="monospace"
        >
          {formatStartDate(event.startTime)}
        </Text>
      </Card>
    </Link>
  );
};
