import { GoogleGenAI, Modality, Part } from "@google/genai";
import type { UserImage } from "../types";

if (!process.env.API_KEY) {
  console.warn(
    "API_KEY environment variable is not set. The application will not work without it."
  );
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

export const generateTryOnImage = async (
  userImage: UserImage,
  clothingImage: UserImage
): Promise<string> => {
  try {
    // Validate inputs
    if (!userImage.base64 || !clothingImage.base64) {
      throw new Error("Both images are required for generation.");
    }

    // Check image formats
    const validMimeTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/webp",
    ];
    if (
      !validMimeTypes.includes(userImage.mimeType) ||
      !validMimeTypes.includes(clothingImage.mimeType)
    ) {
      throw new Error("Please use JPEG, PNG, or WebP image formats.");
    }

    const prompt = `Virtual try-on: Place clothing from image 2 onto person in image 1. Keep face, hair, and all facial features EXACTLY unchanged. Only modify clothing area. Ensure realistic fit, natural lighting/shadows, proper proportions, and seamless integration.`;

    const parts: Part[] = [
      {
        inlineData: {
          data: userImage.base64,
          mimeType: userImage.mimeType,
        },
      },
      {
        inlineData: {
          data: clothingImage.base64,
          mimeType: clothingImage.mimeType,
        },
      },
      { text: prompt },
    ];

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-image-preview",
      contents: { parts },
      config: {
        responseModalities: [Modality.IMAGE, Modality.TEXT],
        temperature: 0.1, // Lower temperature for more consistent results
        topP: 0.8,
        maxOutputTokens: 8192,
      },
    });

    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData && part.inlineData.mimeType.startsWith("image/")) {
        return part.inlineData.data;
      }
    }

    throw new Error(
      "No image was returned. Please try a different photo or product."
    );
  } catch (error) {
    console.error("Error generating image with Gemini:", error);

    // More specific error handling
    if (error instanceof Error) {
      if (error.message.includes("API_KEY")) {
        throw new Error(
          "API key is missing or invalid. Please check your environment configuration."
        );
      } else if (
        error.message.includes("quota") ||
        error.message.includes("limit")
      ) {
        throw new Error(
          "API quota exceeded. Please try again later or check your billing settings."
        );
      } else if (
        error.message.includes("safety") ||
        error.message.includes("policy")
      ) {
        throw new Error(
          "Content policy violation. Please use appropriate images and try again."
        );
      } else if (error.message.includes("timeout")) {
        throw new Error(
          "Request timed out. Please try again with smaller images."
        );
      } else {
        throw new Error(`Failed to generate image: ${error.message}`);
      }
    }
    throw new Error("An unknown error occurred while generating the image.");
  }
};
