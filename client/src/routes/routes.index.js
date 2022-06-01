import { Suspense, lazy } from "react";
import { Navigate, useRoutes } from "react-router-dom";

import { CircularProgress } from "@mui/material";

const Loadable = (Component) => (props) => {
  return (
    <Suspense
      fallback={
        <CircularProgress
          sx={{
            ...{
              top: 0,
              left: 0,
              width: 1,
              zIndex: 9999,
              position: "fixed",
            },
          }}
        />
      }
    >
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  return useRoutes([
    {
      path: "/sign-in",
      element: <SignIn />,
    },
    {
      path: "/landing",
      element: <Landing />
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/adminLogin",
      element: <AdminLogin />,
    },
    {
      path: "/adminDashboard",
      element: <AdminDashboard />,
    },
    {
      path: "/adminAddCourse",
      element: <AddCourse />,
    },
    {
      path: "/adminUpdateCourse",
      element: <UpdateCourse />,
    },
    {
      path: "/adminRemoveCourse",
      element: <RemoveCourse />,
    },
    {
      path: "/adminUpdateTeacher",
      element: <UpdateTeacher />,
    },
    {
      path: "/adminAllCourses",
      element: <AllCourses />,
    },
    {
      path: "/adminAllTeachers",
      element: <AllTeachers />,
    },
    {
      path: "/adminRequests",
      element: <Requests />,
    },
    {
      path: "/adminRemoveTechers",
      element: <RemoveTeachers />,
    },
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          path: "/home",
          element: <Home />,
        },
        {
          path: "/test",
          element: <Test />,
        },
        {
          path: "/myTeachings",
          element: <MyTeachings />,
        },
        {
          path:"/wishlist",
          element:<MyWishlist/>
        },
        {
          path:"/course/:id",
          element:<Course/>
        },{
          path: "/dashboard",
          element: <DashBoard />,
        },
        {
          path: "/createProfile",
          element: <CreateProfile />,
        },
        {
          path: "/my-courses",
          element: <MyCourses />,
        },
        {
          path: "/wishlist",
          element: <MyWishlist />,
        },
        {
          path:"/course/learn/:id",
          element:<CourseVideos/>
        },{
          path: "/createCourse",
          element: <CreateCourse />,
        },
      ],
    },
  ]);
}

//layouts
const MainLayout = Loadable(
  lazy(() => import("../layouts/mainLayout/mainLayout.component"))
);

//pages
const SignIn = Loadable(
  lazy(() => import("../pages/sign-in/sign-in.componsnt"))
);

const Home = Loadable(
  lazy(() => import("../pages/Homepage/homepage.component"))
);
const MyCourses = Loadable(
  lazy(() => import("../pages/MyCourses/myCourses.component"))
);
const MyWishlist = Loadable(
  lazy(()=>import("../pages/MyWishlist/myWishlist.component"))
)
const Course  = Loadable(
  lazy(()=> import("../pages/Course/course.component"))
)
const CourseVideos = Loadable(
  lazy(()=> import("../pages/CourseVideos/courseVideos.component"))
)


const Test = Loadable(lazy(() => import("../pages/test")));
const Login = Loadable(lazy(() => import("../pages/login/login.component")));
const AdminLogin = Loadable(
  lazy(() => import("../pages/login/loginAdmin.component"))
);
const MyTeachings = Loadable(
  lazy(() => import("../components/Teachings/myTeachings.component"))
);

const DashBoard = Loadable(
  lazy(() => import("../components/Dashboard/dashboad.component"))
);
const CreateProfile = Loadable(
  lazy(() => import("../components/Dashboard/createProfile.component"))
);

const CreateCourse = Loadable(
  lazy(() => import("../components/Teachings/createCourse.component"))
);

const AdminDashboard = Loadable(
  lazy(() => import("../components/Admin/AdminDashboard"))
);
const AddCourse = Loadable(
  lazy(() => import("../components/Admin/AddCourse"))
);
const UpdateCourse = Loadable(
  lazy(() => import("../components/Admin/UpdateCourse"))
);
const RemoveCourse = Loadable(
  lazy(() => import("../components/Admin/RemoveCourse"))
);
const UpdateTeacher = Loadable(
  lazy(() => import("../components/Admin/UpdateTeacher"))
);
const AllCourses = Loadable(
  lazy(() => import("../components/Admin/AllCourses"))
);
const AllTeachers = Loadable(
  lazy(() => import("../components/Admin/AllTeachers"))
);
const Requests = Loadable(
  lazy(() => import("../components/Admin/Requests"))
);
const RemoveTeachers = Loadable(
  lazy(() => import("../components/Admin/RemoveTeachers"))
);

const Landing = Loadable(
  lazy(() => import("../pages/Landing/landing.component"))
)
