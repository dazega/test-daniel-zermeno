import express, { json } from 'express';

const app = express();


app.use(json());


app.get('/',(req,res) => {
    res.send("Hello World")
})


app.listen(3626,() => {
    console.log('app is listening to port 3626');
})