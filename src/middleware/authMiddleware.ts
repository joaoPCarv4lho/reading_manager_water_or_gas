import "dotenv/config";
import jwt from "jsonwebtoken";
import { FastifyRequest, FastifyReply, HookHandlerDoneFunction } from "fastify";
import { JwtPayload } from "../interfaces";
import { getCustomerRepository } from "../repositories/createCustomerRepositories";

export async function authMiddleware(request: FastifyRequest, reply: FastifyReply, done: HookHandlerDoneFunction): Promise<void>{
    const authorization = request.headers.authorization;
    if(!authorization){
        reply.status(401).send({ error: "Token not provided" });
        return 
    }

    const parts = authorization.split(" ");
    if(parts.length !== 2){
        reply.status(401).send({ error: "Token invalid!" });
        return 
    }

    const [scheme, token] = parts;
    if(!/^Bearer$/i.test(scheme)){
        reply.status(401).send({ error: "Token malformatted" });
        return 
    }

    try{
        const decoded = jwt.verify(token, process.env.SECRET_JWT!) as JwtPayload;
        const customer = await getCustomerRepository(decoded.id);

        if(!customer || !customer.id){
            reply.status(401).send({ error: "Token invalid!" });
            return 
        }

        (request as any).customerID = customer.id;
        return done();
    }catch(err){
        reply.status(401).send({ message: "Token invalid!" })
    }
}