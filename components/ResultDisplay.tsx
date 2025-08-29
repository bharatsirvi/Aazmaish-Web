import React from 'react';

interface ResultDisplayProps {
  generatedImage: string;
  onReset: () => void;
  onChangeOutfit: () => void;
}

export const ResultDisplay: React.FC<ResultDisplayProps> = ({ generatedImage, onReset, onChangeOutfit }) => {
    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = generatedImage;
        link.download = `aazmaish-result-${Date.now()}.jpeg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="w-full max-w-2xl mx-auto text-center">
            {/* Result image */}
            <div className="relative mb-6">
                <div className="bg-[var(--bg-secondary)] rounded-2xl p-4 shadow-lg border border-[var(--border-primary)]/20">
                    <img 
                        src={generatedImage} 
                        alt="Your Virtual Try-On Result" 
                        className="w-full h-auto max-h-96 object-contain rounded-xl"
                    />
                </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap justify-center gap-3">
                <button 
                    onClick={onChangeOutfit} 
                    className="flex items-center gap-2 px-6 py-3 bg-[var(--accent-primary)] text-white font-medium rounded-lg hover:bg-[var(--accent-secondary)] transition-colors"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Try Another
                </button>
                <button 
                    onClick={handleDownload} 
                    className="flex items-center gap-2 px-6 py-3 bg-[var(--bg-secondary)] text-[var(--text-primary)] font-medium rounded-lg border border-[var(--border-secondary)] hover:bg-[var(--bg-primary)] transition-colors"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Download
                </button>
                <button 
                    onClick={onReset} 
                    className="flex items-center gap-2 px-6 py-3 bg-transparent text-[var(--text-secondary)] font-medium rounded-lg border border-[var(--border-secondary)] hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-colors"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Start Over
                </button>
            </div>
        </div>
    );
};
