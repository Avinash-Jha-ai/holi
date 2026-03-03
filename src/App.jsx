import React, { useState, useCallback, useRef } from 'react';
import InteractiveCanvas from './components/InteractiveCanvas';
import Hero from './components/Hero';
import HoliBackground from './components/HoliBackground';
import CornerPops from './components/CornerPops';
import Preloader from './components/Preloader';
import AudioPlayer from './components/AudioPlayer';
import './index.scss';

function App() {
  const [celebrationStarted, setCelebrationStarted] = useState(false);
  const canvasRef = useRef(null);

  const startCelebration = useCallback(() => {
    setCelebrationStarted(true);
    // Trigger initial splash after small delay
    setTimeout(() => {
      if (window.triggerInitialSplash) {
        window.triggerInitialSplash();
      }
    }, 500);
  }, []);

  return (
    <div className="app-container">
      <Preloader onComplete={startCelebration} />
      <HoliBackground />
      <AudioPlayer isPlaying={celebrationStarted} />
      <CornerPops />
      <InteractiveCanvas />

      {celebrationStarted && (
        <main className="content">
          <Hero />
        </main>
      )}

      <style jsx="true">{`
        .app-container {
          width: 100%;
          height: 100vh;
          position: relative;
          color: white;
          overflow: hidden;
        }

        .content {
          position: relative;
          z-index: 10;
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          pointer-events: none; /* Allow canvas interactions through the content */
        }

        /* Re-enable pointer events for interactive elements */
        .content :global(.glass),
        .content :global(button) {
          pointer-events: auto;
        }
      `}</style>
    </div>
  );
}

export default App;
