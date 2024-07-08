import express from 'express';
import dotenv from 'dotenv';
import userSignup from "./routes/user/signup"
const app = express();
dotenv.config();

app.use(express.json());

app.use("/user", userSignup);






const Port = process.env.PORT || 3000;
const Host = process.env.HOST || 'localhost';
app.listen(Port, () => {
    console.log(`server is running on  https://${Host}:${Port}`);
});