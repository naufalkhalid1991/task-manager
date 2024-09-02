import express, {Application} from 'express';
import { router } from './route';
import mongoose from 'mongoose';
import cors from 'cors';

export const app: Application = express()
const corsOptions: cors.CorsOptions = {}

app.use(express.json())
app.use(cors(corsOptions))
app.use("/tasks", router)

mongoose.connect('mongodb+srv://@cluster0.2klxm5x.mongodb.net/tasks?retryWrites=true&w=majority&appName=Cluster0')

app.listen(3000, () => {
    return console.log("server started")
})