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

export const EditEventDrawer = ({ event, onClose }) => {
  const [title, setTitle] = useState(event.title);
  const [description, setDescription] = useState(event.description);
  const [location, setLocation] = useState(event.location);
  const [startTime, setStartTime] = useState(event.startTime);
  const [endTime, setEndTime] = useState(event.endTime);
  const [image, setImage] = useState(event.image);

  const handleUpdate = async (e) => {
    e.preventDefault();
    // Add your update logic here
    onClose(); // Close drawer after update
  };

  return (
    <Drawer isOpen={true} placement="right" onClose={onClose}>
      <DrawerOverlay>
        <DrawerContent>
          <DrawerHeader>Edit Event</DrawerHeader>
          <DrawerBody>
            <form onSubmit={handleUpdate}>
              <FormControl id="edit.title" isRequired>
                <FormLabel>Title</FormLabel>
                <Input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </FormControl>
              {/* Repeat for other fields like description, location, etc. */}
              <Button type="submit" mt={4} colorScheme="blue">
                Update Event
              </Button>
            </form>
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
};
