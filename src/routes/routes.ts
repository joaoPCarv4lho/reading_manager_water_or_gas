import { FastifyInstance, FastifyPluginOptions, FastifyRequest, FastifyReply } from "fastify";
import { CreateCustomerController } from "../controllers/createCustomerController";
import { authMiddleware } from "../middleware/authMiddleware";
import { SendImageController } from "../controllers/sendImageController";

export async function routes(fastify: FastifyInstance, options: FastifyPluginOptions) {
    fastify.post("/customer", async (request: FastifyRequest, reply: FastifyReply) => {
        return new CreateCustomerController().handle(request, reply);
    });

    fastify.post(
        "/upload",{ preHandler: authMiddleware }, async (request: FastifyRequest, reply: FastifyReply) => {
            return new SendImageController().handle(request, reply);
        }
    );

    fastify.patch("/confirm", async (request: FastifyRequest, reply: FastifyReply) => {
        // Implementação do método PATCH
    });

    fastify.get("/:id/list", async (request: FastifyRequest, reply: FastifyReply) => {
        // Implementação do método GET
    });
}
