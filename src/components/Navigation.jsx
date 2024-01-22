import React from "react";
import { Link } from "react-router-dom";
import { UnorderedList, ListItem, Box, Heading, Flex } from "@chakra-ui/react";

export const Navigation = () => {
  return (
    <Flex align="center" justify="space-between" p="4">
      <nav>
        <UnorderedList
          listStyleType="none"
          display="flex"
          flexDirection="row"
          justifyContent="flex-start"
        >
          <ListItem>
            <Link to="/">Events</Link>
          </ListItem>
          <ListItem>
            <Link to="/event/1">Event</Link>
          </ListItem>
        </UnorderedList>
      </nav>
      <Box textAlign="center">
        <Heading size="2xl" color="white">
          My Events
        </Heading>
      </Box>
    </Flex>
  );
};
