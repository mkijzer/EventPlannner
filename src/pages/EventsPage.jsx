import React, { useState, useEffect } from "react";
import { Heading, UnorderedList, ListItem } from "@chakra-ui/react";
import { EventDetail } from "../components/Eventdetail";
import { Link } from "react-router-dom";
import { AddEventForm } from "../components/AddEventForm";
import { Button } from "../components/Button";

export const EventsPage = () => {
  const [showForm, setShowForm] = useState(false);
  const [events, setEvents] = useState([]);

  const toggleAddEventForm = () => {
    setShowForm(!showForm);
  };

  useEffect(() => {
    const getEvents = async () => {
      const response = await fetch(`http://localhost:3000/events`);
      const data = await response.json();
      setEvents(data);
    };

    getEvents();
  }, []);

  return (
    <div>
      <Heading>My Events</Heading>
      <UnorderedList listStyleType="none" m={0} p={0}>
        {events.map((event) => (
          <ListItem key={event.id}>
            <Link to={`/event/${event.id}`}>{event.title}</Link>
            {/* <EventDetail
              onDelete={() => deleteEvent(event.id)}
              title={event.title}
              description={event.description}
              startTime={event.startTime}
              endTime={event.endTime}
              location={event.location}
              image={event.image}
            /> */}
          </ListItem>
        ))}
      </UnorderedList>
      {/* <Link to="/event/new">New Event</Link> */}

      {/* {selectedEventId !== null && (
        <EventDetail
          key={selectedEventId}
          title={events[selectedEventId - 1].title}
          description={events[selectedEventId - 1].description}
          startTime={events[selectedEventId - 1].startTime}
          endTime={events[selectedEventId - 1].endTime}
          location={events[selectedEventId - 1].location}
          image={events[selectedEventId - 1].image}
        />
      )} */}
      <Button buttontext="New Event" onClick={toggleAddEventForm} />
      {showForm && <AddEventForm />}
    </div>
  );
};
