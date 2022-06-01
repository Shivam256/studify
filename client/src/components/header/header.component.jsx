import React, { useState, useEffect } from "react";

import { Icon } from "@iconify/react";
import IconButton from "../icon-button/icon-button.component";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Text,
  Flex,
  Box,
  Image,
} from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
import { Avatar } from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { HeaderContainer } from "./header.styles";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import { ReactComponent as Logo } from "../../assets/LOGO.svg";

import { getAllCourses } from "../../hooks/useCourse";

const SidebarBtn = ({ url, children }) => {
  const { pathname } = useLocation();
  const [selected, setSelectd] = useState(false);
  useEffect(() => {
    setSelectd(pathname === url);
  }, [pathname, url]);

  const navigate = useNavigate();
  const handleClick = () => {
    navigate(url);
  };

  return (
    <Button
      margin="12px 0"
      width="80%"
      onClick={handleClick}
      backgroundColor={selected ? "#6C63FF" : "#fff"}
      color={selected ? "#fff" : "#000"}
      _hover=""
    >
      {children}
    </Button>
  );
};

const CoursePreview = ({ course, ...props }) => {
  return (
    <Flex
      height="50px"
      padding="5px 10px"
      alignItems="center"
      _hover={{ backgroundColor: "#dfdfdf" }}
      cursor="pointer"
      {...props}
    >
      <Image
        src={course.thumbnail}
        height="40px"
        width="40px"
        borderRadius="5px"
        marginRight="10px"
      />{" "}
      {course.title}
    </Flex>
  );
};

const Dropdown = ({ searchQuery, courses }) => {
  const [filteredCourses, setFilteredCourse] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    setFilteredCourse(courses);
    setQuery(searchQuery);
    const newCourses = courses.filter((course) =>
      course.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredCourse(newCourses);
  }, [searchQuery]);

  const navigate = useNavigate();

  return (
    <Box
      width="70vw"
      marginLeft="90px"
      zIndex="99999"
      position="absolute"
      top="60px"
      backgroundColor="#fff"
      borderRadius="10px"
      maxHeight="200px"
      overflowY="scroll"
      display={query.length > 0 ? "block" : "none"}
    >
      {filteredCourses.map((course) => (
        <CoursePreview
          course={course}
          key={course}
          onClick={() => {
            navigate(`/course/${course._id}`);
            setQuery("");
          }}
        />
      ))}
    </Box>
  );
};

const Header = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [placement, setPlacement] = React.useState("left");
  const user = useSelector((store) => store.auth.user);
  const dispatch = useDispatch();
  const [courses, setCourses] = useState([]);

  const [searchText, setSearchText] = useState("");

  const handleLogout = () => {
    logout(dispatch);
  };

  React.useEffect(() => {
    getAllCourses().then((res) => {
      console.log(res);
      setCourses(res);
    });
  }, []);
  return (
    <HeaderContainer>
      <IconButton onClick={onOpen}>
        <Icon
          icon="ic:round-arrow-forward-ios"
          fontSize={"2em"}
          color={"#6C63FF"}
        />
      </IconButton>
      <Link to="/home">
        <Logo width="40px" height="40px" style={{ marginLeft: "20px" }} />
      </Link>
      <Input
        display="inline"
        width="70%"
        variant="filled"
        placeholder="Search Courses"
        _focus=""
        marginLeft="30px"
        value={searchText}
        onChange={(e) => {
          setSearchText(e.target.value);
        }}
      />

      <Dropdown courses={courses} searchQuery={searchText} />
      <Drawer placement={placement} onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent
          height="96vh"
          margin="2vh 0px 2vh 1vw"
          borderRadius="10px"
        >
          <DrawerCloseButton />

          <DrawerHeader
            borderBottomWidth="1px"
            display="flex"
            flexDirection="column"
            alignItems="center"
          >
            <Avatar
              name="Dan Abrahmov"
              src={
                user?.image
                  ? user?.image
                  : "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pinterest.com%2Fprincessamo321%2Fdefault-profile-pictures%2F&psig=AOvVaw2IMy6YjfVAFfQtr8uDzfGi&ust=1642947200223000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCNDL87jFxfUCFQAAAAAdAAAAABAD"
              }
              height="170px"
              width="170px"
              margin="30px auto"
            />
            <Text>{user?.name ? user?.name : "no name"}</Text>
          </DrawerHeader>
          <DrawerBody display="flex" flexDirection="column" alignItems="center">
            <SidebarBtn url="/home">ALL COURSES</SidebarBtn>
            <SidebarBtn url="/my-courses">MY COURSES</SidebarBtn>
            <SidebarBtn url="/dashboard">MY PROFILE</SidebarBtn>
            <SidebarBtn url="/createCourse">CREATE COURSE</SidebarBtn>
            <SidebarBtn url="/myTeachings">MY TEACHINGS</SidebarBtn>
            <Button
              position="absolute"
              bottom="20px"
              leftIcon={<Icon icon="ri:logout-box-line" color="#000" />}
              onClick={handleLogout}
            >
              {" "}
              LOGOUT
            </Button>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </HeaderContainer>
  );
};

export default Header;
