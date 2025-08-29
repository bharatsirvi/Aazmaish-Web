import React, { useState, useRef } from 'react';
import type { UserImage } from '../types';
import { CameraIcon } from './icons/CameraIcon';
import { UploadIcon } from './icons/UploadIcon';
import { ResetIcon } from './icons/ResetIcon';

interface ImageSlotProps {
  title: string;
  description: string;
  image: UserImage | null;
  onImageSelect: (image: UserImage | null) => void;
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
                setError("Could not access camera. Please check permissions.");
            }
        };
        startCamera();
        return () => {
            if (videoRef.current && videoRef.current.srcObject) {
                (videoRef.current.srcObject as MediaStream).getTracks().forEach(track => track.stop());
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
            <div className="relative w-full aspect-square rounded-2xl overflow-hidden border-4 border-[var(--accent-primary)] shadow-lg">
                <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover transform -scale-x-100"></video>
                <canvas ref={canvasRef} width="512" height="512" className="hidden"></canvas>
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <div className="flex gap-4">
                <button onClick={onCancel} className="px-6 py-2 bg-[var(--bg-accent)] text-[var(--text-primary)] font-semibold rounded-lg shadow-sm hover:bg-[var(--border-primary)] transition-colors">Cancel</button>
                <button onClick={handleSnap} className="px-6 py-2 bg-[var(--accent-primary)] text-white font-semibold rounded-lg shadow-md hover:bg-[var(--accent-secondary)] transition-colors">Snap</button>
            </div>
        </div>
    );
};


export const ImageSlot: React.FC<ImageSlotProps> = ({ title, description, image, onImageSelect }) => {
    const [isCameraOpen, setIsCameraOpen] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            try {
                const userImage = await fileToUserImage(file);
                onImageSelect(userImage);
            } catch (error)
 {
                console.error("Error processing file:", error);
            }
        }
    };

    const handleCapture = (img: UserImage) => {
        onImageSelect(img);
        setIsCameraOpen(false);
    }

    if (image) {
        return (
             <div className="w-full flex flex-col items-center gap-4">
                <div className="relative w-full aspect-square rounded-2xl overflow-hidden shadow-lg border-4 border-green-400 group">
                    <img src={`data:${image.mimeType};base64,${image.base64}`} alt={title} className="w-full h-full object-cover"/>
                     <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                         <button onClick={() => onImageSelect(null)} className="flex items-center gap-2 px-4 py-2 bg-white/80 text-black font-semibold rounded-lg shadow-md hover:bg-white transition-colors">
                            <ResetIcon /> Change
                        </button>
                     </div>
                </div>
            </div>
        )
    }

    if (isCameraOpen) {
        return <CameraCapture onCapture={handleCapture} onCancel={() => setIsCameraOpen(false)} />;
    }

    return (
        <div className="w-full h-80 bg-[var(--bg-primary)] rounded-xl border-2 border-dashed border-[var(--border-secondary)] hover:border-[var(--accent-primary)] text-center transition-all duration-300 overflow-hidden">
            <div className="flex flex-col items-center justify-center h-full p-6">
                <div className="mb-4">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-[var(--accent-primary)] rounded-full mb-3">
                        {title === 'Person' ? (
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        ) : (
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v7a2 2 0 002 2h4a2 2 0 002-2V5z" />
                            </svg>
                        )}
                    </div>
                    <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2">{title}</h3>
                    <p className="text-[var(--text-secondary)] text-sm">{description}</p>
                </div>
                
                <div className="space-y-2 w-full max-w-xs">
                    <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
                    <button 
                        onClick={() => fileInputRef.current?.click()} 
                        className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[var(--accent-primary)] text-white font-medium rounded-lg hover:bg-[var(--accent-secondary)] transition-colors"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                        Upload Photo
                    </button>
                    <button 
                        onClick={() => setIsCameraOpen(true)} 
                        className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-transparent text-[var(--text-secondary)] font-medium rounded-lg border border-[var(--border-secondary)] hover:bg-[var(--bg-secondary)] transition-colors"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        Take Photo
                    </button>
                </div>
            </div>
        </div>
    );
};