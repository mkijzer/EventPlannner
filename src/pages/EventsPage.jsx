import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { UnorderedList, ListItem, Box, Flex } from "@chakra-ui/react";

import { Button } from "../components/Button";
import { EventCard } from "../components/EventCard";
import { AddEventDrawer } from "../components/AddEventDrawer";

// Utility function to format date with month name
const formatDateWithMonthName = (dateString) => {
  try {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  } catch (error) {
    console.error("Error formatting date:", error);
    return dateString; // Return the original string if there's an error
  }
};

export const EventsPage = () => {
  const { searchQuery } = useOutletContext();
  const [isAddEventDrawerOpen, setAdeventDrawerOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [events, setEvents] = useState([]);

  const handleOpenAddEventDrawer = () => {
    console.log("Button is clicked to open drawer");
    setAdeventDrawerOpen(true);
  };

  const handleCloseAddEventDrawer = () => {
    setAdeventDrawerOpen(false);
  };

  const toggleAddEventForm = () => {
    setShowForm(!showForm);
  };

  useEffect(() => {
    const getEvents = async () => {
      const response = await fetch(`http://localhost:3000/events`);
      const data = await response.json();
      const sortedData = data.sort(
        (a, b) => new Date(a.startTime) - new Date(b.startTime)
      );
      setEvents(sortedData);
    };

    getEvents();
  }, []);

  const filteredEvents = events.filter((event) => {
    return Object.values(event).some((value) => {
      if (typeof value === "string") {
        if (value.includes("-")) {
          // Simple check to see if the value might be a date
          const formattedDate = formatDateWithMonthName(value);
          return formattedDate
            .toLowerCase()
            .includes(searchQuery.toLowerCase());
        }
        return value.toLowerCase().includes(searchQuery.toLowerCase());
      }
      return false;
    });
  });

  return (
    <Box>
      <Box
        mt="2"
        ml={{ base: "0", md: "11%" }}
        mr={{ base: "30", md: "0" }}
        textAlign={{ base: "right", md: "left" }}
        position="relative"
        _hover={{
          zIndex: 3,
        }}
        transition="z-index 0.2s ease"
      >
        <Box
          display="inline-block"
          position="relative"
          zIndex="1"
          _hover={{
            boxShadow: { base: "0 5px 15px rgba(0, 0, 0, 0.3)", md: "none" },
          }}
          transition="box-shadow 0.2s ease"
        >
          <Button
            buttontext="New Event"
            onClick={handleOpenAddEventDrawer}
            colorScheme="yellow"
            fontFamily="monospace"
            variant="ghost"
            size="xs"
            shadow="md"
            borderColor="red"
            transition="0.2s ease"
          />
        </Box>
      </Box>

      <Flex
        justifyContent={{ base: "center", md: "flex-start" }} // Center on small screens, default alignment on larger screens
        alignItems="center"
        flexDirection="column"
        className="events-container"
      >
        <UnorderedList
          listStyleType="none"
          m={1}
          p={1}
          display="flex"
          flexWrap="wrap"
          gap="10px"
          width="80%"
        >
          {filteredEvents.map((event) => (
            <ListItem
              key={event.id}
              className="event-card"
              flexBasis={{ base: "250px", md: "300px", lg: "350px" }}
              mb={{ base: "-85px", md: "0" }} // Increased negative margin
              position="relative"
              zIndex="1" // Standard zIndex
              _hover={{
                zIndex: 2, // Higher zIndex on hover
                transform: { base: "translateY(-61px)", md: "none" },
                boxShadow: {
                  md: "none",
                },
              }}
              _last={{ transform: { base: "none", md: "none" } }} // No transform on the last card
              transition="transform 0.2s ease, z-index 0.2s ease"
            >
              <EventCard event={event} />
            </ListItem>
          ))}
          {isAddEventDrawerOpen && (
            <AddEventDrawer
              isOpen={isAddEventDrawerOpen}
              showForm={showForm}
              toggleAddEventForm={toggleAddEventForm}
              onClose={handleCloseAddEventDrawer}
            />
          )}
        </UnorderedList>
      </Flex>
    </Box>
  );
};
