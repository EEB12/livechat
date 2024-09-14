import { Box, VStack, HStack, Input, Button, Text } from "@chakra-ui/react";
import React, { useState } from "react";

const ChatWindow = ({ room, messages }) => {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message.trim()) {
      // Send the message (for now, just add to the local state)
      messages.push({ content: message, isMine: true });
      setMessage("");
    }
  };

  if (!room) {
    return (
      <Box flex="1" p="4">
        <Text>Select a room to start chatting!</Text>
      </Box>
    );
  }

  return (
    <Box flex="1" display="flex" flexDirection="column" p="4">
      <Box flex="1" overflowY="auto" mb="4">
        <VStack spacing="4" align="stretch">
          {messages.map((msg, idx) => (
            <HStack
              key={idx}
              justify={msg.isMine ? "flex-end" : "flex-start"}
            >
              <Box
                bg={msg.isMine ? "teal.500" : "gray.200"}
                color={msg.isMine ? "white" : "black"}
                p="3"
                borderRadius="md"
                maxWidth="70%"
              >
                <Text>{msg.content}</Text>
              </Box>
            </HStack>
          ))}
        </VStack>
      </Box>
      <HStack>
        <Input
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          flex="1"
        />
        <Button onClick={handleSend} colorScheme="teal">
          Send
        </Button>
      </HStack>
    </Box>
  );
};

export default ChatWindow;