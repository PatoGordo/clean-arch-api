import express from "express";
import cors from "cors";
import { appRouter } from "./infra/http/routes/app.router";
import ptBrErrorMap from "./i18n/locales/zod-pt-BR";
import { z } from "zod";
import { error } from "console";

z.setErrorMap(ptBrErrorMap);

try {
  const validation = z.object({
    name: z.string(),
    email: z.string().email(),
    object: z.object({
      value: z.string(),
    }),
    array: z.array(z.string()),
  });

  validation.parse({
    name: 123,
    email: "parpasdamsdas",
    object: {
      value: ["asdas", "asdasd"],
    },
    array: [125653, 1235, 345345, 324245, 345345],
  });
} catch (error) {}

const app = express();

app.use(express.json());

app.use(cors());

app.use("/api", appRouter);

export { app };
