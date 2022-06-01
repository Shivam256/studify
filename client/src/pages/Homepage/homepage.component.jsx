import React, { useEffect, useState } from "react";
import axios from "../../utils/axios";
import { HomepageContainer, HomepageBanner } from "./homepage.styles";
import HomepageImg from "../../assets/homepageBanner.png";
import CourseOverview from "../../components/courseOverview/courseOverview.component";
import { SimpleGrid, GridItem, Text } from "@chakra-ui/react";

const Homepage = () => {
  const [data, setData] = useState("");
  const [courses, setCourses] = useState([]);

  const handleChange = (e) => {
    setData(e.target.value);
  };

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
    <HomepageContainer>
      <HomepageBanner
        url={HomepageImg}
        height={["200px", "230px", "260px", "330px", "400px"]}
      />
      <Text fontSize="2xl" fontWeight="600" margin="50px 0px 0px 0px">
        COURSES FROM TOP EDUCATORS:
      </Text>
      <SimpleGrid
        columns={[2, 2, 3, 4, 5]}
        spacing={["10px", "20px", "25px", "25px", "30px"]}
        width="100%"
        margin="20px auto 20px auto"
      >
        {courses.map((course) => {
          return (
            <GridItem>
              <CourseOverview course={course} />
            </GridItem>
          );
        })}
      </SimpleGrid>
    </HomepageContainer>
  );
};

export default Homepage;
