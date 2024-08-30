import moment from "moment";
import { uploadRequestBody } from "../interfaces/index";
import { findMeasurementRepository } from "../repositories/sendImageRepositorie";

class ValidateRequestBody {
    async execute(body: uploadRequestBody): Promise<boolean> {
        const { image, measureDateTime, measureType } = body;

        // Check for required fields
        if (!image || !measureDateTime || !measureType) {
            return false;
        }

        // Validate image format
        const base64Regex = /^data:image\/(png|jpeg|jpg);base64,/;
        if (!base64Regex.test(image)) {
            return false;
        }

        // Validate measureDateTime format
        if (!moment(measureDateTime, moment.ISO_8601, true).isValid()) {
            return false;
        }

        // Validate measureType
        if (!["WATER", "GAS"].includes(measureType)) {
            return false;
        }

        return true;
    }
}

class CheckExistingReading {
    async execute(customerId: string, measureDateTime: string, measureType: 'WATER' | 'GAS'): Promise<boolean> {
        const monthYear = moment(measureDateTime).format('MM-YYYY');

        const existingReading = await findMeasurementRepository(customerId, measureType, monthYear);
        return existingReading !== null;
    }
}

export { ValidateRequestBody, CheckExistingReading };