import React from "react";
import {
  Box,
  Image,
  Text,
  Card,
  Stack,
  Heading,
  CardHeader,
  CardBody,
  CardFooter,
  Center,
  Flex,
  Button,
} from "@chakra-ui/react";
import { DeleteButton } from "./DeleteButton";
import { AlertWindow } from "./ConfirmWindow";
import { EditButton } from "./EditButton";

const formatStartDate = (startTime) => {
  if (!startTime) return "Unknown start date";
  const date = new Date(startTime);
  if (isNaN(date)) return "Invalid start date";
  const month = new Intl.DateTimeFormat("en", { month: "short" }).format(date);
  const year = new Intl.DateTimeFormat("en", { year: "numeric" }).format(date);
  const day = date.getDate();
  return `${month} ${day}, ${year}`;
};

const formatEndDate = (endTime) => {
  if (!endTime) return "Unknown end date";
  const date = new Date(endTime);
  if (isNaN(date)) return "Invalid end date";
  const month = new Intl.DateTimeFormat("en", { month: "short" }).format(date);
  const year = new Intl.DateTimeFormat("en", { year: "numeric" }).format(date);
  const day = date.getDate();
  return `${month} ${day}, ${year}`;
};

export const EventDetail = ({
  title,
  description,
  startTime,
  endTime,
  location,
  image,
  onDelete,
  onEdit,
  isAlertOpen,
  onClose,
  onConfirm,
}) => {
  const formattedStartDate = formatStartDate(startTime);
  const formattedEndDate = formatEndDate(endTime);

  return (
    <Center h="60vh">
      <Card
        direction={{ base: "column", sm: "row" }}
        overflow="hidden"
        variant="outline"
        minWidth="50%"
        position="relative"
        border="none"
        boxShadow="dark-lg"
        p="6"
        rounded="md"
        bg="white"
      >
        <Image
          objectFit="cover"
          maxW={{ base: "100%", sm: "200px" }}
          src={image}
          alt={title}
          style={{ position: "relative", filter: "blur(5px)" }}
        />
        <Box
          position="absolute"
          top="0"
          left="0"
          width="100%"
          height="100%"
          borderRadius="md"
          overflow="hidden"
          backgroundColor="rgba(15, 98, 146, 0.6)"
          border="none"
          style={{ mixBlendMode: "multiply" }}
        />

        <Stack style={{ position: "relative", zIndex: 1 }}>
          <CardBody fontFamily="monospace">
            <Heading mb="10px" size="2xl" color="#16FF00">
              {title}
            </Heading>
            <Text fontSize="md">{description}</Text>
            <Text>Start: {formattedStartDate}</Text>
            <Text>End: {formattedEndDate}</Text>
            <Text>{location}</Text>
          </CardBody>

          <CardFooter>
            <EditButton onEdit={onEdit} colorScheme="yellow" />
            <DeleteButton onDelete={onDelete} colorScheme="red" />
          </CardFooter>

          <AlertWindow
            isOpen={isAlertOpen}
            onClose={onClose}
            onConfirm={onConfirm}
            title="Delete Event"
            message="Are you sure? This can't be undone!"
          />
        </Stack>
      </Card>
    </Center>
  );
};
