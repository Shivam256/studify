import React, { useEffect, useState } from "react";
import axios from "../../utils/axios";
import CourseOverview from "../../components/courseOverview/courseOverview.component";
import { SimpleGrid, GridItem, Text } from "@chakra-ui/react";
function AllCourses() {
  const [courses, setCourses] = useState([]);
  const getAllCourses = async () => {
    const res = await axios.get("/course/getAll", {
      headers: {
        "Content-type": "application/json",
      },
    });
    setCourses(res.data.allCourses);
  };

  useEffect(() => {
    getAllCourses();
  }, []);
  return (
    <>
      <Text fontSize="2xl" textAlign={"center"} fontWeight="600" margin="50px 0px 0px 0px">
       ALL COURSES
      </Text>
      <SimpleGrid
        columns={[2, 2, 3, 4, 5]}
        spacing={["10px", "20px", "25px", "25px", "30px"]}
        width="100%"
        margin="20px"
      >
        {courses.map((course) => {
          return (
            <GridItem>
              <CourseOverview course={course} />
            </GridItem>
          );
        })}
      </SimpleGrid>
    </>
  );
}

export default AllCourses;
