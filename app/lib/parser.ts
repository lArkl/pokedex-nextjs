import { AnyZodObject, ZodError, z } from "zod";

export async function zParse<T extends AnyZodObject, G>(
  schema: T,
  req: G
): Promise<z.infer<T>> {
  try {
    return schema.parseAsync(req);
  } catch (error) {
    if (error instanceof ZodError) {
      throw error.message;
    }
    throw error;
  }
}
