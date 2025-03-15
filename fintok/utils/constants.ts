import { z } from "zod";

export const intentSchema = z.object({
  intent: z.enum(["greeting", "farewell", "question", "unknown"]),
  entities: z.array(z.string()).optional(),
});
