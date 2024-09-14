import { Box, Heading, VStack, Button } from "@chakra-ui/react";
import React, { useState } from "react";

const Sidebar = ({ onJoinRoom }) => {
  const rooms = ["General", "Tech Talk", "Random"]; // Example rooms

  return (
    <Box bg="gray.100" w="300px" p="4" h="100vh" overflowY="auto">
      <Heading size="md" mb="4">
        Rooms
      </Heading>
      <VStack align="stretch">
        {rooms.map((room, idx) => (
          <Button
            key={idx}
            onClick={() => onJoinRoom(room)}
            colorScheme="teal"
            w="100%"
          >
            {room}
          </Button>
        ))}
      </VStack>
      <Button mt="4" colorScheme="blue" w="100%">
        Create Room
      </Button>
    </Box>
  );
};

export default Sidebar;