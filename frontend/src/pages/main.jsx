import { Box, Flex, Heading, Text, Button } from "@chakra-ui/react";
import React, { useState } from "react";
import { useEffect} from 'react';
import Sidebar from "../component/Sidebar";
import io from 'socket.io-client';
import ChatWindow from "../component/ChatWindow";
import { jwtDecode } from "jwt-decode";
const Main = () => {
  const [notification, setNotification] = useState(null);
    const [activeRoom, setActiveRoom] = useState(null);
    const [messages, setMessages] = useState([]); 
    const [socket, setSocket] = useState(null);
    const token = localStorage.getItem("Token");
    const joinRoom = (room) => {
        setActiveRoom(room);
        setMessages([]); // Fetch messages for the selected room
      };
    
      useEffect(() => {
        if (token) {
          // Decode JWT
          const decoded = jwtDecode(token);
          const { id_user } = decoded;
    
          const initSocket = io("http://localhost:3000", {
            query: {
              id_user,
            },
          });
    
          setSocket(initSocket);
    
          // Listen for connection
          initSocket.on("connect", () => {
            console.log("Connected to the server with socket ID:", initSocket.id);
          });
    
          // Listen for disconnection
          initSocket.on("disconnect", () => {
            console.log("Disconnected from the server");
          });
          initSocket.on("new-notification", (data) => {
            setNotification(data.message);
          });
          // Cleanup
          return () => {
            initSocket.disconnect();
          };
    
        }
      }, [token]);
      return (
        <Flex h="100vh">
          <Sidebar onJoinRoom={joinRoom} />
          <ChatWindow room={activeRoom} messages={messages} />
        </Flex>
      );
}

export default Main;
