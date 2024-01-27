import React, { useState } from "react";
import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  FormControl,
  FormLabel,
  Input,
  Button,
} from "@chakra-ui/react";

export const EditEventDrawer = ({ event, onClose, onUpdate }) => {
  const [title, setTitle] = useState(event.title);
  const [description, setDescription] = useState(event.description);
  const [location, setLocation] = useState(event.location);
  const [startTime, setStartTime] = useState(event.startTime);
  const [endTime, setEndTime] = useState(event.endTime);
  const [image, setImage] = useState(event.image);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const updatedEvent = {
      ...event, // Spread the original event
      title,
      description,
      location,
      startTime,
      endTime,
      image,
    };
    onUpdate(updatedEvent); // Pass the updated event to the parent
    onClose();
  };

  return (
    <Drawer isOpen={true} placement="right" onClose={onClose}>
      <DrawerOverlay>
        <DrawerContent
          bgGradient="linear(to-b, #1A1A1A, #F637EC)"
          fontFamily="monospace"
          color="#16FF00"
        >
          <DrawerHeader color="#16FF00">Make a change</DrawerHeader>
          <DrawerBody>
            <form onSubmit={handleUpdate}>
              <FormControl id="event.title" isRequired>
                <FormLabel>Title</FormLabel>
                <Input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Title"
                />
              </FormControl>
              <FormControl id="event.description" isRequired>
                <FormLabel>Description</FormLabel>
                <Input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Description"
                />
              </FormControl>
              <FormControl id="event.location" isRequired>
                <FormLabel>Location</FormLabel>
                <Input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Location"
                />
              </FormControl>
              <FormControl id="event.startTime" isRequired>
                <FormLabel>Start Time</FormLabel>
                <Input
                  type="datetime-local"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  placeholder="date + time"
                />
              </FormControl>
              <FormControl id="event.endTime" isRequired>
                <FormLabel>End Time</FormLabel>
                <Input
                  type="datetime-local"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  placeholder="date + time"
                />
              </FormControl>
              <FormControl id="event.image">
                <FormLabel>Image</FormLabel>
                <Input
                  type="text"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  placeholder="URL of your image"
                />
              </FormControl>
              {/* Repeat for other fields like description, location, etc. */}
              <Button type="submit" mt={4} colorScheme="yellow">
                Update Event
              </Button>
            </form>
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
};
