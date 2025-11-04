"use client";

import React, { useState, useEffect, useRef } from "react";

interface VideoCarouselProps {
  videos: string[];
  className?: string;
  opacity?: number;
}

export default function VideoCarousel({
  videos,
  className = "",
  opacity = 0.6
}: VideoCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const handleVideoEnd = () => {
    const nextIndex = (currentIndex + 1) % videos.length;
    setCurrentIndex(nextIndex);
  };

  useEffect(() => {
    const currentVideo = videoRefs.current[currentIndex];
    if (currentVideo) {
      currentVideo.currentTime = 0;
      currentVideo.play().catch((err) => {
        console.log("Video autoplay prevented:", err);
      });
    }
  }, [currentIndex]);

  return (
    <div className={`absolute inset-0 w-full h-full ${className}`}>
      {videos.map((video, index) => (
        <video
          key={video}
          ref={(el) => {
            videoRefs.current[index] = el;
          }}
          muted
          playsInline
          preload="auto"
          onEnded={handleVideoEnd}
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            opacity: index === currentIndex ? opacity : 0,
            zIndex: index === currentIndex ? 1 : 0,
            display: index === currentIndex ? 'block' : 'none'
          }}
        >
          <source src={video} type="video/mp4" />
        </video>
      ))}
    </div>
  );
}
