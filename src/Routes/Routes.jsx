
import {
  createBrowserRouter,
} from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";
import Register from "../Pages/Register/Register";
import Login from "../Pages/Login/Login";
import Rooms from "../Pages/Rooms/Rooms";
import RoomDetails from "../Pages/Rooms/RoomDetails";
import MyBooking from "../Pages/MyBooking/MyBooking";
import PrivateRoute from "../Component/PrivateRoute/PrivateRoute";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        index: true,
        element: <Home></Home>
      },
      {
        path: '/register',
        element: <Register></Register>
      },
      {
        path: '/login',
        element: <Login></Login>
      },
      {
        path: '/rooms',
        element: <Rooms></Rooms>
      },
      {
        path: '/roomsdetails/:id',
        element: <RoomDetails></RoomDetails>,
        loader : ({params})=>fetch(`https://server-navy-two-99.vercel.app/featured-room/${params.id}`)
      },
      {
        path: '/mybooking',
        element: <PrivateRoute><MyBooking></MyBooking></PrivateRoute>
      },
    ]
  },
]);

export default router;