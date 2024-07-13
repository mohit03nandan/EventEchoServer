// import { Request, Response, Router } from "express";
// import jwt from "jsonwebtoken";
// import dotenv from "dotenv";
// import UserSignupSchema from "../../middleware/User/SignupAuth";
// import { PrismaClient } from "@prisma/client";
// const prisma = new PrismaClient();
// dotenv.config();
// const router = Router();
// const JWT_SECRET = process.env.JWT_SECRET;

// if (!JWT_SECRET) {
//   throw new Error("JWT_SECRET is not defined in environment variables");
// } else {
//   console.log("JWT_SECRET is defined", JWT_SECRET);
// }



// router.post("/login", async (req: Request, res: Response) => {
//   try {
//     const response = req.body;
//     const validationResult = UserSignupSchema.safeParse(response);
//     if(validationResult.success){
//       const { email, password } = validationResult.data;

//       // Check if user with the same email already exists
//       const existingUser = await prisma.user.findUnique({
//         where: {
//           email,
//           password,
//         },
//       });

//       if (existingUser) {
//             const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: "1h" });
//             console.log("Generated JWT token:", token);
//              res.status(200).json({
//                 token: token,
//                 message:"user created successfully"
//              })
//       }
//       else {
//         res.status(400).json({ message: "User already exists" });
//       }
//     } else {
//       console.error("Validation errors:", validationResult.error);
//       res.status(400).json({
//         error: "Invalid request payload",
//         details: validationResult.error,
//       });
//     }
//   } catch (error) {
//     console.error("Error processing signup:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

// export default router;
