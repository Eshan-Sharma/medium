import z from "zod";

export const signupInput = z.object({
  email: z.string().email(),
  name: z.string().optional(),
  password: z.string().min(6),
});
export type SignupInput = z.infer<typeof signupInput>;

export const postInput = z.object({
  title: z.string(),
  content: z.string(),
});
export type PostInput = z.infer<typeof postInput>;

export const updatePostInput = z.object({
  title: z.string(),
  content: z.string(),
  id: z.string(),
});
export type UpdatePostInput = z.infer<typeof updatePostInput>;
