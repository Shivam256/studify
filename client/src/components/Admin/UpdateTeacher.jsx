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
  Input,
  
} from "@chakra-ui/react";
import axios from "../../utils/axios";
function UpdateTeacher() {

const updateData = async(id)=>{
  const res = await axios.post("/admin/updateTeacher", {
    headers: {
      "Content-type": "application/json",
    },
    data,id
  
  });
  console.log(res)
};



  const colorData = useColorModeValue(
    "radial(orange.600 1px, transparent 1px)",
    "radial(orange.300 1px, transparent 1px)"
  );
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [teachers, SetTeachers] = useState([]);
  const [data, setData] = useState({});
  const onChangeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    console.log(data)
  };
  const imageHandler = () => {
    let widget = window.cloudinary.createUploadWidget(
      {
        cloudName: `dx1ye2bro`,
        uploadPreset: `kp2gvmnk`,
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          setData({ ...data, thumbnail: result.info.url });
        }
      }
    );
    widget.open();
  };

  const getAllTeachers = async () => {
    const res = await axios.get("/admin/allTeachers", {
      headers: {
        "Content-type": "application/json",
      },
    });
    SetTeachers(res.data.allTeachers);
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
                  <Button
                    width="50%"
                    onClick={onOpen}
                    size="sm"
                    margin={2}
                    colorScheme={"teal"}
                  >
                    Update
                  </Button>
                </Box>
              </Box>
            </Box>

            <Modal isOpen={isOpen} size={"xl"} onClose={onClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Update Teacher Details</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <Input
                    placeholder={teacher._id}
                    value={teacher._id}
                    disabled
                  />
                  <Input
                    name="name"
                    placeholder={teacher.name}
                    type={"text"}
                    onChange={(e) => {
                      onChangeHandler(e);
                    }}
                  />
                  <Input
                    name="phone"
                    placeholder={teacher.phone}
                    type={"number"}
                    onChange={(e) => {
                      onChangeHandler(e);
                    }}
                  />
                  <Input
                    name="address"
                    placeholder={teacher.address}
                    type={"text"}
                    onChange={(e) => {
                      onChangeHandler(e);
                    }}
                  />
                  <Input
                    name="age"
                    placeholder={teacher.age}
                    type={"number"}
                    onChange={(e) => {
                      onChangeHandler(e);
                    }}
                  />
                  <Input
                    name="education"
                    placeholder={teacher.education}
                    type={"text"}
                    onChange={(e) => {
                      onChangeHandler(e);
                    }}
                  />

                  <Button onClick={imageHandler}>Upload Image</Button>
                  <Input
                    name="domain"
                    placeholder={teacher.domain}
                    type={"text"}
                    onChange={(e) => {
                      onChangeHandler(e);
                    }}
                  />
                </ModalBody>

                <ModalFooter>
                  <Button colorScheme="blue" mr={3} onClick={onClose}>
                    Close
                  </Button>
                  <Button onClick={()=>{updateData(teacher._id)}}>Update Data</Button>
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

export default UpdateTeacher;
