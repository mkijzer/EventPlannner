import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { Navigation } from "./Navigation";
import { AddEventDrawer } from "./AddEventDrawer";
import { Flex, Box } from "@chakra-ui/react";

export const Root = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddEventDrawerOpen, setAddEventDrawerOpen] = useState(false);

  const handleOpenAddEventDrawer = () => {
    setAddEventDrawerOpen(true);
  };

  const handleCloseAddEventDrawer = () => {
    setAddEventDrawerOpen(false);
  };

  return (
    <>
      <Navigation
        handleOpenAddEventDrawer={handleOpenAddEventDrawer}
        onSearch={setSearchQuery}
      />
      <AddEventDrawer
        isOpen={isAddEventDrawerOpen}
        onClose={handleCloseAddEventDrawer}
        handleClose={handleCloseAddEventDrawer}
      />
      <Outlet context={{ searchQuery }} />{" "}
    </>
  );
};
