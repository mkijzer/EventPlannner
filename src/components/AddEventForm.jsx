import {
  FormControl,
  FormLabel,
  Input,
  Button,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const AddEventForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [image, setImage] = useState("");
  const [error, setError] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(true);

  const navigate = useNavigate();

  const toast = useToast();

  const sendDataToServer = async (
    title,
    description,
    location,
    startTime,
    endTime,
    image
  ) => {
    try {
      const response = await fetch("http://localhost:3000/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          location,
          startTime,
          endTime,
          image,
        }),
      });

      if (!response.ok) {
        throw new Error(
          `The respond from the network was not ok ${response.statusText}`
        );
      }

      const data = await response.json();
      console.log("Succes:", data);
      setIsFormOpen(false);
      navigate("/");

      toast({
        title: "Succes!",
        description: "You have created a new event",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    } catch (error) {
      console.error("Error:", error);
      setError(error.message);

      toast({
        title: "Error creating event",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendDataToServer(title, description, location, startTime, endTime, image);
  };

  return (
    <>
      {/* <h2>New Event</h2> */}
      {isFormOpen && (
        <form onSubmit={handleSubmit}>
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

          <Button type="submit" mt={4} colorScheme="blue">
            Add Event
          </Button>
        </form>
      )}
    </>
  );
};
