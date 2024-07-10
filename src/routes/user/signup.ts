import { Request, Response, Router } from "express";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import UserSignupSchema from "../../middleware/User/SignupAuth";

dotenv.config();

const router = Router();

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in environment variables");
}else{
  console.log("JWT_SECRET is defined",JWT_SECRET);
 
}


router.post("/signup", (req: Request, res: Response) => {
  try {
    const response = req.body;
    const validationResult = UserSignupSchema.safeParse(response);
    if (validationResult.success) {
      const { email, firstName, lastName, password } = validationResult.data;
      console.log("Validated user data:", { email, firstName, lastName, password });

      // Generate JWT token
      const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: '1h' });
      console.log("Generated JWT token:", token);

      res.status(200).json({ token });
    } else {
      console.error("Validation errors:", validationResult.error);
      res.status(400).json({
        error: "Invalid request payload",
        details: validationResult.error,
      });
    }
  } catch (error) {
    console.error("Error processing signup:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
