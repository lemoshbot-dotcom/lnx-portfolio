"use client";

import { notFound, useRouter } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import { projects } from "@/data/projects";
import { useRef, useEffect, useState, use } from "react";
import React from "react";

export default function ProjectPage({ params }: { params: Promise<{ locale: string; id: string }> }) {
  const { locale, id } = use(params);
  const project = projects.find((p) => p.id === id);
  const router = useRouter();

  // Importação dinâmica do dicionário no cliente
  const [dict, setDict] = useState<any>(null);

  // Video sync refs for Before & After
  const videoOriginalRef = useRef<HTMLVideoElement>(null);
  const videoReplaceRef = useRef<HTMLVideoElement>(null);

  // Video carousel state
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const carouselVideoRef = useRef<HTMLVideoElement>(null);

  // Image carousel state
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Video playback state for Before & After
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    import(`@/dictionaries/${locale}.json`).then((module) => {
      setDict(module.default);
    });
  }, [locale]);

  // Sync videos
  useEffect(() => {
    if (id !== "bradesco-agro") return;

    const videoOriginal = videoOriginalRef.current;
    const videoReplace = videoReplaceRef.current;

    if (!videoOriginal || !videoReplace) return;

    const handlePlay = () => {
      if (videoOriginal && videoReplace) {
        videoReplace.play();
      }
    };

    const handlePause = () => {
      if (videoOriginal && videoReplace) {
        videoReplace.pause();
      }
    };

    const handleSeeking = () => {
      if (videoOriginal && videoReplace) {
        videoReplace.currentTime = videoOriginal.currentTime;
      }
    };

    videoOriginal.addEventListener('play', handlePlay);
    videoOriginal.addEventListener('pause', handlePause);
    videoOriginal.addEventListener('seeking', handleSeeking);

    return () => {
      videoOriginal.removeEventListener('play', handlePlay);
      videoOriginal.removeEventListener('pause', handlePause);
      videoOriginal.removeEventListener('seeking', handleSeeking);
    };
  }, [id]);

  // Reset video time when carousel changes
  useEffect(() => {
    const video = carouselVideoRef.current;
    if (!video) return;

    // Set start time for second video (index 1)
    if (currentVideoIndex === 1) {
      const setStartTime = () => {
        video.currentTime = 2; // Start 2 seconds in
        video.removeEventListener('loadedmetadata', setStartTime);
      };

      if (video.readyState >= 1) {
        video.currentTime = 2;
      } else {
        video.addEventListener('loadedmetadata', setStartTime);
      }

      return () => video.removeEventListener('loadedmetadata', setStartTime);
    }
  }, [currentVideoIndex]);

  // Auto-advance video carousel every 5 seconds
  useEffect(() => {
    if (!project?.videos || project.videos.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentVideoIndex((prev) => (prev + 1) % project.videos!.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [project?.videos]);

  // Check video time to end first video 1 second early
  useEffect(() => {
    if (!carouselVideoRef.current || currentVideoIndex !== 0) return;

    const video = carouselVideoRef.current;

    const checkTime = () => {
      if (video.duration && video.currentTime >= video.duration - 1) {
        setCurrentVideoIndex(1);
      }
    };

    video.addEventListener('timeupdate', checkTime);
    return () => video.removeEventListener('timeupdate', checkTime);
  }, [currentVideoIndex]);


  const nextVideo = () => {
    if (!project?.videos) return;
    setCurrentVideoIndex((prev) => (prev + 1) % project.videos!.length);
  };

  const prevVideo = () => {
    if (!project?.videos) return;
    setCurrentVideoIndex((prev) => (prev - 1 + project.videos!.length) % project.videos!.length);
  };

  // Auto-advance image carousel every 5 seconds
  useEffect(() => {
    if (!project?.images || project.images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % project.images!.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [project?.images]);

  const nextImage = () => {
    if (!project?.images) return;
    setCurrentImageIndex((prev) => (prev + 1) % project.images!.length);
  };

  const prevImage = () => {
    if (!project?.images) return;
    setCurrentImageIndex((prev) => (prev - 1 + project.images!.length) % project.images!.length);
  };

  // Toggle play/pause for both videos
  const togglePlayPause = () => {
    const videoOriginal = videoOriginalRef.current;
    const videoReplace = videoReplaceRef.current;

    if (!videoOriginal || !videoReplace) return;

    if (isPlaying) {
      videoOriginal.pause();
      videoReplace.pause();
    } else {
      videoOriginal.play();
      videoReplace.play();
    }
    setIsPlaying(!isPlaying);
  };

  const goBackToProjects = () => {
    router.push(`/${locale}#works`);
  };

  if (!project) {
    notFound();
  }

  if (!dict || !dict.projectPage) return null;

  return (
    <main className="min-h-screen bg-black text-white">
      <Header locale={locale} dict={dict} />

      {/* Hero with video/image/carousel */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {project.vimeoId ? (
          // Vimeo embed
          <div className="absolute inset-0 w-full h-full">
            <iframe
              src={`https://player.vimeo.com/video/${project.vimeoId}?background=1&autoplay=1&loop=1&byline=0&title=0&muted=1`}
              className="absolute inset-0 w-full h-full"
              style={{ border: 0 }}
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
            />
            <div className="absolute inset-0 bg-black/40" />
          </div>
        ) : project.videos && project.videos.length > 0 ? (
          // Video Carousel
          <>
            <video
              ref={carouselVideoRef}
              key={currentVideoIndex}
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover opacity-60"
            >
              <source src={project.videos[currentVideoIndex]} type="video/mp4" />
            </video>

            {/* Navigation Buttons */}
            <button
              onClick={prevVideo}
              className="absolute left-8 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full transition-all z-10"
              aria-label="Previous video"
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              onClick={nextVideo}
              className="absolute right-8 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full transition-all z-10"
              aria-label="Next video"
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Indicators */}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-2 z-10">
              {project.videos.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentVideoIndex(index)}
                  className={`h-1 rounded-full transition-all ${
                    index === currentVideoIndex
                      ? 'w-8 bg-white'
                      : 'w-1 bg-white/30 hover:bg-white/50'
                  }`}
                  aria-label={`Go to video ${index + 1}`}
                />
              ))}
            </div>
          </>
        ) : project.video ? (
          // Single local video
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-60"
          >
            <source src={project.video} type="video/mp4" />
          </video>
        ) : project.images && project.images.length > 0 ? (
          // Image Carousel
          <>
            <img
              key={currentImageIndex}
              src={project.images[currentImageIndex]}
              alt={`${project.title} - Image ${currentImageIndex + 1}`}
              className="absolute inset-0 w-full h-full object-cover opacity-80"
            />

            {/* Navigation Buttons */}
            <button
              onClick={prevImage}
              className="absolute left-8 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full transition-all z-10"
              aria-label="Previous image"
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              onClick={nextImage}
              className="absolute right-8 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full transition-all z-10"
              aria-label="Next image"
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Indicators */}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-2 z-10">
              {project.images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`h-1 rounded-full transition-all ${
                    index === currentImageIndex
                      ? 'w-8 bg-white'
                      : 'w-1 bg-white/30 hover:bg-white/50'
                  }`}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>
          </>
        ) : (
          // Gradiente fallback
          <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient}`} />
        )}
      </section>

      {/* Project Info */}
      <section className="py-20 px-6 border-t border-gray-900">
        <div className="container mx-auto max-w-5xl">
          {/* Info Grid */}
          <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-12 mb-16">
            {project.client && (
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-gray-500 mb-2">{dict.projectPage.client}</p>
                <p className="text-lg">{project.client}</p>
              </div>
            )}

            {project.agency && (
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-gray-500 mb-2">{dict.projectPage.agency}</p>
                <p className="text-lg">{project.agency}</p>
              </div>
            )}

            {project.production && (
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-gray-500 mb-2">{dict.projectPage.production}</p>
                {project.production.toLowerCase().includes('mosh post') ? (
                  <img src="/logos/logo-mosh.svg" alt="Mosh Post" className="h-12 w-auto" />
                ) : (
                  <p className="text-lg">{project.production}</p>
                )}
              </div>
            )}

            {project.duration && (
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-gray-500 mb-2">{dict.projectPage.duration}</p>
                <p className="text-lg font-mono">{project.duration}</p>
              </div>
            )}

            {project.year && (
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-gray-500 mb-2">{dict.projectPage.year}</p>
                <p className="text-lg">{project.year}</p>
              </div>
            )}

            {project.vimeoId && (
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-gray-500 mb-2">Link</p>
                <a
                  href={`https://vimeo.com/${project.vimeoId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group"
                  title="Watch on Vimeo"
                >
                  <img
                    src="/icon/icon_go_lnx_6.svg"
                    alt="Go"
                    className="w-5 h-5 opacity-60 group-hover:opacity-100 transition-opacity"
                    style={{ filter: 'invert(1) brightness(2)' }}
                  />
                  <span className="text-lg group-hover:underline">Vimeo</span>
                </a>
              </div>
            )}
          </div>

          {(project.fullDescription_pt || project.fullDescription_en || project.fullDescription) && (
            <div className="mb-16">
              <h2 className="text-3xl font-bold mb-6">{dict.projectPage.aboutProject}</h2>
              <p className="text-xl text-gray-400 leading-relaxed">
                {locale === 'pt-BR'
                  ? (project.fullDescription_pt || project.fullDescription)
                  : (project.fullDescription_en || project.fullDescription)
                }
              </p>
            </div>
          )}

          {/* Before & After Section - Only for Bradesco */}
          {id === "bradesco-agro" && (
            <div className="mb-16">
              {/* Video Comparison Grid */}
              <div className="relative grid md:grid-cols-2 gap-8 mb-12">
                {/* Original Video */}
                <div className="bg-gray-900 border-2 border-gray-700 rounded-lg p-4 hover:border-gray-500 transition-all">
                  <h3 className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-4">Original</h3>
                  <div className="aspect-video bg-black rounded overflow-hidden">
                    <video
                      ref={videoOriginalRef}
                      className="w-full h-full object-cover"
                      loop
                    >
                      <source src="/videos/BRA_Original.mp4" type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                  <div className="mt-3 text-sm text-gray-400">
                    <span className="text-gray-500">Status:</span> Original Footage
                  </div>
                </div>

                {/* Replace Video */}
                <div className="bg-gray-900 border-2 border-gray-700 rounded-lg p-4 hover:border-gray-500 transition-all">
                  <h3 className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-4">After Replace</h3>
                  <div className="aspect-video bg-black rounded overflow-hidden">
                    <video
                      ref={videoReplaceRef}
                      className="w-full h-full object-cover"
                      loop
                    >
                      <source src="/videos/BRA_Replace_Outfit.mp4" type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                  <div className="mt-3 text-sm text-gray-400">
                    <span className="text-gray-500">Status:</span> AI Outfit Replace Applied
                  </div>
                </div>

                {/* Centered Play/Pause Button */}
                <button
                  onClick={togglePlayPause}
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 flex items-center justify-center bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full transition-all z-10 border-2 border-white/30 hover:border-white/50"
                  aria-label={isPlaying ? "Pause videos" : "Play videos"}
                >
                  {isPlaying ? (
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                    </svg>
                  ) : (
                    <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* Créditos */}
          {project.credits && project.credits.length > 0 && (
            <div>
              <h2 className="text-3xl font-bold mb-6">{dict.projectPage.credits}</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {project.credits.map((credit, index) => (
                  <div key={index}>
                    <p className="text-sm uppercase tracking-[0.3em] text-gray-500 mb-1">
                      {credit.role}
                    </p>
                    {credit.name.toLowerCase().includes('mosh post') ? (
                      <img src="/logos/logo-mosh.svg" alt="Mosh Post" className="h-12 w-auto" />
                    ) : (
                      <p className="text-lg">{credit.name}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Back to works */}
      <section className="py-20 px-6 border-t border-gray-900">
        <div className="container mx-auto text-center">
          <button
            onClick={goBackToProjects}
            className="inline-flex flex-col items-center gap-4 text-gray-400 hover:text-white transition-all duration-300 group cursor-pointer"
          >
            <img
              src="/icon/icon_back_lnx_5.svg"
              alt="Back"
              className="w-12 h-12 opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all"
              style={{ filter: 'invert(1) brightness(2)' }}
            />
            <span className="text-xs uppercase tracking-[0.3em] border-b border-gray-700 pb-1 group-hover:border-white group-hover:tracking-[0.4em] transition-all">
              {dict.projectPage.backToProjects}
            </span>
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-gray-900">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <img src="/logos/LNX_LOGO.png" alt="LNX" className="h-6 w-auto" />
            </div>
            <div className="text-gray-400 text-sm">
              {dict.footer.copyright}
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
