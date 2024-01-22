import React from "react";
import { Link } from "react-router-dom";
import {
  UnorderedList,
  ListItem,
  Box,
  Heading,
  Flex,
  Text,
  Spacer,
  HStack,
} from "@chakra-ui/react";
import { Button } from "./Button";

export const Navigation = () => {
  return (
    <Flex as="nav" p="40px" ml="10px" mr="10px" alignItems="center" gap="10px">
      <Heading
        // as="h1"
        // p="10px"
        // pl="20px"
        // ml="3px"
        // mt="3px"
        // mb="3px"
        color="#E4F1FF"
        // size="2xl"
      >
        <Link to="/">MyEvents</Link>
      </Heading>

      <Spacer />
      <HStack spacing="40px">
        <Box bg="gray.200" p="10px">
          M
        </Box>
        <Text color="#F8E559">
          <Link to="/event/1">Card</Link>
        </Text>
        <Text color="#F8E559">
          <Link to="/">List</Link>
        </Text>
      </HStack>
    </Flex>

    // <Flex align="center" justify="space-between" p="4">
    //   <nav>
    //     <UnorderedList
    //       listStyleType="none"
    //       display="flex"
    //       flexDirection="row"
    //       justifyContent="flex-start"
    //     >
    //       <ListItem>
    //         <Link to="/">Events</Link>
    //       </ListItem>
    //       <ListItem>
    //         <Link to="/event/1">Event</Link>
    //       </ListItem>
    //     </UnorderedList>
    //   </nav>
    //   <Box textAlign="center">
    //     <Heading size="2xl" color="white">
    //       My Events
    //     </Heading>
    //   </Box>
    // </Flex>
  );
};
