import React, { useState, useEffect } from "react";
import { Heading } from "@chakra-ui/react";
import { EventDetail } from "../components/Eventdetail";
import { useParams, useNavigate } from "react-router-dom";

export const EventPage = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [isAlertOpen, setisAlertOpen] = useState(false);

  const onOpen = () => setisAlertOpen(true);
  const onClose = () => setisAlertOpen(false);

  useEffect(() => {
    const getEvent = async () => {
      try {
        const response = await fetch(`http://localhost:3000/events/${eventId}`);
        const data = await response.json();
        setEvent(data);
      } catch (error) {
        console.error("Error fetching event:", error);
      }
    };

    getEvent();
  }, [eventId]);

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

  return (
    <div>
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
        />
      )}
    </div>
  );
};
