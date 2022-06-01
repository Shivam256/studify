import { Box } from "@chakra-ui/layout";
import React, { useEffect, useReducer } from "react";

import { useSelector } from "react-redux";
import { Button } from "@chakra-ui/button";
import { Flex } from "@chakra-ui/layout";
import { Image, Avatar } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { initializeUser } from "../../hooks/useAuth";
import { useDispatch } from "react-redux";
import { Text } from "@chakra-ui/layout";
const DashBoard = () => {
  let user = useSelector((store) => store.auth.user);
  const dispatch = useDispatch();
  useEffect(() => {
    initializeUser(dispatch);
  }, [dispatch]);
  console.log(user);
  return (
    <Flex
      fontFamily="'Montserrat', sans-serif"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      {!user?.hasProfile ? (
        <Box
          fontSize={{ base: "1rem", md: "2rem" }}
          p="20px 70px 50px 70px"
          boxShadow="0px 8px 20px rgba(35, 35, 35, 0.1)"
          m="4rem"
          borderRadius="5px"
        >
          Oops! You Do not have a profile.
          <br />
          <Button
            color="white"
            m="1rem 0rem"
            fontSize="1.2rem"
            w="100%"
            _hover={{ bg: "#a6a0ff" }}
            backgroundColor="#6c63ff"
          >
            <Link to="/createProfile">Create Your Profile</Link>
          </Button>
        </Box>
      ) : (
        <Flex
          width={["90%", "90%", "70%", "65%", "60%"]}
          padding="20px"
          boxShadow="0px 8px 20px rgba(35, 35, 35, 0.1)"
          margin="30px"
        >
          <Avatar
            src={user.image}
            width={["100px", null, "150px", "150px", "200px"]}
            height={["100px", null, "150px", "150px", "200px"]}
          />
          <Box marginLeft="20px">
            <Flex alignItems="center">
              <Text fontSize="3xl" fontWeight="600">
                {user.name}
              </Text>
              {user?.isTeacher ? (
                <Text
                  display="inline"
                  fontSize="md"
                  fontWeight="600"
                  marginLeft="20px"
                  border="2px solid 	#50C878"
                  color="	#50C878"
                  padding="1px 15px"
                  borderRadius="5px"
                >
                  TEACHER
                </Text>
              ) : null}
            </Flex>
            <Flex alignItems="flex-end">
              <Text
                fontWeight="500"
                fontSize="xl"
                marginRight="10px"
                marginTop="5px"
              >
                Email:
              </Text>
              <Text fontSize="xl">{user.email}</Text>
            </Flex>
            <Flex alignItems="center">
              <Text
                fontWeight="500"
                fontSize="xl"
                marginRight="10px"
                marginTop="5px"
              >
                Education:
              </Text>
              <Text fontSize="xl">{user.education}</Text>
            </Flex>
            <Flex alignItems="center">
              <Text
                fontWeight="500"
                fontSize="xl"
                marginRight="10px"
                marginTop="5px"
              >
                Age:
              </Text>
              <Text fontSize="xl">{user.age}</Text>
            </Flex>
            <Flex>
              <Flex alignItems="flex-end">
                <Text
                  fontWeight="500"
                  fontSize="xl"
                  marginRight="10px"
                  marginTop="5px"
                >
                  Purchased:
                </Text>
                <Text fontSize="xl">{user.myEnrolledCourses.length}</Text>
              </Flex>
              <Flex alignItems="flex-end" marginLeft="20px">
                <Text
                  fontWeight="500"
                  fontSize="xl"
                  marginRight="10px"
                  marginTop="5px"
                >
                  Created:
                </Text>
                <Text fontSize="xl">0</Text>
              </Flex>
            </Flex>
          </Box>
        </Flex>
      )}
    </Flex>
  );
};
export default DashBoard;
