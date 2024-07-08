import express from 'express';
import dotenv from 'dotenv';
const app = express();


dotenv.config();






const Port = process.env.PORT || 3000;
const Host = process.env.HOST || 'localhost';
app.listen(Port, () => {
    console.log(`server is running on  https://${Host}:${Port}`);
});