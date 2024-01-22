import React from "react";
import { Link } from "react-router-dom";
import { Box, Text, Image, Card } from "@chakra-ui/react";

export const EventCard = ({ event, onSelec }) => {
  const formatStartDate = (startTime) => {
    const date = new Date(startTime);
    const month = new Intl.DateTimeFormat("en", { month: "short" }).format(
      date
    );
    const year = new Intl.DateTimeFormat("en", { year: "numeric" }).format(
      date
    );
    const day = date.getDate();
    return `${month} ${day} ${year}`;
  };
  return (
    <Link to={`/event/${event.id}`}>
      <Card
        border=""
        borderRadius="md"
        p="4"
        m="2"
        cursor="pointer"
        maxW="800px"
        minW="345px"
        minH="150px"
        overflow="hidden"
        position="relative"
        boxShadow="xl"
        rounded="md"
        bg="black"
        _hover={{
          transform: "translateY(-10px)",
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
          />
          <Box
            position="absolute"
            top="0"
            left="0"
            width="100%"
            height="100%"
            backgroundColor="rgba(35, 62, 139, 0.5)"
          ></Box>
        </Box>
        <Box zIndex="1" position="relative">
          <Text fontSize="4xl" maxW="100%" color="white">
            {event.title}
          </Text>

          <Text
            fontSize="md"
            overflow="hidden"
            whiteSpace="nowrap"
            textOverflow="ellipsis"
            mb="2"
            maxWidth="100%"
            color="white"
          >
            {event.location}
          </Text>
        </Box>
        <Text
          fontSize="sm"
          color="#FFFFC7"
          position="absolute"
          bottom="2"
          right="2"
        >
          {formatStartDate(event.startTime)}
        </Text>
      </Card>
    </Link>
  );
};
