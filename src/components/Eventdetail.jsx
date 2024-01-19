import React from "react";
import { Box, Button } from "@chakra-ui/react";
import { DeleteButton } from "./DeleteButton";
import { AlertWindow } from "./ConfirmWindow";

export const EventDetail = ({
  title,
  description,
  startTime,
  endTime,
  location,
  image,
  onDelete,
  isAlertOpen,
  onClose,
  onConfirm,
}) => {
  return (
    <div>
      <h2>{title}</h2>
      <p>{description}</p>
      <p>{startTime}</p>
      <p>{endTime}</p>
      <p>{location}</p>

      <Box boxSize="200px">
        <img src={image} alt={title} />
      </Box>
      <DeleteButton onDelete={onDelete} />
      {/* <Button colorScheme="red" onClick={onOpen}>
        Delete event
      </Button> */}
      <AlertWindow
        isOpen={isAlertOpen}
        onClose={onClose}
        onConfirm={onConfirm}
        title="Verwijder Dropshot Evenement"
        message="Weet je het zeker? Nu Moeten ze alleen die dropshot naar binnen shuffelen! "
      />
    </div>
  );
};
