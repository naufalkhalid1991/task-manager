import { Button, MenuItem, Select } from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useParams } from "react-router-dom";
import { useAddTask, useGetTask, useUpdateTask } from "./hooks/useTasks";
import { TaskDetails, taskPriority } from "./types/task";

export const TaskForm = () => {
  const { id } = useParams();
  const { pathname } = useLocation();
  const { data, isLoading } = useGetTask(id!);
  const {
    register,
    handleSubmit,
    formState: { isValid },
    reset,
  } = useForm<TaskDetails>();
  const [formData, setFormData] = useState<TaskDetails>({} as TaskDetails);

  const { mutate: addTask } = useAddTask(formData);
  const { mutate: updateTask } = useUpdateTask(id!, formData);

  const handleSelectItems = (e: any) => {
    setFormData({ ...formData, priority: e.target.value });
  };

  const onSubmit = (data: TaskDetails) => {
    setFormData(data);
    pathname.includes("add") ? addTask() : updateTask();
  };

  useEffect(() => {
    if (data) {
      reset(data);
    }
  }, [data, reset]);

  if (pathname.includes("edit") && isLoading) return <div></div>;
  else
    return (
      <div>
        <Button variant="contained" color="success">
          <Link to={"/"}>Back</Link>
        </Button>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Title
            </label>
            <input
              {...register("title", { required: true })}
              name="title"
              id="title"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            ></input>
          </div>
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              {...register("description", { required: true })}
              name="description"
              id="description"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            ></textarea>
          </div>
          <div>
            <label
              htmlFor="priority"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Priority
            </label>
            {!isLoading && (
              <Select
                {...register("priority")}
                onChange={handleSelectItems}
                className="w-72 rounded"
                defaultValue={data?.priority}
                label="priority"
              >
                {taskPriority.map((option) => (
                  <MenuItem
                    key={option}
                    value={option}
                    disabled={option === "undefined"}
                  >
                    {option}
                  </MenuItem>
                ))}
              </Select>
            )}
          </div>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className="w-full"
            disabled={!isValid}
          >
            {pathname.includes("add") ? "Add" : "Save"}
          </Button>
        </form>
      </div>
    );
};
