import { FastifyReply } from "fastify";

/**
 * Sends a response message based on the validation and existence of the data.
 * @param {boolean} valid - Indicates if the provided data is valid.
 * @param {boolean} existing - Indicates if the reading already exists for the current month.
 * @param {string} guid - The unique identifier for the measurement.
 * @param {number} value - The measurement value.
 * @param {string} temporaryLink - The temporary link to the image.
 * @param {FastifyReply} reply - The Fastify reply object to send the response.
 */
export function getResponseMessage(
    valid: boolean,
    existing: boolean,
    guid: string,
    value: number,
    temporaryLink: string,
    reply: FastifyReply
) {
    if (!valid) {
        return reply.status(409).send({ 
            error_code: "INVALID_DATA", 
            error_description: "The data provided in the request body is invalid."
        });
    } else if (existing) {
        return reply.status(400).send({
            error_code: "READING_ALREADY_EXISTS", 
            error_description: "There is already a reading for this type in the current month."
        });
    } else {
    // If valid and not existing
        return reply.status(200).send({
            message: "Operation successfully completed.",
            image_url: temporaryLink,
            measurement_value: value,
            measure_uuid: guid,
        });
    }
}
