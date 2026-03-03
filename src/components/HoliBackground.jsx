import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const HoliBackground = () => {
    const bgRef = useRef(null);

    useEffect(() => {
        const bubbles = bgRef.current.querySelectorAll('.bubble');

        bubbles.forEach((bubble, i) => {
            gsap.to(bubble, {
                x: 'random(-50, 50)vw',
                y: 'random(-50, 50)vh',
                duration: 'random(15, 25)',
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut',
                delay: i * -2
            });
        });
    }, []);

    const bubbleColors = [
        'rgba(255, 27, 107, 0.15)',
        'rgba(253, 187, 45, 0.15)',
        'rgba(34, 197, 94, 0.15)',
        'rgba(147, 51, 234, 0.15)',
        'rgba(249, 115, 22, 0.15)',
        'rgba(59, 130, 246, 0.15)'
    ];

    return (
        <div ref={bgRef} className="bg-wrapper">
            {[...Array(15)].map((_, i) => (
                <div
                    key={i}
                    className="bubble"
                    style={{
                        background: bubbleColors[i % bubbleColors.length],
                        width: `${Math.random() * 400 + 200}px`,
                        height: `${Math.random() * 400 + 200}px`,
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                    }}
                />
            ))}

            <style jsx="true">{`
        .bg-wrapper {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
          z-index: 0;
          background: #ffffff;
        }

        .bubble {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.5;
        }
      `}</style>
        </div>
    );
};

export default HoliBackground;
