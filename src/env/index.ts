import "dotenv/config";
import z from "zod";

const envSchema = z.object({
  PORT: z.coerce.number().default(3333),
  NODE_ENV: z.enum(["dev", "production", "test"]).default("dev"),
  JWT_SECRET: z.string()
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
  console.error("INVALID ENVIRONMENT", _env.error.format());

  throw new Error(`Invalid environment: ${_env.error.format()}`);
}

export const env = _env.data;
