import { uploadRequestBody } from "../interfaces/index";
import { ValidateRequestBody, CheckExistingReading } from "../utils/validationData";

class ValidationDataService {
    /**
     * Validates the request body data.
     * @param {uploadRequestBody} body - The request body containing the upload data.
     * @returns {Promise<boolean>} - Returns true if the body is valid, otherwise false.
     */
    async execute(body: uploadRequestBody): Promise<boolean> {
        const validateRequestBody = new ValidateRequestBody();
        // Execute the validation logic once and return the result
        return validateRequestBody.execute(body);
    }
}

class CheckReadingService {
    /**
     * Checks if there is already an existing reading for the given customer, date, and type.
     * @param {string} customerId - The ID of the customer.
     * @param {string} measureDateTime - The date and time of the measurement.
     * @param {'WATER' | 'GAS'} measureType - The type of the measurement (WATER or GAS).
     * @returns {Promise<boolean>} - Returns false if no existing reading is found, otherwise throws an error.
     * @throws {Error} - Throws an error if a reading already exists for the specified type and date.
     */
    async execute(customerId: string, measureDateTime: string, measureType: 'WATER' | 'GAS'): Promise<boolean> {
        const existingReading = new CheckExistingReading();

        const existing = await existingReading.execute(customerId, measureDateTime, measureType);
        if (existing) {
            throw new Error('There is already a reading for this type in the current month.');
        }

        return false; // No existing reading found
    }
}

export { ValidationDataService, CheckReadingService };
