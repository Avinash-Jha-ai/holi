import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart, Music, Ghost } from 'lucide-react';

const Hero = () => {
  return (
    <div className="hero-container">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="glass hero-card"
      >
        <div className="festive-header">
          <motion.div
            animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.2, 1.2, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <Sparkles size={40} className="icon-vibrant-pink" />
          </motion.div>
          <Music size={24} className="icon-vibrant-blue" />
        </div>

        <h1 className="hero-title">
          <span className="word-happy">Happy</span>
          <span className="text-gradient word-holi">Holi</span>
        </h1>

        <p className="hero-subtitle">
          Celebrate the <span className="highlight-colors">vibrant tones</span> of life!
          Spread love, joy, and <span className="highlight-laughter">laughter</span> today.
        </p>

        <div className="features-grid">
          <motion.div whileHover={{ y: -5 }} className="feature-item">
            <div className="color-dot bg-pink"></div>
            <span className="text-pink">Colors</span>
          </motion.div>
          <motion.div whileHover={{ y: -5 }} className="feature-item">
            <div className="color-dot bg-green"></div>
            <span className="text-green">Joy</span>
          </motion.div>
          <motion.div whileHover={{ y: -5 }} className="feature-item">
            <div className="color-dot bg-blue"></div>
            <span className="text-blue">Love</span>
          </motion.div>
        </div>

        <div className="button-group">
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 10px 25px -5px rgba(217, 70, 239, 0.4)' }}
            whileTap={{ scale: 0.95 }}
            className="wish-button"
            onClick={() => {
              const colors = ['#d946ef', '#eab308', '#22c55e', '#a855f7', '#f97316', '#0ea5e9'];
              import('canvas-confetti').then(confetti => {
                confetti.default({
                  particleCount: 150,
                  spread: 100,
                  origin: { y: 0.6 },
                  colors: colors,
                  ticks: 300
                });
              });
            }}
          >
            Spray Happiness!
          </motion.button>
        </div>
      </motion.div>

      <style jsx="true">{`
        .hero-container {
          position: relative;
          z-index: 10;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 100%;
          padding: 20px;
        }

        .hero-card {
          padding: 4rem 3rem;
          max-width: 550px;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2rem;
        }

        .festive-header {
          display: flex;
          gap: 1.5rem;
          align-items: center;
        }

        .hero-title {
          display: flex;
          flex-direction: column;
          line-height: 1;
          margin: 0;
        }

        .word-happy {
          font-size: 2.5rem;
          font-weight: 400;
          color: #475569;
          letter-spacing: 4px;
          text-transform: uppercase;
        }

        .word-holi {
          font-size: 6rem;
          font-weight: 900;
          letter-spacing: -3px;
        }

        .hero-subtitle {
          font-size: 1.25rem;
          color: #334155;
          line-height: 1.6;
          max-width: 400px;
        }

        .highlight-colors { color: #d946ef; font-weight: 700; }
        .highlight-laughter { color: #0ea5e9; font-weight: 700; }

        .features-grid {
          display: flex;
          gap: 2rem;
          margin: 0.5rem 0;
        }

        .feature-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          font-weight: 700;
          font-size: 0.9rem;
          text-transform: uppercase;
        }

        .color-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
        }

        .bg-pink { background: #d946ef; }
        .bg-green { background: #22c55e; }
        .bg-blue { background: #0ea5e9; }
        
        .text-pink { color: #d946ef; }
        .text-green { color: #22c55e; }
        .text-blue { color: #0ea5e9; }

        .wish-button {
          padding: 1.25rem 3rem;
          font-size: 1.2rem;
          font-weight: 800;
          background: linear-gradient(135deg, #d946ef 0%, #a855f7 100%);
          border: none;
          border-radius: 20px;
          color: white;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .icon-vibrant-pink { color: #d946ef; }
        .icon-vibrant-blue { color: #0ea5e9; }

        @media (max-width: 768px) {
          .word-holi { font-size: 4rem; }
          .word-happy { font-size: 1.8rem; }
          .hero-card { padding: 3rem 2rem; }
        }
      `}</style>
    </div>
  );
};

export default Hero;
