import React from "react";
import { Button } from "@chakra-ui/react";

export const DeleteButton = ({ onDelete }) => {
  return (
    <Button colorScheme="red" onClick={onDelete}>
      Delete
    </Button>
  );
};
