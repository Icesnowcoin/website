/*
 * Design: Quantum Ice — Video section
 * Community recruitment video with scroll-triggered autoplay
 */
import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Volume2, VolumeX } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { ASSETS, LINKS } from '@/lib/assets';

export default function VideoSection() {
  const { t } = useLanguage();
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section || !video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().then(() => setIsPlaying(true)).catch(() => {});
        } else {
          video.pause();
          setIsPlaying(false);
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
    setHasInteracted(true);
  };

  const handlePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play().then(() => setIsPlaying(true));
    } else {
      video.pause();
      setIsPlaying(false);
    }
    setHasInteracted(true);
  };

  return (
    <section ref={sectionRef} id="video" className="relative py-24 sm:py-32">
      <div className="container mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-glow" style={{ fontFamily: 'var(--font-heading)', color: 'oklch(0.92 0.03 220)' }}>
            {t('video.title')}
          </h2>
          <p className="mt-3 text-base sm:text-lg" style={{ fontFamily: 'var(--font-sub)', color: 'oklch(0.65 0.08 220)' }}>
            {t('video.subtitle')}
          </p>
          <div className="mt-4 mx-auto h-[1px] w-24 bg-gradient-to-r from-transparent via-ice-blue to-transparent" />
        </motion.div>

        {/* Video Player */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative max-w-4xl mx-auto rounded-2xl overflow-hidden border border-[oklch(0.75_0.12_220/0.2)] border-glow"
        >
          <div className="relative aspect-video bg-[oklch(0.08_0.02_250)]">
            <video
              ref={videoRef}
              src={ASSETS.communityVideo}
              muted={isMuted}
              loop
              playsInline
              preload="metadata"
              className="w-full h-full object-cover"
              onClick={handlePlay}
            />

            {/* Play overlay (shown when not playing and not yet interacted) */}
            {!isPlaying && !hasInteracted && (
              <div
                className="absolute inset-0 flex items-center justify-center bg-[oklch(0.08_0.02_250/0.5)] cursor-pointer"
                onClick={handlePlay}
              >
                <div className="w-16 h-16 rounded-full bg-[oklch(0.75_0.12_220/0.2)] backdrop-blur-sm flex items-center justify-center border border-[oklch(0.75_0.12_220/0.4)]">
                  <Play className="w-7 h-7 text-ice-blue ml-1" />
                </div>
              </div>
            )}

            {/* Controls */}
            <div className="absolute bottom-4 right-4 flex gap-2">
              <button
                onClick={toggleMute}
                className="p-2 rounded-lg bg-[oklch(0.10_0.02_250/0.7)] backdrop-blur-sm border border-[oklch(0.75_0.12_220/0.2)] hover:border-[oklch(0.75_0.12_220/0.4)] transition-colors"
              >
                {isMuted ? <VolumeX className="w-4 h-4 text-ice-blue" /> : <Volume2 className="w-4 h-4 text-ice-blue" />}
              </button>
            </div>
          </div>
        </motion.div>


      </div>
    </section>
  );
}
