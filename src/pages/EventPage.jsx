import React, { useState, useEffect } from "react";
import { Heading, Button } from "@chakra-ui/react";
import { EventDetail } from "../components/Eventdetail";
import { useParams, useNavigate } from "react-router-dom";

export const EventPage = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  // console.log(eventId);
  const [event, setEvent] = useState(null);
  const [isAlertOpen, setisAlertOpen] = useState(false);
  const onOpen = () => setisAlertOpen(true);
  console.log("Opening AlertWindow");

  const onClose = () => setisAlertOpen(false);

  useEffect(() => {
    const getEvent = async () => {
      const response = await fetch(`http://localhost:3000/events/${eventId}`);
      const data = await response.json();
      setEvent(data);
    };

    getEvent();
  }, [eventId]);

  const handleActualDeletion = () => {
    handleEventDelete(event.id);
    onClose();
  };

  const handleEventDelete = async (id) => {
    console.log("attempting to delete event with ID: ", id);

    try {
      const response = await fetch(`http://localhost:3000/events/${id}`, {
        method: "DELETE",
      });

      console.log("Server response:", response);

      if (response.ok) {
        console.log("Event is deleted succesfully");
        navigate("/");
      } else {
        console.error("failed to delete the event");
      }
    } catch (error) {
      console.error("There was an error deleting the event:", error);
    }
  };

  return (
    <div>
      <Heading>{event && event.title}</Heading>
      {event && (
        <EventDetail
          key={event.id}
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
