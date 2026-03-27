import { useEffect, useState, useRef } from "react";
import "../../App.css";
import PanoramaViewer from "./PanoramaViewer";

function Slide() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [showPanorama, setShowPanorama] = useState(false);
  const videoRef = useRef(null);

  // Toggle play/pause state
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <section className="hero hero--video">
      {/* ── Background Video ── */}
      <video
        ref={videoRef}
        className="hero__video-bg"
        autoPlay
        loop
        muted={isMuted}
        playsInline
        onEnded={(e) => {
          e.target.currentTime = 0;
          e.target.play();
        }}
        // DUMMY VIDEO PATH: Vui lòng thay bằng đường dẫn video thực tế của bạn (ví dụ: /videos/intro.mp4)
        src="/images/video.mp4"
      />

      {/* Light gradient overlay to ensure text readability */}
      <div className="hero__video-overlay" />

      {/* Audio Toggle Button at middle left */}
      <button
        className="hero__audio-toggle"
        onClick={() => setIsMuted(!isMuted)}
        aria-label={isMuted ? "Bật âm thanh" : "Tắt âm thanh"}
        style={{
          position: "absolute",
          top: "50%",
          transform: "translateY(-50%)",
          left: "20px",
          background: "rgba(0, 0, 0, 0.4)",
          border: "1px solid rgba(255,255,255,0.3)",
          borderRadius: "50%",
          color: "white",
          width: "44px",
          height: "44px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          zIndex: 10,
          fontSize: "20px"
        }}
      >
        {isMuted ? "🔇" : "🔊"}
      </button>

      {/* ── Center Content ── */}
      <div className="hero__content-center">
        {/* Brand Logo */}
        <div className="hero__brand-logo">
          <h1 className="hero__logo-text">MediTEA</h1>
        </div>

        {/* Subtitle */}
        <h2 className="hero__subtitle">Lắng nghe hồn trà Việt</h2>

        {/* Play / Pause Toggle Button */}
        <button
          className="hero__play-toggle"
          onClick={togglePlay}
          aria-label={isPlaying ? "Tạm dừng" : "Phát video"}
        >
          {isPlaying ? (
            <span className="hero__icon-pause">||</span>
          ) : (
            <span className="hero__icon-play">▶</span>
          )}
        </button>

        {/* 360° Explore Button */}
        <button
          className="hero__explore-btn"
          onClick={() => setShowPanorama(true)}
          aria-label="Khám phá không gian đồi trà 360°"
        >
          <span className="hero__explore-icon">🌿</span>
          Khám phá không gian đồi trà
          <span className="hero__explore-arrow">→</span>
        </button>
      </div>

      {/* ── 360° Panorama Modal ── */}
      {showPanorama && (
        <PanoramaViewer onClose={() => setShowPanorama(false)} />
      )}
    </section>
  );
}

export default Slide;
