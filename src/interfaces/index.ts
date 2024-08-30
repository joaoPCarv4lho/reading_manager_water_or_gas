interface CreateCustomerProps {

    email: string;
    name: string;
    password: string;

}

interface uploadRequestBody {
    image: string;
    measureDateTime: string;
    measureType: 'WATER' | 'GAS';
}

interface JwtPayload {
    id: string
}

export { CreateCustomerProps, uploadRequestBody, JwtPayload }