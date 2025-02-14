import React, { useState, useRef, useEffect } from 'react';
import './VideoSequence.css';

const VideoSequence = () => {
    const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
    const [isVisible, setIsVisible] = useState(true);

    // Liste des vidéos (à remplacer par vos URLs réelles)
    const videos = [
        '/video1.mp4',
        '/video2.mp4',
        '/video3.mp4'
    ];

    const videoRef = useRef(null);

    // Effet pour gérer la visibilité lors du changement de vidéo
    useEffect(() => {
        setIsVisible(true);
        if (videoRef.current) {
            videoRef.current.load();
        }
    }, [currentVideoIndex]);

    const handleVideoClick = () => {
        if (videoRef.current) {
            videoRef.current.play();
        }
    };

    const handleVideoEnd = () => {
        if (currentVideoIndex < videos.length - 1) {
            setIsVisible(false);
            // Attendre que la transition de fondu soit terminée avant de changer de vidéo
            setTimeout(() => {
                setCurrentVideoIndex(currentVideoIndex + 1);
            }, 1000); // Durée correspondant à la transition CSS
        }
    };

    if (currentVideoIndex >= videos.length) {
        return (
            <div className="end-message">
                Toutes les vidéos ont été visionnées
            </div>
        );
    }

    return (
        <div className="video-container">
            <video
                ref={videoRef}
                className={`video-player ${isVisible ? 'visible' : ''}`}
                src={videos[currentVideoIndex]}
                onClick={handleVideoClick}
                onEnded={handleVideoEnd}
                playsInline
            />
            <div className="video-counter">
                {`Vidéo ${currentVideoIndex + 1}/${videos.length}`}
            </div>
        </div>
    );
};

export default VideoSequence;