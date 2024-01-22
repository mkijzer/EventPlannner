import React, { useState, useEffect } from "react";
import {
  Heading,
  UnorderedList,
  ListItem,
  Box,
  Image,
  Flex,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
} from "@chakra-ui/react";
import { EventDetail } from "../components/Eventdetail";
import { Link } from "react-router-dom";
import { AddEventForm } from "../components/AddEventForm";
import { Button } from "../components/Button";
import { EventCard } from "../components/EventCard";

export const EventsPage = () => {
  const [showForm, setShowForm] = useState(false);
  const [events, setEvents] = useState([]);

  const toggleAddEventForm = () => {
    setShowForm(!showForm);
  };

  useEffect(() => {
    const getEvents = async () => {
      const response = await fetch(`http://localhost:3000/events`);
      const data = await response.json();
      setEvents(data);
    };

    getEvents();
  }, []);

  return (
    <Box>
      {/* <Box textAlign="center" mt="6">
        <Heading size="2xl" color="white">
          My Events
        </Heading>
      </Box> */}

      <Box mt="2" ml="11%">
        <Button
          buttontext="New Event"
          onClick={toggleAddEventForm}
          colorScheme="blue"
          variant="ghost"
          size="sm"
          shadow="md"
          borderColor="red"
          transition="0.2s ease"
        />
      </Box>

      <Drawer isOpen={showForm} placement="top" onClose={toggleAddEventForm}>
        <DrawerOverlay />
        <DrawerContent bg="black">
          <DrawerHeader>Create a New Event</DrawerHeader>
          <DrawerBody>
            <AddEventForm />
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      <Flex justifyContent="center" alignItems="center" flexDirection="column">
        <UnorderedList
          listStyleType="none"
          m={1}
          p={1}
          display="flex"
          flexWrap="wrap"
          gap="10px"
          width="80%"
        >
          {events.map((event) => (
            <ListItem key={event.id} flexBasis="300px">
              <EventCard event={event} />
            </ListItem>
          ))}
        </UnorderedList>
      </Flex>
    </Box>
  );
};
