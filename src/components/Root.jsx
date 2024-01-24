import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { Navigation } from "./Navigation";
import { Flex, Box } from "@chakra-ui/react";

export const Root = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <>
      <Navigation onSearch={setSearchQuery} />
      <Outlet context={{ searchQuery }} />{" "}
    </>
  );
};
