import { TaskDetails } from "@src/types/task"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import {  addTask, deleteTask, getTask, getTasks, updateTask } from "@src/api/tasks"

export const useGetTasks = () => useQuery<TaskDetails[]>({
        queryKey: ['tasks'],
        queryFn: getTasks,
    })

export const useGetTask = (id: string) => useQuery<TaskDetails> ({
    queryKey: [id],
    queryFn: () => getTask(id),
    enabled: !!id
})
   
export const useDeleteTask = (id: string) => { 
    const queryClient = useQueryClient();
    return useMutation<TaskDetails>({
    mutationFn: () => deleteTask(id),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      alert("Task has been deleted")
    },
  });
}

export const useAddTask = (data: TaskDetails) => {
   const queryClient = useQueryClient();
    return useMutation<TaskDetails>({
    mutationFn: () => addTask(data),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      alert("Task has been added")
      window.location.reload()
    },
  });
}

export const useUpdateTask = (id: string, data: TaskDetails) => {
   const queryClient = useQueryClient();
    return useMutation<TaskDetails>({
    mutationFn: () => updateTask(id, data),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: [id] });
      alert("Task has been updated")
    },
  });
}
   
