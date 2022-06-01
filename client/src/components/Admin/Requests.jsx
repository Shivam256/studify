import React, { useEffect, useState } from "react";
import axios from "../../utils/axios";

import {
  Box,
  Heading,
  Image,
  Text,
  Divider,
  useColorModeValue,
  Container,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";

function Requests() {
  const [requests, setRequests] = useState([]);
  const getAllReqs = async () => {
    const res = await axios.get("/admin/allTeacherRequests", {
      headers: {
        "Content-type": "application/json",
      },
    });
    setRequests(res.data.reqArr);
  };

  useEffect(() => {
    getAllReqs();
  }, []);
  const colorData = useColorModeValue(
    "radial(orange.600 1px, transparent 1px)",
    "radial(orange.300 1px, transparent 1px)"
  );
  const { isOpen, onOpen, onClose } = useDisclosure();

  const declineRequest = async (id) => {
    const decline = await axios.post("/admin/declineRequest", {
      headers: {
        "Content-type": "application/json",
      },
      teacherID:id
    });
    console.log(decline)
  };

  const acceptRequest = async (id) => {
    const accept = await axios.post("/admin/verifyTeacher", {
      headers: {
        "Content-type": "application/json",
      },
      teacherID:id
    });
    console.log(accept)
  };

  return (
    <>
      <Container maxW={"7xl"} p="12">
        <Heading as="h1">Pending Requests</Heading>
        <Divider marginTop="5" />
        {requests.map((req) => {
          return (
            <>
              <Box
                padding={2}
                backgroundColor={"blackAlpha.100"}
                borderRadius={"10px"}
                marginTop={{ base: "1", sm: "5" }}
                display="flex"
                flexDirection={{ base: "column", sm: "row" }}
                justifyContent="space-between"
              >
                <Box
                  display="flex"
                  flex="1"
                  marginRight="3"
                  position="relative"
                  alignItems="center"
                >
                  <Box
                    width={{ base: "100%", sm: "85%" }}
                    zIndex="2"
                    marginLeft={{ base: "0", sm: "5%" }}
                    marginTop="5%"
                  >
                    <Image
                      width={"300px"}
                      borderRadius="lg"
                      src={req.image}
                      alt="some good alt text"
                      objectFit="contain"
                    />
                  </Box>
                  <Box zIndex="1" width="50%" position="absolute" height="100%">
                    <Box
                      bgGradient={colorData}
                      backgroundSize="20px 20px"
                      opacity="0.4"
                      height="100%"
                    />
                  </Box>
                </Box>
                <Box
                  display="flex"
                  flex="1"
                  flexDirection="column"
                  justifyContent="center"
                  marginTop={{ base: "3", sm: "0" }}
                >
                  <Heading margin="1">{req.name}</Heading>
                  <Box>
                    <Text>Email : {req.email}</Text>
                    <Text>Phone : {req.phone}</Text>
                    <Text>Education : {req.education}</Text>
                    <Text>Domain : {req.domain}</Text>
                  </Box>
                  <Box marginTop={2}>
                    <Button
                      width="25%"
                      size="sm"
                      margin={2}
                      colorScheme={"teal"}
                      onClick={onOpen}
                    >
                      ID Proof
                    </Button>
                    <Button
                      width="25%"
                      size="sm"
                      margin={2}
                      colorScheme={"green"}
                      onClick={() => {
                        acceptRequest(req._id);
                      }}
                    >
                      Accept
                    </Button>
                    <Button
                      width="25%"
                      size="sm"
                      margin={2}
                      colorScheme={"red"}
                      onClick={async() => {
                        declineRequest(req._id);
                      }}
                    >
                      Decline
                    </Button>
                  </Box>
                </Box>
              </Box>

              <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>ID Proof</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                    <Image src={req.idProof} />
                  </ModalBody>

                  <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={onClose}>
                      Close
                    </Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
            </>
          );
        })}

        <Divider marginTop="5" />
      </Container>
    </>
  );
}

export default Requests;
