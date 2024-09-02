import { Button, Card, CardContent, Typography } from "@mui/material";
import { useDeleteTask, useGetTasks } from "@src/hooks/useTasks";
import { useState } from "react";
import { Link } from "react-router-dom";
import { TaskDetails } from "./types/task";

export const TaskList = () => {
  const { data } = useGetTasks();
  const [taskId, setTaskId] = useState("");
  const { mutate } = useDeleteTask(taskId);

  const handleDeleteClick = (id: TaskDetails["id"]) => {
    setTaskId(id);
    mutate();
  };

  return (
    <div>
      <div className="flex-row space-x-3">
        <Button variant="contained" color="success">
          <Link to={`add`}>Add</Link>
        </Button>
      </div>
      <div className="flex flex-col space-y-4">
        {data &&
          data.map((task) => (
            <Card key={task.id} className="shadow-md">
              <CardContent>
                <Typography variant="h5">{task.title}</Typography>
                <Typography variant="body2" className="text-gray-600">
                  {task.description}
                </Typography>
                <div className="flex space-x-2 mt-4">
                  <Button variant="contained" color="primary">
                    <Link to={`${task.id}`}>Edit</Link>
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleDeleteClick(task.id)}
                  >
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
      </div>
    </div>
  );
};
