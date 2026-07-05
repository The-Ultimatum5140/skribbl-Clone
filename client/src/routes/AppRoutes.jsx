import { createBrowserRouter, RouterProvider } from "react-router-dom";

import MainLayout from "@/layouts/MainLayout";

import Home from "@/pages/Home/Home";
import Lobby from "@/pages/Lobby/Lobby";
import Game from "@/pages/Game/Game";
import Notfound from "@/pages/Notfound/Notfound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "lobby/:roomId",
        element: <Lobby />,
      },
      {
        path: "game/:roomId",
        element: <Game />,
      },
      {
        path: "*",
        element: <Notfound />,
      },
    ],
  },
]);

const AppRoutes = () => {
  return <RouterProvider router={router} />;
};

export default AppRoutes;
