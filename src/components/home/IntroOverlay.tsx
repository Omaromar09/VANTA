import React, { useRef, useEffect, useState, useCallback } from 'react';

interface IntroOverlayProps {
  onIntroComplete?: () => void;
}

export const IntroOverlay: React.FC<IntroOverlayProps> = ({ onIntroComplete }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isFading, setIsFading] = useState(false);
  const [isRemoved, setIsRemoved] = useState(() => {
    if (typeof window !== 'undefined') {
      const p = new URLSearchParams(window.location.search);
      return p.has('nointro') || p.has('skip') || window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
    return false;
  });
  const doneRef = useRef(false);

  // Preload heavy assets while intro plays
  const preloadAssets = useCallback(() => {
    // 1. Key fleet & showcase imagery
    const priorityImages = [
      '/assets/poster.jpg',
      '/images/hero-car-final-frame.jpg',
      '/images/gt900-front-34.jpg',
      '/images/gt900-side.jpg',
      '/images/gt900-rear.jpg',
      '/images/spectre-front.jpg',
      '/images/cyclone-front.jpg',
      '/images/nocturne-front.jpg',
      '/images/apex-front.jpg',
      '/images/valkyrie-front.jpg',
      '/images/cockpit-detail.jpg',
    ];

    priorityImages.forEach((src) => {
      const img = new Image();
      img.src = src;
    });

    // 2. Preload primary 360 turntable frames (first 12 frames for immediate interactive responsiveness)
    for (let i = 1; i <= 12; i++) {
      const padded = String(i).padStart(2, '0');
      const img = new Image();
      img.src = `/turntable/orange/frame_${padded}.jpg`;
    }
  }, []);

  const finish = useCallback(() => {
    if (doneRef.current) return;
    doneRef.current = true;

    // 1. Trigger CSS opacity fade over ~0.7s
    setIsFading(true);

    // 2. Reveal site and stagger animations after fade starts
    setTimeout(() => {
      const root = document.documentElement;
      root.classList.add('intro-done');
      window.dispatchEvent(new CustomEvent('intro:done'));
      
      if (onIntroComplete) {
        onIntroComplete();
      }

      // 3. Remove from DOM completely
      setIsRemoved(true);
    }, 450);
  }, [onIntroComplete]);

  useEffect(() => {
    const root = document.documentElement;
    const video = videoRef.current;

    const searchParams = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
    // Respect user's motion preference or query skip flags: skip intro immediately
    if (
      (searchParams && (searchParams.has('nointro') || searchParams.has('skip'))) ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      finish();
      return;
    }

    // Begin preloading heavy assets during intro
    preloadAssets();

    if (!video) return;

    // Hard safety timeout of 15 seconds (video duration is ~10s)
    const safetyTimeout = setTimeout(finish, 15000);

    // Handlers
    const handleEnded = () => finish();
    const handleError = () => finish();

    video.addEventListener('ended', handleEnded);
    video.addEventListener('error', handleError);

    // Autoplay attempt with fallback if blocked by browser policy
    video.play().catch(() => {
      setTimeout(finish, 800);
    });

    return () => {
      clearTimeout(safetyTimeout);
      if (video) {
        video.removeEventListener('ended', handleEnded);
        video.removeEventListener('error', handleError);
      }
    };
  }, [finish, preloadAssets]);

  // Once finished and faded out, completely remove element from DOM
  if (isRemoved) {
    return null;
  }

  return (
    <div
      id="intro"
      aria-label="Intro"
      className={isFading ? 'fade' : ''}
    >
      <video
        ref={videoRef}
        id="introVideo"
        src="/assets/intro.mp4"
        poster="/assets/poster.jpg"
        muted
        playsInline
        preload="auto"
        autoPlay
      />
      <button
        id="skip"
        type="button"
        onClick={finish}
        aria-label="Skip Intro"
      >
        Skip
      </button>
    </div>
  );
};
