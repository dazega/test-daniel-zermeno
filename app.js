import express, { json } from 'express';
import cors from "cors";

import userRoutes from "./routes/user";
import documentRoutes from "./routes/document";

const app = express();


app.use(json());
app.use(cors());

//Routes Definitions
app.use('/user', userRoutes);
app.use('/document', documentRoutes);

app.get('/',(req,res) => {
    res.send("Hello World")
})


app.listen(3626,() => {
    console.log('app is listening to port 3626');
})