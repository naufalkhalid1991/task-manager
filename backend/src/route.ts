import { Router, Request, Response } from "express";
import {Task, Tasks} from "./models/tasks";

export const router = Router();

const errorResponse = (res: Response ) => res.status(500).json({message: "Error in the API"})

export interface TaskFromDB extends Task {
    id: string
}

/**
 * POST /tasks
 * Create a new task
 * @body {TaskDetails} {
    "title": "TASK1",
    "description": "TASK1" }
 * @returns {Task} - newly created task
 */

router.post("/", async (req: Request, res: Response) => {
    try {
        if(!req.body) return res.sendStatus(400)
        const task = new Tasks(req.body)
        task.save()
        return res.status(200).json(task)
    } catch (error) {
       console.log(error)
       return errorResponse(res)
    }
})

/**
 * GET /tasks
 * Get lists of tasks
 * @returns {Tasks[]} - list of tasks
 */

router.get("/", async(_, res: Response) => {
    try {
        const tasks = await (await Tasks.find().exec()).map(doc => doc as TaskFromDB)
        return res.json(tasks)
    } catch (error) {
        console.log(error)
        return errorResponse(res)
    }
})

/**
 * GET /tasks/id
 * Get task by id
 * @param id
 * @returns {Task} - get task by id
 */

router.get("/:id", async(req: Request, res: Response) => {
    try {
        const id = req.params.id
        const task = await Tasks.findById(id).exec()
        if(!task) return res.status(404).json({message: "Task not found: " + id})
        return res.json(task)
    } catch (error) {
        console.log(error)
        return errorResponse(res)
    }
})


/**
 * PUT /tasks/id
 * Update task by id
 * @param id
 * @returns {message: "Task updated"}
 */
router.put("/:id", async(req: Request, res: Response) => {
    try {
        const id = req.params.id
        await Tasks.findByIdAndUpdate(id, req.body, {new: true}).exec()
        return res.status(200).json({message: "Task updated"})
    } catch(error) {
        console.log(error)
        return errorResponse
    }
})

/**
 * DELETE /tasks/id
 * Delete task by id
 * @param id
 * @returns { message: "Task deleted" }
 */
router.delete("/:id", async(req: Request, res: Response) => {
    try {
        const id = req.params.id
        await Tasks.findByIdAndDelete(id).exec()
        res.status(200).json({ message: "Task deleted" });
    } catch(error) {
        console.log(error)
        return errorResponse
    }
})

