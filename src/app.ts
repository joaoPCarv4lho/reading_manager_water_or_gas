import Fastify from "fastify";
import cors from "@fastify/cors";
import "dotenv/config";
import { routes } from "./routes/routes";



export const app = Fastify({ logger: true });

app.register(cors);
app.register(routes);