import express, {Application} from 'express';
import { router } from './route';
import mongoose from 'mongoose';
import cors from 'cors';

export const app: Application = express()
const corsOptions: cors.CorsOptions = {}

app.use(express.json())
app.use(cors(corsOptions))
app.use("/tasks", router)

const MONGODB_URL=process.env.MONGODB_URL

mongoose.connect(MONGODB_URL as string)

app.listen(3000, () => {
    return console.log("server started")
})