import { app } from "./app";

const PORT = 8080;

const start = async () => {
    try{
        app.listen({ port: PORT }, () => console.log(`Server running on port ${PORT}`))
    }catch(err){
        process.exit(1)
    }
}

start();
