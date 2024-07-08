import {Request, Response,Router } from "express";
import UserSignupSchema from "../../middleware/User/SignupAuth";


const router = Router();

router.post("/signup", (req: Request, res: Response) => {
  try {
    const response = req.body;
    const validationResult = UserSignupSchema.safeParse(response);
    if (validationResult.success) {
      // Data is valid, log to console
      const { email, firstName, lastName, password } = validationResult.data;
      console.log("Validated user data:", {
        email,
        firstName,
        lastName,
        password,
      });

      // Respond with success message
      res
        .status(200)
        .json({ message: "Signup successful", data: validationResult.data });
    } else {
      console.error("Validation errors:", validationResult.error);
      res
        .status(400)
        .json({
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