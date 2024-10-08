import { z } from 'zod';
import { Document } from 'mongoose';

export const UserSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(8, { message: "Password should be at least 8 characters" }),
    confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});

export interface IUser extends z.infer<typeof UserSchema>, Document {
    comparePassword: (password: string) => Promise<boolean>;
}
