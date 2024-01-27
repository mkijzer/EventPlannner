import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import {
  UnorderedList,
  ListItem,
  Box,
  Flex,
  Radio,
  RadioGroup,
  Stack,
  Center,
} from "@chakra-ui/react";

import { Button } from "../components/Button";
import { EventCard } from "../components/EventCard";
import eventsData from "/Users/mike/Winc/final_project/events.json";
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
  const [selectedCategory, setSelectedCategory] = useState("All Categories");

  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
  };

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

  const categoryNames = eventsData.categories.map((category) => category.name);

  // useEffect(() => {
  //   setEvents(eventsData.events);
  // }, []);

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
    // Filter by category
    const categoryFilter =
      selectedCategory === "All Categories" ||
      event.categoryIds.some((categoryId) => {
        const category = eventsData.categories.find((c) => c.id === categoryId);
        return category && category.name === selectedCategory;
      });

    // Filter by search query
    const searchFilter = searchQuery
      ? Object.values(event).some((value) => {
          if (typeof value === "string") {
            return value.toLowerCase().includes(searchQuery.toLowerCase());
          }
          return false;
        })
      : true;

    return categoryFilter && searchFilter;
  });

  return (
    <Box>
      <Center>
        <RadioGroup
          onChange={handleCategoryChange}
          value={selectedCategory}
          colorScheme="yellow"
          color="yellow"
        >
          <Stack direction="row">
            <Radio value="All Categories" size="sm" colorScheme="yellow">
              All Categories
            </Radio>

            {categoryNames.map((categoryName) => (
              <Radio
                key={categoryName}
                value={categoryName}
                size="sm"
                mr="30px"
                colorScheme="yellow"
                fontColor="yellow"
              >
                {categoryName}
              </Radio>
            ))}
          </Stack>
        </RadioGroup>
      </Center>
      <Box
        mt="4"
        ml={{ base: "0", md: "11%" }}
        mr={{ base: "20", md: "0" }}
        textAlign={{ base: "right", md: "left" }}
        position="relative"
        _hover={{
          zIndex: 3,
        }}
        transition="z-index 0.2s ease"
        overflow="hidden"
      >
        <Box
          display={{ base: "none", md: "block", lg: "block" }}
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
