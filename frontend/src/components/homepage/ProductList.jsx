import "../../App.css";
export default function ProductList() {
  return (
    <section className="product">
      <div className="product__head">
        <p className="product__kicker">MEDITEA – LÁ TRÀ GIÀ NGUYÊN BẢN</p>
        <h2 className="product__title"></h2>
        <p className="product__desc">
          Không phải lá non hái sớm. MediTEA chọn lá trà 1–3 năm tuổi từ vùng
          cao – nơi sương gió và khí hậu khắc nghiệt giúp lá trà dày, đậm vị và
          tích tụ hương tự nhiên.
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
              <h3>Trà lá già cổ thụ Shan Tuyết vùng cao</h3>
              <p>
                Thu hái từ cây trà cổ thụ lâu năm trên núi cao. Vị đậm, hậu sâu,
                hương thơm rõ tầng và bền lâu.
              </p>
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
              <h3>Trà lá già từ đồi trà địa phương</h3>
              <p>
                Chọn lọc từ những đồi trà quen thuộc, đủ năm và đủ chuẩn. Cân
                bằng, dễ tiếp cận, phù hợp uống hằng ngày.
              </p>
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
              <h3>Bột trà MediTEA</h3>
              <p>
                Xay mịn từ trà lá già nguyên bản. Giữ trọn hương vị tự nhiên,
                tiện lợi cho pha uống và ứng dụng ẩm thực.
              </p>
            </div>
          </div>
        </article>
      </div>

      <div className="product__nav">
        {/* <button className="navBtn navBtn--ghost" aria-label="Prev">
          ‹
        </button>
        <button className="navBtn" aria-label="Next">
          ›
        </button> */}
      </div>
    </section>
  );
}
