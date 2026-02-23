import { useEffect } from "react";
import { initHeroBg } from "../../config/animation";
import "../../App.css";

function Slide() {
  useEffect(() => {
    const cleanup = initHeroBg({
      images: ["/images/anh2.png", "/images/anh1.png", "/images/anh3.png"],
      holdMs: 2000,
      fadeMs: 1200,
    });
    return cleanup;
  }, []);

  return (
    <section className="hero">
      {/* Background image + overlay */}
      <div className="hero__bgLayer hero__bgA is-active" />
      <div className="hero__bgLayer hero__bgB" />
      <div className="hero__overlay" />

      {/* Left social */}
      <aside className="hero__left">
        <div className="social">
          <a href="#" aria-label="Twitter">
            t
          </a>
          <a href="#" aria-label="Facebook">
            f
          </a>
          <a href="#" aria-label="Instagram">
            i
          </a>
          <a href="#" aria-label="Google+">
            g+
          </a>
        </div>
        <div className="follow">
          <span className="follow__line" />
          <span className="follow__text">Follow us</span>
        </div>
      </aside>
      <aside className="hero__right">
        <button className="dot dot--ring" data-slide="0" aria-label="Slide 1" />
        <button className="dot" data-slide="1" aria-label="Slide 2" />
        <button className="dot" data-slide="2" aria-label="Slide 3" />
      </aside>

      <div className="hero__content">
        <h1 className="hero__title">
          Quality tea production
          <span className="hero__accent">Tea</span>
        </h1>

        <p className="hero__desc">The tea is</p>

        <button className="hero__cta">
          Read more <span className="hero__ctaIcon">›</span>
        </button>
      </div>
    </section>
  );
}
export default Slide;
