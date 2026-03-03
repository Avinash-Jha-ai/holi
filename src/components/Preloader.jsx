import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Preloader = ({ onComplete }) => {
    const [loading, setLoading] = useState(true);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((oldProgress) => {
                if (oldProgress >= 100) {
                    clearInterval(timer);
                    return 100;
                }
                return Math.min(oldProgress + Math.random() * 15, 100);
            });
        }, 200);

        return () => clearInterval(timer);
    }, []);

    return (
        <AnimatePresence>
            {loading && (
                <motion.div
                    className="preloader-overlay"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 1.1 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                >
                    <div className="preloader-content">
                        <motion.div
                            className="loader-circle"
                            animate={{
                                rotate: 360,
                                borderColor: ["#d946ef", "#0ea5e9", "#22c55e", "#d946ef"]
                            }}
                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        />
                        <h2 className="loader-text">Preparing the Colors...</h2>
                        <div className="progress-bar-container">
                            <motion.div
                                className="progress-bar"
                                initial={{ width: 0 }}
                                animate={{ width: `${progress}%` }}
                            />
                        </div>

                        {progress === 100 && (
                            <motion.button
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="start-button"
                                onClick={() => {
                                    setLoading(false);
                                    setTimeout(onComplete, 800);
                                }}
                            >
                                Start Celebration
                            </motion.button>
                        )}
                    </div>

                    <style jsx="true">{`
            .preloader-overlay {
              position: fixed;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              background: #ffffff;
              z-index: 10000;
              display: flex;
              justify-content: center;
              align-items: center;
            }

            .preloader-content {
              text-align: center;
              display: flex;
              flex-direction: column;
              align-items: center;
              gap: 2rem;
            }

            .loader-circle {
              width: 80px;
              height: 80px;
              border: 6px solid #f3f4f6;
              border-top: 6px solid #d946ef;
              border-radius: 50%;
            }

            .loader-text {
              font-size: 1.5rem;
              color: #475569;
              font-weight: 600;
              letter-spacing: 1px;
            }

            .progress-bar-container {
              width: 300px;
              height: 8px;
              background: #f1f5f9;
              border-radius: 10px;
              overflow: hidden;
            }

            .progress-bar {
              height: 100%;
              background: linear-gradient(90deg, #d946ef, #0ea5e9);
            }

            .start-button {
              padding: 1rem 3rem;
              font-size: 1.25rem;
              font-weight: 800;
              background: #1e1b4b;
              color: white;
              border: none;
              border-radius: 50px;
              cursor: pointer;
              box-shadow: 0 10px 20px rgba(0,0,0,0.1);
              transition: all 0.3s ease;
            }

            .start-button:hover {
              transform: translateY(-3px);
              box-shadow: 0 15px 30px rgba(0,0,0,0.15);
              background: #312e81;
            }
          `}</style>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Preloader;
