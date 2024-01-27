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
    <Center h="70vh">
      <Card
        direction={{ base: "column", sm: "row" }}
        overflow="hidden"
        variant="outline"
        minWidth={{ base: "290px", sm: "75%", md: "80%", lg: "50%", xl: "50%" }}
        maxWidth={{ base: "280px" }}
        maxHeight={{ base: "100%", md: "280px" }}
        position="relative"
        border="none"
        boxShadow="dark-lg"
        p="6"
        rounded="md"
        bg="white"
      >
        <Box
          mt={{ base: "10px", sm: "20px", md: "15px", lg: "20px" }}
          w={{ base: "100%", sm: "40%", md: "200px", lg: "30%" }}
          minHeight={{ base: "100px", sm: "10vh", md: "20vh", lg: "20vh" }}
          bgImage={`url(${image})`}
          bgSize="cover"
          bgPosition="center"
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
          <CardBody fontFamily="monospace" ml={{ sm: "20px", md: "10px" }}>
            {/* TITLE */}
            <Heading
              fontSize={{ base: "xl", sm: "md", md: "xl", lg: "3xl" }}
              mb="20px"
              size="2xl"
              color="#16FF00"
            >
              {title}
            </Heading>

            {/* DESCRIPTION */}
            <Text
              fontSize={{ base: "xs", sm: "sm", md: "sm", lg: "lg" }} // Tiny text on small screens
              mb="5px"
            >
              {description}
            </Text>

            {/* STARTTIME */}
            <Text
              fontSize={{ base: "xs", sm: "xs", md: "sm", lg: "md" }} // Tiny text on small screens
            >
              Start: {formattedStartDate}
            </Text>

            {/* ENDTIME */}
            <Text
              fontSize={{ base: "xs", sm: "xs", md: "sm", lg: "md" }} // Tiny text on small screens
            >
              End: {formattedEndDate}
            </Text>

            {/* LOCATION */}
            <Text
              fontSize={{ base: "xs", sm: "xs", md: "sm", lg: "sm" }}
              mb="10px"
              pb="10px" // Tiny text on small screens
            >
              {location}
            </Text>
          </CardBody>

          <CardFooter ml={{ sm: "20px" }}>
            <EditButton onEdit={onEdit} colorScheme="yellow" />
            <DeleteButton onDelete={onDelete} colorScheme="purple" />
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
