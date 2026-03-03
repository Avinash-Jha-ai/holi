import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';

const CornerPops = () => {
    useEffect(() => {
        const colors = ['#d946ef', '#eab308', '#22c55e', '#a855f7', '#f97316', '#0ea5e9'];

        const fire = () => {
            // Top-left
            confetti({
                particleCount: 50,
                angle: 315,
                spread: 60,
                origin: { x: 0, y: 0 },
                colors: colors,
                startVelocity: 30,
                gravity: 0.5,
                ticks: 200,
                zIndex: 0
            });
            // Top-right
            confetti({
                particleCount: 50,
                angle: 225,
                spread: 60,
                origin: { x: 1, y: 0 },
                colors: colors,
                startVelocity: 30,
                gravity: 0.5,
                ticks: 200,
                zIndex: 0
            });
            // Bottom-left
            confetti({
                particleCount: 50,
                angle: 45,
                spread: 60,
                origin: { x: 0, y: 1 },
                colors: colors,
                startVelocity: 30,
                gravity: 0.5,
                ticks: 200,
                zIndex: 0
            });
            // Bottom-right
            confetti({
                particleCount: 50,
                angle: 135,
                spread: 60,
                origin: { x: 1, y: 1 },
                colors: colors,
                startVelocity: 30,
                gravity: 0.5,
                ticks: 200,
                zIndex: 0
            });
        };

        // Initial fire
        fire();

        // Repeat every 5 seconds for a lively party feel
        const interval = setInterval(fire, 5000);

        return () => clearInterval(interval);
    }, []);

    return null;
};

export default CornerPops;
