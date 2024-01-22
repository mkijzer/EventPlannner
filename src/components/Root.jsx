import React from "react";
import { Outlet } from "react-router-dom";
import { Navigation } from "./Navigation";
import { Flex, Box } from "@chakra-ui/react";

export const Root = () => {
  return (
    <>
      <Navigation />

      <Outlet />
    </>
  );
};
