import {
  FormControl,
  FormLabel,
  Input,
  Button,
  useToast,
  Stack,
  Radio,
  RadioGroup,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const AddEventForm = ({ handleClose }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [image, setImage] = useState("");
  const [error, setError] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const categories = [
    { name: "sports", id: 1 },
    { name: "games", id: 2 },
    { name: "relaxation", id: 3 },
  ];

  const navigate = useNavigate();
  const toast = useToast();

  const sendDataToServer = async () => {
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
          `The response from the network was not ok: ${response.statusText}`
        );
      }

      const data = await response.json();
      console.log("Success:", data);

      toast({
        title: "Success!",
        description: "You have created a new event",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top",
      });

      // Close the drawer
      handleClose();

      // Navigate to another route if necessary
      navigate("/");
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
    sendDataToServer();
  };

  return (
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
          placeholder="Start Time"
        />
      </FormControl>
      <FormControl id="event.endTime" isRequired>
        <FormLabel>End Time</FormLabel>
        <Input
          type="datetime-local"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          placeholder="End Time"
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
        <FormControl id="event.category">
          <FormLabel>Category</FormLabel>
          <RadioGroup onChange={setSelectedCategory} value={selectedCategory}>
            <Stack direction="row">
              {categories.map((category) => (
                <Radio key={category.id} value={category.id.toString()}>
                  {category.name}
                </Radio>
              ))}
            </Stack>
          </RadioGroup>
        </FormControl>
      </FormControl>
      <Button type="submit" mt={4} colorScheme="yellow">
        Add Event
      </Button>
      {error && <p>Error: {error}</p>}
    </form>
  );
};
