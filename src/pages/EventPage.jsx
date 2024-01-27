import React, { useState, useEffect } from "react";
import { Box } from "@chakra-ui/react";
import { EventDetail } from "../components/Eventdetail";
import { useParams, useNavigate } from "react-router-dom";
import { EditEventDrawer } from "../components/EditEventDrawer";

export const EventPage = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [event, setEvent] = useState(null);
  const [isAlertOpen, setisAlertOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const onOpen = () => setisAlertOpen(true);
  const onClose = () => setisAlertOpen(false);

  const saveUpdatedEvent = async (updatedEvent) => {
    try {
      const response = await fetch(
        `http://localhost:3000/events/${updatedEvent.id}`,
        {
          method: "PUT", // Use PUT or PATCH to update the event
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedEvent),
        }
      );

      if (response.ok) {
        setEvent(updatedEvent);
        onClose();
      } else {
        console.error("Failed to update the event");
      }
    } catch (error) {
      console.error("Error updating event:", error);
    }
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        // Fetch all events
        const allEventsResponse = await fetch("http://localhost:3000/events");
        const allEvents = await allEventsResponse.json();
        setEvents(allEvents);

        const eventResponse = await fetch(
          `http://localhost:3000/events/${eventId}`
        );
        const eventDetails = await eventResponse.json();
        setEvent(eventDetails);
      } catch (error) {
        console.error("Error fetching event:", error);
      }
    };

    fetchEvents();
  }, [eventId]);

  const navigateToEvent = (newEventId) => {
    navigate(`/event/${newEventId}`);
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
        left={{ base: "15px", sm: "20px", md: "40px", lg: "230px" }}
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
        right={{ base: "15px", sm: "20px", md: "40px", lg: "230px" }}
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

      {isEditMode && (
        <EditEventDrawer
          event={event}
          onClose={() => setIsEditMode(false)}
          onUpdate={saveUpdatedEvent} // Pass saveUpdatedEvent as a prop
        />
      )}
    </div>
  );
};
