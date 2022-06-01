import React, { useEffect } from "react";
import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  Icon,
  Text,
  Stack,
  HStack,
  VStack,
  Button,
} from "@chakra-ui/react";
import { useNavigate } from "react-router";
import { CheckIcon } from "@chakra-ui/icons";
import { useSelector } from "react-redux";

// Replace test data with your own
const features = Array.apply(null, Array(8)).map(function (x, i) {
  return {
    id: i,
    title: "Lorem ipsum dolor sit amet",
    text: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam.",
  };
});

function AdminDashboard() {
  const navigate = useNavigate();
  const AddCourse = () => {
    navigate("/adminAddCourse");
  };
  const UpdateCourse = () => {
    navigate("/adminUpdateCourse");
  };
  const RemoveCourse = () => {
    navigate("/adminRemoveCourse");
  };
  const UpdateTeacher = () => {
    navigate("/adminUpdateTeacher");
  };
  const AllCourses = () => {
    navigate("/adminAllCourses");
  };
  const AllTeachers = () => {
    navigate("/adminAllTeachers");
  };
  const Requests = () => {
    navigate("/adminRequests");
  };
  const removeTechers = () => {
    navigate("/adminRemoveTechers");
  };

  const { user } = useSelector((state) => state.auth);

  
  useEffect(() => {
    if (!localStorage.getItem("adminToken")) navigate("/adminLogin");
  }, []);
  return (
    <>
      <Box p={4}>
        <Stack spacing={4} as={Container} maxW={"3xl"} textAlign={"center"}>
          <Heading fontSize={"3xl"}>Admin Dashboard</Heading>
          <Text color={"gray.600"} fontSize={"xl"}>
            Welcome {user?.name}!
          </Text>
        </Stack>

        <Container maxW={"6xl"} mt={10}>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={10}>
            <HStack
              align={"top"}
              bg={"blue.300"}
              borderRadius={"xl"}
              padding={"5%"}
              onClick={AddCourse}
            >
              <Box color={"green.400"} px={2}>
                <Icon as={CheckIcon} />
              </Box>
              <VStack align={"start"}>
                <Text fontWeight={600}>Add Course</Text>
                <Text color={"gray.600"}>Done</Text>
              </VStack>
            </HStack>

            <HStack
              align={"top"}
              bg={"yellow.300"}
              borderRadius={"xl"}
              padding={"5%"}
              onClick={UpdateCourse}
            >
              <Box color={"green.400"} px={2}>
                <Icon as={CheckIcon} />
              </Box>
              <VStack align={"start"}>
                <Text fontWeight={600}>Update Course</Text>
                <Text color={"gray.600"}>text</Text>
              </VStack>
            </HStack>

            <HStack
              align={"top"}
              bg={"pink.300"}
              borderRadius={"xl"}
              padding={"5%"}
              onClick={RemoveCourse}
            >
              <Box color={"green.400"} px={2}>
                <Icon as={CheckIcon} />
              </Box>
              <VStack align={"start"}>
                <Text fontWeight={600}>Remove Course</Text>
                <Text color={"gray.600"}>Done</Text>
              </VStack>
            </HStack>

            <HStack
              align={"top"}
              bg={"orange.300"}
              borderRadius={"xl"}
              padding={"5%"}
              onClick={UpdateTeacher}
            >
              <Box color={"green.400"} px={2}>
                <Icon as={CheckIcon} />
              </Box>
              <VStack align={"start"}>
                <Text fontWeight={600}>Update Teachers Details</Text>
                <Text color={"gray.600"}>Done</Text>
              </VStack>
            </HStack>

            <HStack
              align={"top"}
              bg={"gray.300"}
              borderRadius={"xl"}
              padding={"5%"}
              onClick={AllCourses}
            >
              <Box color={"green.400"} px={2}>
                <Icon as={CheckIcon} />
              </Box>
              <VStack align={"start"}>
                <Text fontWeight={600}>View All Courses</Text>
                <Text color={"gray.600"}>Done</Text>
              </VStack>
            </HStack>

            <HStack
              align={"top"}
              bg={"purple.300"}
              borderRadius={"xl"}
              padding={"5%"}
              onClick={AllTeachers}
            >
              <Box color={"green.400"} px={2}>
                <Icon as={CheckIcon} />
              </Box>
              <VStack align={"start"}>
                <Text fontWeight={600}>View All Teachers</Text>
                <Text color={"gray.600"}>Done</Text>
              </VStack>
            </HStack>

            <HStack
              align={"top"}
              bg={"red.300"}
              borderRadius={"xl"}
              padding={"5%"}
              onClick={Requests}
            >
              <Box color={"green.400"} px={2}>
                <Icon as={CheckIcon} />
              </Box>
              <VStack align={"start"}>
                <Text fontWeight={600}>Pending Requests</Text>
                <Text color={"gray.600"}>Done</Text>
              </VStack>
            </HStack>

            <HStack
              align={"top"}
              bg={"green.300"}
              borderRadius={"xl"}
              padding={"5%"}
              onClick={removeTechers}
            >
              <Box color={"green.400"} px={2}>
                <Icon as={CheckIcon} />
              </Box>
              <VStack align={"start"}>
                <Text fontWeight={600}>Remove Teachers</Text>
                <Text color={"gray.600"}>Done</Text>
              </VStack>
            </HStack>
          </SimpleGrid>
        </Container>
      </Box>
    </>
  );
}

export default AdminDashboard;
