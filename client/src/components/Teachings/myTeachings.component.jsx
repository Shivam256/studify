import React, { useEffect } from "react";
import { Flex, Image, Center, Button } from "@chakra-ui/react";
import myteaching from "../../assets/images/myteaching.png";
import axios from "../../utils/axios";
import { useState } from "react";
import CourseOverview from "../../components/courseOverview/courseOverview.component";
import { SimpleGrid, GridItem, Text } from "@chakra-ui/react";
const MyTeachings = () => {
  const [course, setCourse] = useState([]);
  const getData = async (req, res) => {
    try {
      let data = await axios.get("/user/myTeachings", {
        headers: {
          "Content-type": "application/json",
        },
      });
      setCourse(data.data.courses);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      {course ? (
        <>
          <SimpleGrid
            columns={[2, 2, 3, 4, 5]}
            spacing={["10px", "20px", "25px", "25px", "30px"]}
            width="100%"
            margin="20px auto 20px auto"
          >
            {course.map((corr) => {
            return (
            <GridItem>
              <CourseOverview course={corr} />
            </GridItem>
             ); 
})} 
          </SimpleGrid>
        </>
      ) : (
        <>
          <Flex
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
          >
            <Image
              w={{ base: "10rem", md: "20rem" }}
              h={{ base: "10rem", md: "20rem" }}
              m="2rem"
              src={myteaching}
            ></Image>
            <Center
              fontSize={{ base: "1rem", md: "1.7rem" }}
              textAlign="center"
            >
              You havent made any courses yet. Make a course and start teaching
              !
            </Center>
            <Button
              m="2rem"
              color="white"
              _hover={{ bg: "#a6a0ff" }}
              backgroundColor="#6c63ff"
            >
              Create a Course here!
            </Button>
          </Flex>
        </>
      )}
    </>
  );
};
export default MyTeachings;
