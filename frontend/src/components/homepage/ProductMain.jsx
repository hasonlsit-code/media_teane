import "../../App.css";

export default function ProductMain() {
  return (
    <section className="product-detail">
      <div className="product-detail__container">
        {/* LEFT: nội dung chi tiết */}
        <div className="product-detail__content">
          <h2 className="product-detail__title">
            Tea is one of the most popular <br />
            drinks in the world.
          </h2>

          <p className="product-detail__description">
            Tea has a complex positive effect on the body. Daily use <br />
            of a cup of tea is good for your health.
          </p>

          <div className="product-detail__features">
            <div className="product-detail__feature">
              <div className="product-detail__feature-icon">🧠</div>
              <div className="product-detail__feature-text">
                Improves brain function
              </div>
            </div>

            <div className="product-detail__feature">
              <div className="product-detail__feature-icon">🧪</div>
              <div className="product-detail__feature-text">
                Disinfects harmful substances
              </div>
            </div>

            <div className="product-detail__feature">
              <div className="product-detail__feature-icon">⚖️</div>
              <div className="product-detail__feature-text">
                Promotes weight loss
              </div>
            </div>

            <div className="product-detail__feature">
              <div className="product-detail__feature-icon">⏱️</div>
              <div className="product-detail__feature-text">Prolongs life</div>
            </div>
          </div>

          <button className="product-detail__button" type="button">
            View more <span className="product-detail__button-icon">›</span>
          </button>
        </div>

        {/* RIGHT: hình ảnh */}
        <div className="product-detail__media">
          <div className="product-detail__media-wrap">
            <img
              className="product-detail__image-main"
              src="/images/anh1.png"
              alt="Product main"
            />
            <img
              className="product-detail__image-sub"
              src="/images/anh2.png"
              alt="Product sub"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
