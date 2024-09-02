import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { TaskList } from "./TaskList";
import { TaskForm } from "./TaskForm";
import { App } from "./App";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <TaskList />,
      },
      {
        path: ":id",
        element: <TaskForm />,
      },
      {
        path: "add",
        element: <TaskForm />,
      },
    ],
  },
]);
