import { FastifyRequest, FastifyReply } from "fastify";
import bcrypt from 'bcrypt';
import { CreateCustomerService } from "../services/createCustomerService";
import { CreateCustomerProps } from "../interfaces/index";
import { getErrorMessage } from "../utils/getErrorMessage";

class CreateCustomerController {
    async handle(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
        const saltRounds = 10;
        try {
            let { email, name, password }: CreateCustomerProps = request.body as CreateCustomerProps;
            
            const createCustomerService = new CreateCustomerService();
            
            password = await bcrypt.hash(password, saltRounds);
            const customer = await createCustomerService.execute({email, name, password});
            
            return reply.status(200).send(customer);
        } catch (err) {
            const errorMessage = getErrorMessage(err);
            console.error("Erro ao criar o cliente:", errorMessage);
            return reply.status(500).send({ error: errorMessage });
        }
    }
}

export { CreateCustomerController };
