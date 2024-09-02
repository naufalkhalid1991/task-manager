import {Schema, model} from "mongoose";

enum Priority {
    low = "low",
    medium = "medium",
    high = "high"
}


export interface Task {
    title: string,
    description: string, 
    priority?: Priority
    id: string
}

const taskSchema = new Schema<Task>({
    title: { type: String, required: true },
    description: { type: String, required: true },
    priority: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
    
}, {id: true, toJSON: {
    transform(_, ret) {
        ret.id = ret._id
        delete ret._id
    }
}});
  
export const Tasks = model<Task>('Tasks', taskSchema)