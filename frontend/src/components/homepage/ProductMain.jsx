import { Link } from "react-router-dom";
import "../../App.css";

export default function ProductMain() {
  return (
    <section className="product-detail">
      <div className="product-detail__container">
        {/* LEFT: nội dung chi tiết */}
        <div className="product-detail__content">
          <h2 className="product-detail__title">
            {/* Tea is one of the most popular <br />
            drinks in the world. */}
            MEDITEA – LÁ TRÀ GIÀ NGUYÊN BẢN
          </h2>

          <p className="product-detail__description">
            Không phải lá non hái sớm. MediTEA chọn lá trà 1–3 năm tuổi từ vùng
            cao – nơi sương gió và khí hậu khắc nghiệt giúp lá trà dày, đậm vị
            và tích tụ hương tự nhiên.
          </p>

          <div className="product-detail__features">
            <div className="product-detail__feature">
              <div className="product-detail__feature-icon">1</div>
              <div className="product-detail__feature-text">
                Thu hái lá già vùng cao
              </div>
            </div>

            <div className="product-detail__feature">
              <div className="product-detail__feature-icon">2</div>
              <div className="product-detail__feature-text">
                Sao sấy thủ công từng mẻ nhỏ
              </div>
            </div>

            <div className="product-detail__feature">
              <div className="product-detail__feature-icon">3</div>
              <div className="product-detail__feature-text">
                Vị trà nguyên bản – dậy hương tự nhiên
              </div>
            </div>

            <div className="product-detail__feature">
              <div className="product-detail__feature-icon">4</div>
              <div className="product-detail__feature-text">
                Khám phá hành trình làm trà
              </div>
            </div>
          </div>
          <div style={{ display: "flex", gap: "15px", marginTop: "60px" }}>
            <Link to="/story-3">
              <button className="product-detail__button" type="button">
                Khám phá hành trình làm trà{" "}
                <span className="product-detail__button-icon">›</span>
              </button>
            </Link>
            <button className="product-detail__button" type="button">
              Trải nghiệm xưởng trà 360°{" "}
              <span className="product-detail__button-icon">›</span>
            </button>
          </div>
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
