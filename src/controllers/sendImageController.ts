import { FastifyRequest, FastifyReply } from "fastify";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import path from "path";
import { uploadRequestBody } from "../interfaces/index";
import {
    CheckReadingService,
    ValidationDataService,
} from "../services/validationService";
import { getResponseMessage } from "../utils/responseValidation";
import { getErrorMessage } from "../utils/getErrorMessage";
import { extractValueFromImage } from "../utils/integrationIA";

class SendImageController {
    /**
     * Handles the image upload and processing.
     * @param {FastifyRequest} request - The Fastify request object containing the image data.
     * @param {FastifyReply} reply - The Fastify reply object to send the response.
     */
    async handle(request: FastifyRequest, reply: FastifyReply) {
        try {
            const body = request.body as uploadRequestBody;
            const customerId = request.id;
            const { image, measureDateTime, measureType } = body;

            const validationData = new ValidationDataService();
            const existingReading = new CheckReadingService();

            const [isValid, isExisting, recognizedValue] = await Promise.all([
                validationData.execute(body),
                existingReading.execute(customerId, measureDateTime, measureType),
                extractValueFromImage(image),
            ]);

            const guid = uuidv4();
            const temporaryLink = await this.saveImage(image, guid);

            return getResponseMessage(
                isValid,
                isExisting,
                guid,
                recognizedValue,
                temporaryLink,
                reply
            );
        } catch (err) {
            const errorMessage = getErrorMessage(err);
            console.error("Error processing image upload:", errorMessage);
            return reply.status(500).send({ error: errorMessage });
        }
    }

    /**
     * Saves the image to the local file system.
     * @param {string} imageBase64 - The base64 encoded image string.
     * @param {string} guid - The unique identifier for the image.
     * @returns {Promise<string>} - The path to the saved image.
     */
    private async saveImage(imageBase64: string, guid: string): Promise<string> {
        const buffer = Buffer.from(imageBase64.split(",")[1], "base64");
        const filePath = path.join(__dirname, `../../uploads/${guid}.jpeg`);

        return new Promise((resolve, reject) => {
            fs.writeFile(filePath, buffer, (err) => {
                if (err) {
                    reject(new Error("Failed to save image to disk"));
                } else {
                    resolve(`/uploads/${guid}.jpeg`);
                }
            });
        });
    }
}

export { SendImageController };
