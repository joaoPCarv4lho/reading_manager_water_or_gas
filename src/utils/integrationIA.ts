import { GoogleAIFileManager } from "@google/generative-ai/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export const extractValueFromImage = async(imageBase64: string): Promise<number> => {
    try{
        const apiKey = process.env.API_KEY || ""; // Provide a default value if API_KEY is undefined
        const prompt = "Qual é o valor indicado no hidrômetro desta imagem?";
        
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({
            model: "gemini-1.5-pro-latest",
        })

        const fileManager = new GoogleAIFileManager(apiKey); 
        const uploadResponse = await fileManager.uploadFile(imageBase64, {
            mimeType: "image/jpeg"
        })

        const result = await model.generateContent([
            {
                fileData: {
                    mimeType: uploadResponse.file.mimeType,
                    fileUri: uploadResponse.file.uri
                }
            },
            { text: prompt }
        ])

        const value: number = parseInt(result.response.text())
        return value
    }catch(err){
        console.log('Error during AI image analysis:', err);
        throw new Error('AI image analysis failed');
    }
}

