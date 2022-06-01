import React, { useState, useEffect } from "react";
import axios from "../../utils/axios";
import { Rating } from "@mui/material";
import { SimpleGrid, GridItem, Text, Button } from "@chakra-ui/react";
import styled from "styled-components";
function RemoveCourse() {
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

  const CourseOverview = (props) => {
    const CourseOverviewContainer = styled("div")(() => ({
      width: "95%",
      height: "350px",
      backgroundColor: "white",
      boxShadow: "0px 8px 20px rgba(35, 35, 35, 0.1)",
      display: "flex",
      flexDirection: "column",
      marginBottom: "20px",
      borderRadius: "5px",
      transition: "0.3s ease-in",
      "&:hover": {
        transform: "scale(1.05)",
        boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
      },
    }));

    const CourseImage = styled("div")(({ url }) => ({
      width: "100%",
      height: "60%",
      backgroundImage: `url('${url}')`,
      backgroundPosition: "center",
      backgroundSize: "cover",
      borderRadius: "5px 5px 0px 0px",
    }));

    const CourseData = styled("div")(() => ({
      width: "100%",
      flex: 1,
      // backgroundColor:'red',
      padding: "8px ",
      "& .course-author": {
        fontSize: "0.8em",
        color: "#646464",
      },
      "& .course-name": {
        fontWeight: 700,
      },
    }));

    const handleClick = async () => {
      // console.log(props.course._id)
      const res = await axios.post("admin/deleteCourse", {
        headers: {
          "Content-type": "application/json",
        },

        courseId: props.course._id,
      });
    };
    return (
      <>
        <CourseOverviewContainer>
          <CourseImage url={props.course.thumbnail} />
          <CourseData>
            <div className="course-name">{props.course.title}</div>
            <div className="course-author">{props.course.teacherName}</div>
            <Rating value={5} readOnly />
            <div>Price:{props.course.price}</div>
            <Button
              width="100%"
              marginTop={2}
              size="sm"
              colorScheme={"red"}
              color="#fff"
              _hover=""
              onClick={handleClick}
            >
              Remove
            </Button>
          </CourseData>
        </CourseOverviewContainer>
      </>
    );
  };
  return (
    <>
      <Text
        fontSize="2xl"
        textAlign={"center"}
        fontWeight="600"
        margin="50px 0px 0px 0px"
      >
        ALL COURSES
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
    </>
  );
}

export default RemoveCourse;
