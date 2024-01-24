import React, { useState, useEffect } from "react";
import { Box } from "@chakra-ui/react";
import { EventDetail } from "../components/Eventdetail";
import { useParams, useNavigate } from "react-router-dom";
import { EditEventDrawer } from "../components/EditEventDrawer";

export const EventPage = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [events, setEvents] = useState([]); // State to store all events
  const [event, setEvent] = useState(null);
  const [isAlertOpen, setisAlertOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const onOpen = () => setisAlertOpen(true);
  const onClose = () => setisAlertOpen(false);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(`http://localhost:3000/events/${eventId}`);
        const data = await response.json();
        setEvent(data);
      } catch (error) {
        console.error("Error fetching event:", error);
      }
    };

    fetchEvents();
  }, []);

  const navigateToEvent = (newEventId) => {
    navigate(`/events/${newEventId}`);
  };

  const navigateToPreviousEvent = () => {
    const currentIndex = events.findIndex((e) => e.id === event.id);
    if (currentIndex > 0) {
      navigateToEvent(events[currentIndex - 1].id);
    }
  };

  const navigateToNextEvent = () => {
    const currentIndex = events.findIndex((e) => e.id === event.id);
    if (currentIndex >= 0 && currentIndex < events.length - 1) {
      navigateToEvent(events[currentIndex + 1].id);
    }
  };

  const handleActualDeletion = () => {
    handleEventDelete(event.id);
    onClose();
  };

  const handleEventDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/events/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        navigate("/");
      } else {
        console.error("Failed to delete the event");
      }
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  const handleEdit = () => {
    setIsEditMode(true);
  };

  return (
    <div>
      <Box
        position="absolute"
        top="40%"
        left="100px"
        cursor="pointer"
        fontSize="2xl"
        color="#16FF00"
        onClick={navigateToPreviousEvent}
      >
        {"<"}
      </Box>

      <Box
        position="absolute"
        top="40%"
        right="100px"
        cursor="pointer"
        fontSize="2xl"
        color="#16FF00"
        onClick={navigateToNextEvent}
      >
        {">"}
      </Box>

      {event && (
        <EventDetail
          title={event.title}
          description={event.description}
          startTime={event.startTime}
          endTime={event.endTime}
          location={event.location}
          image={event.image}
          onDelete={onOpen}
          isAlertOpen={isAlertOpen}
          onClose={onClose}
          onConfirm={handleActualDeletion}
          onEdit={handleEdit}
        />
      )}
      {isEditMode && (
        <EditEventDrawer event={event} onClose={() => setIsEditMode(false)} />
      )}
    </div>
  );
};
