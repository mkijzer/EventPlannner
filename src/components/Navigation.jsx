import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Flex,
  Heading,
  HStack,
  IconButton,
  Box,
  Text,
  Spacer,
  InputGroup,
  InputLeftElement,
  Input,
  ScaleFade,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

export const Navigation = ({ onSearch }) => {
  const [searchInput, setSearchInput] = useState("");
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const handleSearchChange = (event) => {
    setSearchInput(event.target.value);
    onSearch(event.target.value);
  };

  const toggleSearchVisibility = () => {
    setIsSearchVisible(!isSearchVisible);
  };

  return (
    <Box>
      <Flex
        as="nav"
        p="40px"
        ml="10px"
        mr="10px"
        alignItems="center"
        gap="10px"
      >
        <Heading
          bgGradient="linear(to-r, #FFED00, #F637EC)"
          bgClip="text"
          color="transparent"
          fontFamily="monospace"
          fontSize={{ base: "2xl", md: "5xl", lg: "8xl" }}
        >
          <Link to="/">MY>EVENTs</Link>
        </Heading>

        <Spacer />

        <HStack spacing="40px">
          <Text
            color="#F8E559"
            _hover={{
              transform: "translateY(-2px)",
              "& > div > img": {
                transform: "scale(1.05)",
              },
            }}
          >
            <Link to="/event/1">Card</Link>
          </Text>
          <Text
            color="#F8E559"
            _hover={{
              transform: "translateY(-2px)",
              "& > div > img": {
                transform: "scale(1.05)",
              },
            }}
          >
            <Link to="/">List</Link>
          </Text>

          <IconButton
            colorScheme="yellow"
            aria-label="Search"
            icon={<SearchIcon />}
            onClick={toggleSearchVisibility}
          />

          {isSearchVisible && (
            <ScaleFade initialScale={1.7} in={isSearchVisible}>
              <InputGroup ml="10px">
                <InputLeftElement pointerEvents="none">
                  <SearchIcon color="gray.300" />
                </InputLeftElement>
                <Input
                  placeholder="Search for an event"
                  value={searchInput}
                  onChange={handleSearchChange}
                />
              </InputGroup>
            </ScaleFade>
          )}
        </HStack>
      </Flex>
    </Box>
  );
};
