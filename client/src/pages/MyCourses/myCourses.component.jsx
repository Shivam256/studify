import React, { useEffect, useState } from "react";

import { MyCoureseContainer } from "./myCourses.styles";

import CourseOverview from "../../components/courseOverview/courseOverview.component";
import { SimpleGrid, GridItem, Text, Box } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { Button } from "@chakra-ui/button";
import { ReactComponent as EmptyCart } from "../../assets/svgs/emptyCart.svg";

import { Link } from "react-router-dom";
const MyCourses = () => {
  const user = useSelector((store) => store.auth.user);
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    setCourses(user.myEnrolledCourses);
    console.log(user.myEnrolledCourses);
  }, []);

  return (
    <MyCoureseContainer>
      {courses.length === 0 ? (
        <Box display="flex" flexDirection="column" alignItems="center" width="80%" margin="0 auto">
          <Box
            width={[200, 300, 350, 360, 400]}
            height={[200, 300, 350, 360, 400]}
          >
            <EmptyCart width="100%" height="100%" />
          </Box>

          <Text fontSize={["lg", "xl", "xl", "2xl", "2xl"]} fontWeight="600" margin="50px 0px 20px 0px" textAlign="center">
            YOU HAVE NOT PURCHASED ANY COURSE FIND SOME HERE <br />
          </Text>
          <Button
            color="white"
            _hover={{ bg: "#a6a0ff" }}
            backgroundColor="#6c63ff"
          >
            <Link to="/home">Browse Courses</Link>
          </Button>
        </Box>
      ) : (
        <>
          <Text fontSize="2xl" fontWeight="600" margin="50px 0px 0px 0px">
            COURSES YOU HAVE PURCHASED:
          </Text>
          <SimpleGrid
            columns={[2, 2, 3, 4, 5]}
            spacing={["10px", "20px", "25px", "25px", "30px"]}
            width="100%"
            margin="20px auto 20px auto"
          >
            {courses
              .slice()
              .filter((c) => c.courseID !== null)
              .map((cour) => {
                console.log(cour);
                return (
                  <GridItem>
                    <CourseOverview course={cour.courseID} />
                  </GridItem>
                );
              })}
          </SimpleGrid>
        </>
      )}
    </MyCoureseContainer>
  );
};

export default MyCourses;
