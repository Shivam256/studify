import React, { useEffect, useState } from "react";
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
import axios from "../../utils/axios";

function AllTeachers() {
  const colorData = useColorModeValue(
    "radial(orange.600 1px, transparent 1px)",
    "radial(orange.300 1px, transparent 1px)"
  );
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [teachers,SetTeachers] = useState([])
  const getAllTeachers = async () => {
    const res = await axios.get("/admin/allTeachers", {
      headers: {
        "Content-type": "application/json",
      },
    });
    SetTeachers(res.data.allTeachers);
    console.log(res.data.allTeachers)
  };

  useEffect(() => {
    getAllTeachers();
  }, []);
  return (
    

    <Container maxW={"7xl"} p="12">
      <Heading as="h1">All Teachers</Heading>
      <Divider marginTop="5" />
      {teachers.map((teacher) => {
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
                    src={teacher.image}
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
                <Heading margin="1">{teacher.name}</Heading>
                <Box>
                  <Text>Email : {teacher.email}</Text>
                  <Text>Phone : {teacher.phone}</Text>
                  <Text>Education : {teacher.education}</Text>
                  <Text>Domain : {teacher.domain}</Text>
                </Box>
                <Box marginTop={2}>
            <Button  width="50%" size="sm" onClick={onOpen} margin={2} colorScheme={"teal"}>ID Proof</Button>
          </Box>
              </Box>
            </Box>

            <Modal isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>ID Proof</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <Image src={teacher.idProof} />
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
  );
}

export default AllTeachers;
