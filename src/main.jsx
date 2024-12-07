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
import { Provider } from "react-redux";
import appStore from "./utils/appStore.js";
import UserAccount from "./components/UserAccount.jsx";
import CreateChannel from "./components/CreateChannel.jsx";
import UploadVideo from "./components/UploadVideo.jsx";
import UpdateVideoForm from "./components/UpdateVideoForm.jsx";
import UpdateChannel from "./components/updateChannel.jsx";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/signUp", element: <SignUp /> },
      { path: "/userAccount/", element: <UserAccount /> },
      { path: "/createChannel", element: <CreateChannel /> },
      { path: "/uploadVideo", element: <UploadVideo /> },
      { path: "/updateVideo/:id", element: <UpdateVideoForm /> },
      { path: "/video/:id", element: <VideoView /> },
      { path: "/channel/:id", element: <ChannelDetail /> },
      { path: "/updateChannel/:id", element: <UpdateChannel /> },
    ],
  },
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={appStore}>
      <RouterProvider router={appRouter} />
    </Provider>
  </StrictMode>
);
