import { CreateCustomerProps } from "../interfaces/index";
import prismaClient from "../prisma";

export const createCustomerRepository = ({email, name, password}: CreateCustomerProps) => prismaClient.customer.create({data: {email, name, password}});
export const getCustomerRepository = (id: string) => prismaClient.customer.findFirstOrThrow({
    where: {
        id
    }
})