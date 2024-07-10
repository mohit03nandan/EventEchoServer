import { Request, Response, Router } from "express";
import axios from "axios"
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import UserSignupSchema from "../../middleware/User/SignupAuth";

dotenv.config();

const router = Router();

const JWT_SECRET = process.env.JWT_SECRET;
const CLIENT_ID = process.env.CLIENT_ID!;
const CLIENT_SECRET = process.env.CLIENT_SECRET!;
const REDIRECT_URI = process.env.REDIRECT_URI!;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in environment variables");
}else{
  console.log("JWT_SECRET is defined",JWT_SECRET);
 
}


router.get('/auth/google', (req: Request, res: Response) => {
  const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=profile email`;
  res.redirect(url);
});

router.get('/auth/google/callback', async (req: Request, res: Response) => {
  const { code } = req.query;

  try {
    if (!code) {
      throw new Error('No authorization code received');
    }

    const { data } = await axios.post('https://oauth2.googleapis.com/token', {
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      code,
      redirect_uri: REDIRECT_URI,
      grant_type: 'authorization_code',
    });

    const { access_token, id_token } = data;

    // Fetch user profile with access_token
    const { data: profile } = await axios.get('https://www.googleapis.com/oauth2/v1/userinfo', {
      headers: { Authorization: `Bearer ${access_token}` },
    });

    // Generate JWT token
    const token = jwt.sign({ id: profile.id, email: profile.email }, JWT_SECRET, { expiresIn: '1h' });
    console.log('Generated JWT token:', token);
    res.redirect(`/user/profile?token=${token}`);
  } catch (error) {
    console.error('Error processing Google OAuth callback:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/profile', (req: Request, res: Response) => {
  const token = req.query.token as string;
  console.log('Received token:', token);

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    console.log('Decoded token:', decoded);
    res.json({ message: 'Profile data', user: decoded });
  } catch (error) {
    console.error('Error decoding token:', error);
    res.status(401).json({ message: 'Invalid token' });
  }
});



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
