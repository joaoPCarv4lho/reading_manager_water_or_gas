import jwt from "jsonwebtoken";
import "dotenv/config";
import { CreateCustomerProps } from "../interfaces/index";
import { createCustomerRepository } from "../repositories/createCustomerRepositories";

class CreateCustomerService{
    async execute({ email, name, password }: CreateCustomerProps){

        if(!email || !name || !password) throw new Error('Preencha todos os campos.')
            
        const customer = await createCustomerRepository({ email, name, password });
        if (!customer) throw new Error("Error creating customer!");
    
        const secret = process.env.SECRET_JWT || "defaultSecret";
        const token = jwt.sign({id: customer.id}, secret, {expiresIn: 86400});

        return {customer, token};
    }
}

export { CreateCustomerService }