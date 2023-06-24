import { z } from 'zod';

const createZodSchema = z.object({
  body: z.object({
    role: z.string({ required_error: 'role is required' }),
    password: z.string().optional(),
  }),
});
//   await createZodSchema.parseAsync(req);

const userValidation = {
  createZodSchema,
};

export default userValidation;
