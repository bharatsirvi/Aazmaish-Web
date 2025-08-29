import React, { useRef } from 'react';
import { UserImage } from '../types';
import { UploadIcon } from './icons/UploadIcon';
import { BackIcon } from './icons/BackIcon';

interface ClothingUploaderProps {
    onClothingSelect: (image: UserImage) => void;
    onBack: () => void;
    disabled?: boolean;
}

const fileToUserImage = (file: File): Promise<UserImage> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            const base64 = (reader.result as string).split(',')[1];
            if (base64) {
                resolve({ base64, mimeType: file.type });
            } else {
                reject(new Error("Failed to read file as base64."));
            }
        };
        reader.onerror = (error) => reject(error);
        reader.readAsDataURL(file);
    });
};

export const ClothingUploader: React.FC<ClothingUploaderProps> = ({ onClothingSelect, onBack, disabled = false }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            try {
                const userImage = await fileToUserImage(file);
                onClothingSelect(userImage);
            } catch (error) {
                console.error("Error processing file:", error);
            }
        }
    };

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <div className="w-full bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-gray-200 animate-slide-in">
             <button 
                onClick={onBack} 
                disabled={disabled}
                className="flex items-center gap-2 text-sm text-gray-600 hover:text-pink-600 transition-colors mb-4 disabled:opacity-50 disabled:cursor-not-allowed"
             >
                <BackIcon />
                Back to Style Selection
             </button>
            <h3 className="text-xl font-bold mb-1">Upload Clothing</h3>
            <p className="text-gray-500 mb-6">Select a photo of a single clothing item with a plain background for best results.</p>
            <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                accept="image/*" 
                className="hidden" 
                disabled={disabled}
            />
            <button 
                onClick={handleUploadClick} 
                disabled={disabled}
                className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-gray-100 text-gray-700 font-semibold rounded-xl border-2 border-dashed border-gray-300 hover:border-pink-500 hover:bg-pink-50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                <UploadIcon />
                Choose image...
            </button>
        </div>
    );
};