import { z } from 'zod';

const userLoginSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string()
        .min(8, { message: "Must be 8 or more characters long" })
        .regex(/[a-z]/, { message: "Must contain at least one lowercase letter" })
        .regex(/[A-Z]/, { message: "Must contain at least one uppercase letter" })
        .regex(/[0-9]/, { message: "Must contain at least one number" })
        .regex(/[^a-zA-Z0-9]/, { message: "Must contain at least one special character" }),
});


export type UserSignupSchema = z.infer<typeof userLoginSchema>;

export default userLoginSchema;
