import React, { useState, useRef, useCallback } from 'react';
import type { UserImage } from '../types';
import { CameraIcon } from './icons/CameraIcon';
import { UploadIcon } from './icons/UploadIcon';

interface ImageInputProps {
  onImageSelect: (image: UserImage) => void;
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

const CameraCapture: React.FC<{ onCapture: (image: UserImage) => void; onCancel: () => void }> = ({ onCapture, onCancel }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [error, setError] = useState<string | null>(null);

    React.useEffect(() => {
        const startCamera = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: { width: 512, height: 512, facingMode: 'user' } });
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
            } catch (err) {
                console.error("Error accessing camera:", err);
                setError("Could not access camera. Please check permissions and try again.");
            }
        };

        startCamera();

        return () => {
            if (videoRef.current && videoRef.current.srcObject) {
                const stream = videoRef.current.srcObject as MediaStream;
                stream.getTracks().forEach(track => track.stop());
            }
        };
    }, []);

    const handleSnap = () => {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        if (video && canvas) {
            const context = canvas.getContext('2d');
            if(context) {
                context.drawImage(video, 0, 0, 512, 512);
                const dataUrl = canvas.toDataURL('image/jpeg');
                const base64 = dataUrl.split(',')[1];
                onCapture({ base64, mimeType: 'image/jpeg' });
            }
        }
    };
    
    return (
        <div className="w-full flex flex-col items-center gap-4">
            <div className="relative w-full max-w-md aspect-square rounded-2xl overflow-hidden border-4 border-pink-300 shadow-lg">
                <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover transform -scale-x-100"></video>
                <canvas ref={canvasRef} width="512" height="512" className="hidden"></canvas>
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <div className="flex gap-4">
                <button onClick={onCancel} className="px-6 py-2 bg-gray-200 text-gray-700 font-semibold rounded-lg shadow-sm hover:bg-gray-300 transition-colors">Cancel</button>
                <button onClick={handleSnap} className="px-6 py-2 bg-pink-600 text-white font-semibold rounded-lg shadow-md hover:bg-pink-700 transition-colors">Snap Photo</button>
            </div>
        </div>
    );
};

export const ImageInput: React.FC<ImageInputProps> = ({ onImageSelect }) => {
  const [mode, setMode] = useState<'select' | 'camera'>('select');
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const userImage = await fileToUserImage(file);
        onImageSelect(userImage);
      } catch (error) {
        console.error("Error processing file:", error);
      }
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  if (mode === 'camera') {
      return <CameraCapture onCapture={onImageSelect} onCancel={() => setMode('select')} />;
  }

  return (
    <div className="w-full max-w-lg mx-auto bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-gray-200 text-center animate-slide-in">
        <h2 className="text-2xl font-bold mb-2">Start Your Makeover</h2>
        <p className="text-gray-600 mb-8">Upload a clear, front-facing photo or use your camera.</p>
        <div className="flex flex-col md:flex-row gap-4 justify-center">
            <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
            <button onClick={handleUploadClick} className="w-full md:w-auto flex-1 flex items-center justify-center gap-3 px-6 py-4 bg-gray-100 text-gray-700 font-semibold rounded-xl border-2 border-dashed border-gray-300 hover:border-pink-500 hover:bg-pink-50 transition-all duration-300 transform hover:scale-105">
                <UploadIcon />
                Upload Photo
            </button>
            <button onClick={() => setMode('camera')} className="w-full md:w-auto flex-1 flex items-center justify-center gap-3 px-6 py-4 bg-pink-600 text-white font-semibold rounded-xl shadow-md hover:bg-pink-700 transition-colors transform hover:scale-105">
                <CameraIcon />
                Use Camera
            </button>
        </div>
    </div>
  );
};