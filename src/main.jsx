import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home.jsx";
import Login from "./components/Login.jsx";
import SignUp from "./components/SignUp.jsx";
import VideoView from "./components/VideoView.jsx";
import ChannelDetail from "./components/ChannelDetail.jsx";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/signUp", element: <SignUp /> },
      { path: "/video/:id", element: <VideoView /> },
      { path: "/channel/:id", element: <ChannelDetail /> },
    ],
  },
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={appRouter} />
  </StrictMode>
);
