import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Input,
    useDisclosure,
  } from "@chakra-ui/react";
  import React, { useState } from "react";
  
  const CreateRoomModal = ({ onCreateRoom }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [roomName, setRoomName] = useState("");
  
    const handleCreate = () => {
      if (roomName.trim()) {
        onCreateRoom(roomName);
        setRoomName("");
        onClose();
      }
    };
  
    return (
      <>
        <Button onClick={onOpen} colorScheme="blue" w="100%">
          Create Room
        </Button>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Create a New Room</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Input
                placeholder="Room Name"
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
              />
            </ModalBody>
            <ModalFooter>
              <Button variant="ghost" onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="blue" onClick={handleCreate}>
                Create
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    );
  };
  
  export default CreateRoomModal;