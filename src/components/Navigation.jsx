import React from "react";
import { Link } from "react-router-dom";
import { UnorderedList, ListItem } from "@chakra-ui/react";

export const Navigation = () => {
  return (
    <nav>
      <UnorderedList listStyleType="none">
        <ListItem>
          <Link to="/">Events</Link>
        </ListItem>
        <li>
          <Link to="/event/1">Event</Link>
        </li>
      </UnorderedList>
    </nav>
  );
};
