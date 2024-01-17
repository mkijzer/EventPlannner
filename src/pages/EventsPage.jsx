import React, { useState, useEffect } from "react";
import { Heading } from "@chakra-ui/react";
import { EventDetail } from "../components/Eventdetail";
import { Link } from "react-router-dom";

export const EventsPage = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const getEvents = async () => {
      const response = await fetch(`http://localhost:3000/events`);
      const data = await response.json();
      setEvents(data);

      console.log("Fetched data:", data);
    };

    getEvents();
  }, []);

  return (
    <div>
      <Heading>List of events</Heading>
      <ul>
        {events.map((event) => (
          <li key={event.id}>
            <Link to={`/event/$[event.id}`}>{event.title}</Link>
          </li>
        ))}
      </ul>
      {events.map((event) => (
        <EventDetail
          key={event.id}
          title={event.title}
          description={event.description}
          startTime={event.startTime}
          endTime={event.endTime}
          location={event.location}
          image={event.image}
        />
      ))}
    </div>
  );
};
