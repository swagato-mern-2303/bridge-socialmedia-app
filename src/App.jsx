import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import "react-toastify/dist/ReactToastify.css";
import ForgotPassword from "./pages/ForgotPassword";
import Profile from "./pages/Profile";
import Users from "./pages/Users";
import EditProfile from "./pages/EditProfile";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/registration",
      element: <Registration />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/forgotpassword",
      element: <ForgotPassword />,
    },
    {
      path: "/profile",
      element: <Profile />,
    },
    {
      path: "/users",
      element: <Users />,
    },
    {
      path: "/editprofile",
      element: <EditProfile />,
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
