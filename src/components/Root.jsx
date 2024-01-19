import React from "react";
import { Outlet } from "react-router-dom";
import { Navigation } from "./Navigation";
import { Flex, Box } from "@chakra-ui/react";

export const Root = () => {
  return (
    <Flex justifyContent="center" alignItems="center" height="100vh" p={0}>
      <Box
        border="2px solid"
        borderColor="orange"
        borderRadius={50}
        width="60%"
        heigth="80%"
        p={40}
      >
        <Flex flexDirection="row" height="100%">
          <Box width="20%" minWidth="200px">
            <Navigation />
          </Box>
          <Box width="80%" flexGrow={1}>
            <Outlet />
          </Box>
        </Flex>
      </Box>
    </Flex>
  );
};
