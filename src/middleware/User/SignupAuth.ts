import { z } from 'zod';

const userSignupSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    firstName: z.string().min(3, { message: "Must be 3 or more characters long" }),
    lastName: z.string().min(3, { message: "Must be 3 or more characters long" }),
    password: z.string()
        .min(8, { message: "Must be 8 or more characters long" })
        .regex(/[a-z]/, { message: "Must contain at least one lowercase letter" })
        .regex(/[A-Z]/, { message: "Must contain at least one uppercase letter" })
        .regex(/[0-9]/, { message: "Must contain at least one number" })
        .regex(/[^a-zA-Z0-9]/, { message: "Must contain at least one special character" }),
});


export type UserSignupSchema = z.infer<typeof userSignupSchema>;

export default userSignupSchema;
