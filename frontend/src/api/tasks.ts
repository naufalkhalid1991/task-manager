import { TaskDetails } from "@src/types/task";

const URL = "http://localhost:3000/tasks/"

export const getTasks = async () => {
    const response =  await fetch(URL) 
    const data = await response.json();
    return data
}

export const getTask  = async (id: string) => {
    const response = await fetch(`${URL}${id}`)
    const data = response.json()
    return data
}

export const addTask  = async (task: TaskDetails) => {
    const response = await fetch(`${URL}`, {method: "POST", body: JSON.stringify(task), headers: {'Content-Type': 'application/json'}})
    const data = response.json()
    return data
}

export const updateTask  = async (id: string, task: TaskDetails) => {
    const response = await fetch(`${URL}${id}`, {method: "PUT", body: JSON.stringify(task), headers: {'Content-Type': 'application/json'} })
    const data = response.json()
    return data
}

export const deleteTask = async(id: string) => {
    const response = await fetch(`${URL}${id}`, {method: "DELETE"})
    const data = response.json()
    return data
}