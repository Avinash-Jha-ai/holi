import React, { useEffect, useRef } from 'react';

const AudioPlayer = ({ isPlaying }) => {
    const audioRef = useRef(null);

    useEffect(() => {
        if (isPlaying && audioRef.current) {
            audioRef.current.volume = 0.4;
            audioRef.current.play().catch(err => console.log("Audio autoplay prevented", err));
        }
    }, [isPlaying]);

    return (
        <audio
            ref={audioRef}
            loop
            src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
        />
    );
};

export default AudioPlayer;
