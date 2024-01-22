import React from "react";
import {
  Box,
  Image,
  Text,
  Card as ChakraCard,
  Stack,
  Heading,
  Button,
  CardBody,
  CardFooter,
  Center,
} from "@chakra-ui/react";
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
    <Center h="60vh">
      <ChakraCard
        direction={{ base: "column", sm: "row" }}
        overflow="hidden"
        variant="outline"
        boxShadow="xl p=6 rounded=md bg=white"
        minWidth="50%"
        position="relative"
      >
        <Image
          objectFit="cover"
          maxW={{ base: "100%", sm: "200px" }}
          src={image}
          alt={title}
          style={{ position: "relative" }}
        />
        <Box
          position="absolute"
          top="0"
          left="0"
          width="100%"
          height="100%"
          borderRadius="md"
          overflow="hidden"
          backgroundColor="rgba(0, 0, 255, 0.5)"
          style={{ mixBlendMode: "multiply" }}
        />

        <Stack style={{ position: "relative", zIndex: 1 }}>
          <CardBody>
            <Heading size="md">{title}</Heading>

            <Text fontSize="md">{description}</Text>
            <Text>{startTime}</Text>
            <Text>{endTime}</Text>
            <Text>{location}</Text>
          </CardBody>

          <CardFooter>
            <DeleteButton onDelete={onDelete} variant="solid" />
          </CardFooter>

          <AlertWindow
            isOpen={isAlertOpen}
            onClose={onClose}
            onConfirm={onConfirm}
            title="Delete Event"
            message="Are you sure? This can't be undone!"
          />
        </Stack>
      </ChakraCard>
    </Center>
  );
};
