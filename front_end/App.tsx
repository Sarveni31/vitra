import { useState } from 'react';
import { Navigation } from './components/Navigation';
import { HomeDashboard } from './components/HomeDashboard';
import { DataInputScreen } from './components/DataInputScreen';
import { PredictionScreen } from './components/PredictionScreen';
import { Toaster } from './components/ui/sonner';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<'home' | 'input' | 'prediction'>('home');

  const renderCurrentScreen = () => {
    switch (currentScreen) {
      case 'home':
        return <HomeDashboard />;
      case 'input':
        return <DataInputScreen />;
      case 'prediction':
        return <PredictionScreen />;
      default:
        return <HomeDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation currentScreen={currentScreen} onScreenChange={setCurrentScreen} />
      <main className="max-w-6xl mx-auto p-4 md:p-6 pb-8">
        {renderCurrentScreen()}
      </main>
      <Toaster />
    </div>
  );
}