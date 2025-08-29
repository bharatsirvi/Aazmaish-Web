import React, { useState } from 'react';
import { Header } from './components/Header';
import { ResultDisplay } from './components/ResultDisplay';
import { Footer } from './components/Footer';
import { Loader } from './components/Loader';
import { AppState, UserImage } from './types';
import { generateTryOnImage } from './services/geminiService';
import { ImageSlot } from './components/ImageSlot';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.INITIAL);
  const [personImage, setPersonImage] = useState<UserImage | null>(null);
  const [outfitImage, setOutfitImage] = useState<UserImage | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleGenerate = async () => {
    if (!personImage || !outfitImage) {
      setError("Please select both a person and an outfit image.");
      return;
    }
    setAppState(AppState.GENERATING);
    setIsLoading(true);
    setError(null);
    setGeneratedImage(null);

    try {
      const result = await generateTryOnImage(personImage, outfitImage);
      setGeneratedImage(result);
      setAppState(AppState.RESULT_READY);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred.");
      setAppState(AppState.INITIAL); 
    } finally {
      setIsLoading(false);
    }
  };


  const handleReset = () => {
    setAppState(AppState.INITIAL);
    setPersonImage(null);
    setOutfitImage(null);
    setGeneratedImage(null);
    setError(null);
    setIsLoading(false);
  };

  const handleChangeOutfit = () => {
    setAppState(AppState.INITIAL);
    setOutfitImage(null);
    setGeneratedImage(null);
    setError(null);
    setIsLoading(false);
  };
  
  const renderContent = () => {
    if (appState === AppState.RESULT_READY && generatedImage) {
        return <ResultDisplay 
                  generatedImage={`data:image/jpeg;base64,${generatedImage}`} 
                  onReset={handleReset}
                  onChangeOutfit={handleChangeOutfit}
                />
    }

    return (
        <div className="w-full max-w-4xl mx-auto bg-[var(--bg-secondary)] p-4 sm:p-6 lg:p-8 rounded-2xl shadow-lg border border-[var(--border-primary)]/20 relative overflow-hidden">
            {isLoading && <Loader />}
            
            <div className="text-center mb-6 sm:mb-8">
                <h2 className="text-2xl sm:text-3xl font-bold mb-2 sm:mb-3 text-[var(--text-primary)]">
                    Virtual Try-On
                </h2>
                <p className="text-sm sm:text-base text-[var(--text-secondary)] px-2">
                    Upload a photo of yourself and a clothing item to see how it looks on you.
                </p>
            </div>
        
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
                <ImageSlot 
                    title="Person" 
                    description="Upload a clear, front-facing photo." 
                    image={personImage} 
                    onImageSelect={setPersonImage}
                />
                <ImageSlot 
                    title="Outfit" 
                    description="Upload a photo of a single clothing item." 
                    image={outfitImage} 
                    onImageSelect={setOutfitImage}
                />
            </div>

            {error && (
                <div className="text-center mb-4 sm:mb-6">
                    <p className="text-red-600 bg-red-50 dark:bg-red-900/20 dark:text-red-400 px-3 sm:px-4 py-2 rounded-lg border border-red-200 dark:border-red-800 text-sm sm:text-base">{error}</p>
                </div>
            )}
            
            <div className="text-center">
                <button 
                    onClick={handleGenerate} 
                    disabled={!personImage || !outfitImage || isLoading}
                    className="w-full sm:w-auto px-6 sm:px-8 py-3 bg-[var(--accent-primary)] text-white font-semibold rounded-lg hover:bg-[var(--accent-secondary)] disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors text-sm sm:text-base"
                >
                    Generate Try-On
                </button>
            </div>
        </div>
    );
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] transition-colors duration-300">
      <Header />
      <main className="flex-grow flex items-center justify-center p-2 sm:p-4 lg:p-8 min-h-[calc(100vh-140px)]">
        {renderContent()}
      </main>
      <Footer />
    </div>
  );
};

export default App;