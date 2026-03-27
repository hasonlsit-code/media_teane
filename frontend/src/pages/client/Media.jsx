import React, { useState, useEffect } from "react";
import "./media.css";

const TABS = [
  "Tất Cả",
  "Sản phẩm",
  "Vùng trà",
  "Xưởng trà",
  "Quy trình",
  "Khoảnh khắc"
];

// Dynamically generate image data array
const IMAGES = [
  // Sản phẩm: Prv1 - Prv6
  ...Array.from({ length: 6 }, (_, i) => ({ id: `prv${i+1}`, src: `/images/Prv${i+1}.png`, category: "Sản phẩm" })),
  // Vùng trà: Vt1 - Vt6
  ...Array.from({ length: 6 }, (_, i) => ({ id: `vt${i+1}`, src: `/images/Vt${i+1}.png`, category: "Vùng trà" })),
  // Xưởng trà: Xt1 - Xt3
  ...Array.from({ length: 3 }, (_, i) => ({ id: `xt${i+1}`, src: `/images/Xt${i+1}.png`, category: "Xưởng trà" })),
  // Quy trình: Qt1 - Qt5
  ...Array.from({ length: 5 }, (_, i) => ({ id: `qt${i+1}`, src: `/images/Qt${i+1}.png`, category: "Quy trình" })),
  // Khoảnh khắc: Kk1 - Kk4
  ...Array.from({ length: 4 }, (_, i) => ({ id: `kk${i+1}`, src: `/images/Kk${i+1}.png`, category: "Khoảnh khắc" }))
];

const Media = () => {
  const [activeTab, setActiveTab] = useState("Tất Cả");
  const [selectedImage, setSelectedImage] = useState(null);

  const filteredImages = activeTab === "Tất Cả" 
    ? IMAGES 
    : IMAGES.filter(img => img.category === activeTab);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
        }
      });
    }, observerOptions);

    const elements = document.querySelectorAll(".scroll-reveal");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [activeTab]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!selectedImage) return;
      if (e.key === "Escape") setSelectedImage(null);
      if (e.key === "ArrowRight") handleNext(e);
      if (e.key === "ArrowLeft") handlePrev(e);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImage, filteredImages]);

  const curIdx = selectedImage ? filteredImages.findIndex(img => img.id === selectedImage.id) : -1;

  const handleNext = (e) => {
    if (e) e.stopPropagation();
    if (curIdx < filteredImages.length - 1) setSelectedImage(filteredImages[curIdx + 1]);
    else setSelectedImage(filteredImages[0]);
  };

  const handlePrev = (e) => {
    if (e) e.stopPropagation();
    if (curIdx > 0) setSelectedImage(filteredImages[curIdx - 1]);
    else setSelectedImage(filteredImages[filteredImages.length - 1]);
  };

  return (
    <main className="media-page">
      {/* HERO SECTION */}
      <section className="media__hero">
        <div className="media__overlay" />
        <div className="media__hero-inner scroll-reveal">
          <h1 className="media__title">Tư liệu truyền thông</h1>
          <p className="media__desc">
            Chào mừng bạn đến với Tư liệu Truyền thông của MediTEA. Tại đây, bạn có thể tìm thấy các hình ảnh, ấn phẩm và video về MediTEA.
          </p>
        </div>
      </section>

      {/* GALLERY SECTION */}
      <section className="media__gallery-section">
        <div className="media__container">
          
          <div className="media__gallery-header scroll-reveal">
            <h2 className="media__gallery-title">Ảnh</h2>
          </div>

          <div className="media__tabs scroll-reveal">
            {TABS.map((tab, idx) => (
              <React.Fragment key={tab}>
                <button 
                  className={`media__tab-btn ${activeTab === tab ? "active" : ""}`}
                  onClick={() => {
                    setActiveTab(tab);
                    setSelectedImage(null); // Close modal when changing tab
                  }}
                >
                  {tab}
                </button>
                {idx < TABS.length - 1 && <span className="media__tab-divider">|</span>}
              </React.Fragment>
            ))}
          </div>

          <div className="media__grid">
            {filteredImages.map((img, index) => (
              <div 
                key={`${img.id}-${index}`} 
                className="media__grid-item scroll-reveal"
                style={{ transitionDelay: `${index * 0.1}s` }}
                onClick={() => setSelectedImage(img)}
              >
                <div className="media__img-wrapper">
                  <img src={img.src} alt={img.category} className="media__img" />
                  <div className="media__img-overlay-hover">
                    <span className="media__img-category">{img.category}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* LIGHTBOX MODAL */}
      {selectedImage && (
        <div className="media__lightbox" onClick={() => setSelectedImage(null)}>
          <button className="media__lightbox-arrow media__lightbox-arrow--prev" onClick={handlePrev}>
            ‹
          </button>
          <div className="media__lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button 
              className="media__lightbox-close" 
              onClick={() => setSelectedImage(null)}
              aria-label="Đóng"
            >
              &times;
            </button>
            <img src={selectedImage.src} alt={selectedImage.category} className="media__lightbox-img" />
          </div>
          <button className="media__lightbox-arrow media__lightbox-arrow--next" onClick={handleNext}>
            ›
          </button>
        </div>
      )}
    </main>
  );
};

export default Media;
