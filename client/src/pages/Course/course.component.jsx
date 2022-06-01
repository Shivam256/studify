import React, { useState, useEffect } from "react";
import { SimpleGrid, Box, Text, Button, Flex, Spacer } from "@chakra-ui/react";
import { Rating } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import useRazorpay from "react-razorpay";
// import { Rating } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import API from "../../utils/axios";
import { initializeUser } from "../../hooks/useAuth";

import { CourseContainer, CourseImage } from "./course.styles";
import { deleteCourse, getCourse } from "../../hooks/useCourse";
import RatingOverview from '../../components/ratingOverview/ratingOverview.component';

let course = {
  thumbnail:
    "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1173&q=80",
  title: "Learning Blockchain By Building Your Own Javascript",
  teacherName: "Dr. A.B.C",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
};

const Course = () => {
  const [isEnrolled, setIsEnrolled] = useState(false);
  const dispatch = useDispatch();
  const props = useLocation();
  console.log(props);
  const [course, setCourse] = useState(null);
  // course = props?.state?.course;
  // setCourse(props?.state?.course);

  const [rating, setRating] = useState(course?.rating);
  const Razorpay = useRazorpay();
  const { user } = useSelector((state) => state.auth);
  const createOrder = async (amount) => {
    const res = await API.post("/user/buyCourse/createorder", { amount });
    return res;
  };

  const handleRating = async (e, rate) => {
    setRating(rate);
    const res = await API.post("/course/rate", {
      rate: rating,
      course_id: course?._id,
    });

    console.log(res);
  };

  const handlePayment = async () => {
    let order = await createOrder(course?.price * 100);
    order = order.data.razorRes;

    console.log(order);
    var options = {
      key: "rzp_test_7o3KFikLV8ENjP", // Enter the Key ID generated from the Dashboard
      amount: order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: order.currency,
      name: "Studify",
      description: "Test Transaction",
      // "image": "https://example.com/your_logo",
      order_id: order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      // callback_url: "http://localhost:3000/user/razor/callback",
      handler: async (res) => {
        // alert(res.razorpay_payment_id);
        // alert(res.razorpay_order_id);
        // alert(res.razorpay_signature) ;
        const payload = {
          payment_id: res.razorpay_payment_id,
          order_id: res.razorpay_order_id,
          razor_signature: res.razorpay_signature,
          user_id: user._id,
          course_id: course?._id,
        };
        const response = await API.post("/user/razor/callback", payload);
        initializeUser(dispatch);
        console.log(response);
      },
      prefill: {
        name: user.name,
        email: user.email,
        contact: user.phone,
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#6c63ff",
      },
    };
    var rzp1 = new Razorpay(options);
    rzp1.on("payment.failed", (response) => {
      alert(response.error.code);
      alert(response.error.description);
      alert(response.error.source);
      alert(response.error.step);
      alert(response.error.reason);
      alert(response.error.metadata.order_id);
    });
    rzp1.open();
  };

  useEffect(() => {
    const id = props.pathname.slice(8);
    console.log(id, "here");
    getCourse(dispatch, id).then((res) => {
      setCourse(res);
      const enrolledCourses = user.myEnrolledCourses;

      setIsEnrolled(enrolledCourses.some((a) => a?.courseID?._id === res?._id));
    });
  }, [user, props.pathname]);
  // useEffect(() => {
  //   const id = props.pathname.slice(8);
  //   console.log(id, "here");
  //   getCourse(dispatch, id).then((res) => setCourse(res));
  // }, [props.pathname]);

  useEffect(()=>{
    console.log(course,"this is the state course");
  },[course])

  const EnrololedButton = () => {
    return (
      <Button
        width="48%"
        backgroundColor="#6C63FF"
        _hover=""
        color="#fff"
        onClick={() => {
          navigate(`/course/learn/${course?._id}`);
        }}
      >
        Resume
      </Button>
    );
  };
  const NotEnrolledButton = () => {
    return (
      <>
        {course?.teacherId !== currUser?._id && (
          <>
            <Button
              width="48%"
              backgroundColor="#6C63FF"
              _hover=""
              color="#fff"
              onClick={handlePayment}
            >
              BUY NOW
            </Button>
            <Spacer />
            <Button
              width="48%"
              variant="outline"
              color="#6C63FF"
              borderColor="#6C63FF"
              borderWidth="2px"
            >
              ADD TO WISHLIST
            </Button>
          </>
        )}
      </>
    );
  };
  // };
  const currUser = useSelector((store) => store.auth.user);
  const navigate = useNavigate();
  return (
    <CourseContainer
      padding={[
        "10px 5px 20px 5px",
        "10px 5px 20px 5px",
        "10px 5px 20px 5px",
        "10px 30px 20px 30px",
      ]}
    >
      <SimpleGrid columns={[1, null, 2, 2, 2]} marginTop="10px">
        <Box>
          <CourseImage url={course?.thumbnail} />
        </Box>
        <Box>
          <Box
            margin="0 auto"
            height={["fit-content", "fit-content", "fit-content", "35vh"]}
            width="95%"
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
          >
            <Flex justifyContent="space-between" alignItems="flex-start">
              <Box>
                <div>
                  <Text fontSize={["2xl", "2xl", "3xl", "3xl", "4xl"]}>
                    {course?.title}
                  </Text>
                  <Text
                    margin={["0 0 10px 0", null]}
                    fontSize={["md", "lg", "lg", "xl", "xl"]}
                    color="#6d6d6d"
                  >
                    by {course?.teacherName}
                  </Text>
                </div>
                {
                  course !== null?
                  <Rating size="large" value={course.overallRating} readOnly/>
                  :
                  <Rating size="large" value={0} readOnly/>
                }
                <Text fontSize={["3xl", "3xl", "4xl", "5xl", "5xl"]}>
                  {" "}
                  &#8377; {course?.price}
                </Text>
              </Box>
              {course?.teacherId === currUser._id && (
                <Button
                  onClick={() => deleteCourse(course?._id, navigate)}
                  colorScheme="red"
                  variant="outline"
                >
                  Delete this Course
                </Button>
              )}
            </Flex>
          </Box>
          <Flex width="95%" margin={["20px auto 0px auto", "0 auto"]}>
            {isEnrolled ? <EnrololedButton /> : <NotEnrolledButton />}
          </Flex>
        </Box>
      </SimpleGrid>
      <Box marginTop="30px" width="95%" margin="30px auto">
        <Text fontSize="xl" color="#6d6d6d">
          {course?.description}
        </Text>
      </Box>
      <Box width="95%" margin="30px auto"  marginTop="30px">
        <Text fontSize={["lg", "xl", "xl", "2xl", "2xl"]} fontWeight="600">Course reviews:</Text>
        {
          course?.rates.slice().reverse().map(rating => <RatingOverview rating={rating}/>)
        }
      </Box>
    </CourseContainer>
  );
};

export default Course;

// import React, { useState, useEffect } from "react";
// import { SimpleGrid, Box, Text, Button, Flex, Spacer } from "@chakra-ui/react";
// import { Rating } from "@mui/material";
// import { useLocation, useNavigate } from "react-router-dom";
// import useRazorpay from "react-razorpay";
// // import { Rating } from "@mui/material";
// import { useSelector, useDispatch } from "react-redux";
// import API from "../../utils/axios";
// import { initializeUser } from "../../hooks/useAuth";

// import { CourseContainer, CourseImage } from "./course.styles";
// import { deleteCourse } from "../../hooks/useCourse";

// let course = {
//   thumbnail:
//     "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1173&q=80",
//   title: "Learning Blockchain By Building Your Own Javascript",
//   teacherName: "Dr. A.B.C",
//   description:
//     "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
// };

// const Course = () => {
//   const [isEnrolled, setIsEnrolled] = useState(false);
//   const dispatch = useDispatch();
//   const props = useLocation();
//   console.log(props);
//   course = props?.state?.course;
//   const [rating, setRating] = useState(course.rating);
//   const Razorpay = useRazorpay();
//   const { user } = useSelector((state) => state.auth);
//   const createOrder = async (amount) => {
//     const res = await API.post("/user/buyCourse/createorder", { amount });
//     return res;
//   };

//   const handleRating = async (e, rate) => {
//     setRating(rate);
//     const res = await API.post("/course/rate", {
//       rate: rating,
//       course_id: course._id,
//     });

//     console.log(res);
//   };

//   const handlePayment = async () => {
//     let order = await createOrder(course.price * 100);
//     order = order.data.razorRes;

//     console.log(order);
//     var options = {
//       key: "rzp_test_7o3KFikLV8ENjP", // Enter the Key ID generated from the Dashboard
//       amount: order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
//       currency: order.currency,
//       name: "Studify",
//       description: "Test Transaction",
//       // "image": "https://example.com/your_logo",
//       order_id: order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
//       // callback_url: "http://localhost:3000/user/razor/callback",
//       handler: async (res) => {
//         // alert(res.razorpay_payment_id);
//         // alert(res.razorpay_order_id);
//         // alert(res.razorpay_signature) ;
//         const payload = {
//           payment_id: res.razorpay_payment_id,
//           order_id: res.razorpay_order_id,
//           razor_signature: res.razorpay_signature,
//           user_id: user._id,
//           course_id: course._id,
//         };
//         const response = await API.post("/user/razor/callback", payload);
//         initializeUser(dispatch);
//         console.log(response);
//       },
//       prefill: {
//         name: user.name,
//         email: user.email,
//         contact: user.phone,
//       },
//       notes: {
//         address: "Razorpay Corporate Office",
//       },
//       theme: {
//         color: "#6c63ff",
//       },
//     };
//     var rzp1 = new Razorpay(options);
//     rzp1.on("payment.failed", (response) => {
//       alert(response.error.code);
//       alert(response.error.description);
//       alert(response.error.source);
//       alert(response.error.step);
//       alert(response.error.reason);
//       alert(response.error.metadata.order_id);
//     });
//     rzp1.open();
//   };
//   useEffect(() => {
//     const enrolledCourses = user.myEnrolledCourses;
//     // eslint-disable-next-line array-callback-return
//     console.log(enrolledCourses);
//     enrolledCourses.map((c) => {
//       if (c.courseID._id === course._id) setIsEnrolled(true);
//     });
//   }, [user]);
//   const EnrololedButton = () => {
//     return (
//       <Button
//         width="48%"
//         backgroundColor="#6C63FF"
//         _hover=""
//         color="#fff"
//         onClick={() => {
//           navigate(`/course/learn/${course._id}`);
//         }}
//       >
//         Resume
//       </Button>
//     );
//   };
//   const NotEnrolledButton = () => {
//     return (
//       <>
//         {course?.teacherId !== currUser?._id && (
//           <>
//             <Button
//               width="48%"
//               backgroundColor="#6C63FF"
//               _hover=""
//               color="#fff"
//               onClick={handlePayment}
//             >
//               BUY NOW
//             </Button>
//             <Spacer />
//             <Button
//               width="48%"
//               variant="outline"
//               color="#6C63FF"
//               borderColor="#6C63FF"
//               borderWidth="2px"
//             >
//               ADD TO WISHLIST
//             </Button>
//           </>
//         )}
//       </>
//     );
//   };
//   // };
//   const currUser = useSelector((store) => store.auth.user);
//   const navigate = useNavigate();
//   return (
//     <CourseContainer
//       padding={[
//         "10px 5px 20px 5px",
//         "10px 5px 20px 5px",
//         "10px 5px 20px 5px",
//         "10px 30px 20px 30px",
//       ]}
//     >
//       <SimpleGrid columns={[1, null, 2, 2, 2]} marginTop="10px">
//         <Box>
//           <CourseImage url={course.thumbnail} />
//         </Box>
//         <Box>
//           <Box
//             margin="0 auto"
//             height={["fit-content", "fit-content", "fit-content", "35vh"]}
//             width="95%"
//             display="flex"
//             flexDirection="column"
//             justifyContent="space-between"
//           >
//             <Flex justifyContent="space-between" alignItems="flex-start">
//               <Box>
//                 <div>
//                   <Text fontSize={["2xl", "2xl", "3xl", "3xl", "4xl"]}>
//                     {course.title}
//                   </Text>
//                   <Text
//                     margin={["0 0 10px 0", null]}
//                     fontSize={["md", "lg", "lg", "xl", "xl"]}
//                     color="#6d6d6d"
//                   >
//                     by {course.teacherName}
//                   </Text>
//                 </div>
//                 <Rating
//                   defaultValue={rating}
//                   precision={0.5}
//                   size="large"
//                   readOnly
//                   value={4}
//                 />
//                 <Text fontSize={["3xl", "3xl", "4xl", "5xl", "5xl"]}>
//                   {" "}
//                   &#8377; {course.price}
//                 </Text>
//               </Box>
//               {course.teacherId === currUser._id && (
//                 <Button
//                   onClick={() => deleteCourse(course._id, navigate)}
//                   colorScheme="red"
//                   variant="outline"
//                 >
//                   Delete this Course
//                 </Button>
//               )}
//             </Flex>
//           </Box>
//           <Flex width="95%" margin={["20px auto 0px auto", "0 auto"]}>
//             {isEnrolled ? <EnrololedButton /> : <NotEnrolledButton />}
//             {/* <Button
//               width="48%"
//               backgroundColor="#6C63FF"
//               _hover=""
//               color="#fff"
//               onClick={handlePayment}
//             >
//               BUY NOW
//             </Button>
//             <Spacer />
//             <Button
//               width="48%"
//               variant="outline"
//               color="#6C63FF"
//               borderColor="#6C63FF"
//               borderWidth="2px"
//             >
//               ADD TO WISHLIST
//             </Button> */}
//           </Flex>
//         </Box>
//       </SimpleGrid>
//       <Box marginTop="30px" width="95%" margin="30px auto">
//         <Text fontSize="xl" color="#6d6d6d">
//           {course.description}
//         </Text>
//       </Box>
//     </CourseContainer>
//   );
// };

// export default Course;
