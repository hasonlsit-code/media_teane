import "../../App.css";
export default function ProductList() {
  return (
    <section className="product">
      <div className="product__head">
        <p className="product__kicker">Our products</p>
        <h2 className="product__title">Ceylon tea assortment</h2>
        <p className="product__desc">
          Integer quis tempor orci. Suspendisse potenti. Interdum et malesuada
          fames ac ante ipsum primis in faucibus.
        </p>
      </div>

      <div className="product__grid">
        <article className="product-card">
          <div className="product-card__imgWrap">
            <img
              className="product-card__img"
              src="/images/anh1.png"
              alt="Green Tea"
            />
            <div className="product-card__label">
              <h3>Green Tea</h3>
              <p>Nullam dictum molestie quam, non feugiat dui eleifend eget.</p>
            </div>
          </div>
        </article>

        <article className="product-card">
          <div className="product-card__imgWrap">
            <img
              className="product-card__img"
              src="/images/anh2.png"
              alt="Black Tea"
            />
            <div className="product-card__label">
              <h3>Black Tea</h3>
              <p>Nullam dictum molestie quam, non feugiat dui eleifend eget.</p>
            </div>
          </div>
        </article>

        <article className="product-card">
          <div className="product-card__imgWrap">
            <img
              className="product-card__img"
              src="/images/anh3.png"
              alt="Organic Tea"
            />
            <div className="product-card__label">
              <h3>Organic Tea</h3>
              <p>Nullam dictum molestie quam, non feugiat dui eleifend eget.</p>
            </div>
          </div>
        </article>
      </div>

      <div className="product__nav">
        <button className="navBtn navBtn--ghost" aria-label="Prev">
          ‹
        </button>
        <button className="navBtn" aria-label="Next">
          ›
        </button>
      </div>
    </section>
  );
}
