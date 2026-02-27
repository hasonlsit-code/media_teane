import React from "react";
import "./original.css";

// ✅ đổi ảnh theo của bạn
const imgs = {
  hero: "/images/anh1.png",
  taste: "/images/anh1.png",
  caffeine: "/images/anh1.png",
  value: "/images/anh1.png",
  journey: "/images/anh1.png",
};

const sections = [
  {
    no: "01",
    title: "Hương vị đặc trưng của trà lá già",
    img: imgs.taste,
    desc: "Trà Bancha mang hương thơm trầm, thoảng mùi gỗ và vỏ cây trong lần pha đầu tiên. Khi tiếp tục hãm thêm nhiều lần, vị trà lắng lại và trở nên dịu hơn, để lại hậu ngọt nhẹ nhưng bền. Nhờ được làm từ lá già, trà có cấu trúc vị rõ ràng và không quá sắc. Đây là loại trà không gây ấn tượng bằng sự bùng nổ ban đầu, mà bằng cảm giác êm và sâu khi uống chậm.",
  },
  {
    no: "02",
    title: "Hàm lượng caffeine thấp – phù hợp uống hằng ngày",
    img: imgs.caffeine,
    desc: "Lá trà già tự nhiên chứa ít caffeine hơn lá non do cơ chế bảo vệ của cây trà tập trung nhiều caffeine ở phần búp và lá trẻ. Nhờ đó, trà Bancha thường dịu hơn, ít gây cảm giác kích thích mạnh. MediTEA vì thế phù hợp để uống mỗi ngày, kể cả vào buổi chiều, với những người nhạy cảm với caffeine.",
  },
  {
    no: "03",
    title: "Giá trị tự nhiên của trà",
    img: imgs.value,
    desc: "Giống như các dòng trà xanh truyền thống, trà Bancha vẫn giữ được các hợp chất chống oxy hóa tự nhiên có trong lá trà. Khi được chế biến đúng cách, những hợp chất này góp phần tạo nên vị chát dịu và cảm giác tỉnh táo nhẹ nhàng sau khi uống. MediTEA xem đó là một thức uống hỗ trợ lối sống cân bằng và điều độ.",
  },
];

const Original = () => {
  return (
    <main className="ori">
      {/* HERO */}
      <section className="ori__hero">
        <div className="ori__heroOverlay" />
        <div className="ori__container ori__heroGrid">
          <div className="ori__heroText">
            <p className="ori__kicker">MEDITEA</p>
            <h1 className="ori__title">Trà lá già Bancha nguyên bản</h1>
            <p className="ori__lead">
              MediTEA thuộc nhóm trà Bancha – dòng trà được chế biến từ những lá
              trà đủ năm, thường ở vụ thu hoạch thứ hai hoặc thứ ba trong năm.
              Những lá này có kích thước lớn, dày và mang màu nâu sậm khi đã qua
              chế biến. Khác với trà làm từ búp non, Bancha khai thác phần lá
              trưởng thành của cây, nơi cấu trúc đã ổn định và hương vị trở nên
              sâu hơn theo thời gian.
            </p>

            <div className="ori__chips">
              <span>Hương trầm – hậu ngọt bền</span>
              <span>Caffeine thấp</span>
              <span>Thủ công theo mẻ nhỏ</span>
            </div>
          </div>

          <div className="ori__heroMedia">
            <img
              className="ori__heroImg"
              src={imgs.hero}
              alt="MediTEA Bancha"
            />
          </div>
        </div>
      </section>

      {/* 3 BLOCKS (so le) */}
      <section className="ori__section">
        <div className="ori__container">
          {sections.map((s, idx) => {
            const reverse = (idx + 1) % 2 === 0;
            return (
              <article
                key={s.no}
                className={`ori__block ${reverse ? "ori__block--reverse" : ""}`}
              >
                <div className="ori__media">
                  <img className="ori__img" src={s.img} alt={s.title} />
                </div>

                <div className="ori__text">
                  <div className="ori__head">
                    <div className="ori__no">{s.no}</div>
                    <h2 className="ori__h2">{s.title}</h2>
                  </div>
                  <p className="ori__desc">{s.desc}</p>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* JOURNEY (dài) */}
      <section className="ori__journey">
        <div className="ori__container ori__journeyGrid">
          <div className="ori__journeyMedia">
            <img
              className="ori__journeyImg"
              src={imgs.journey}
              alt="Hành trình làm trà"
            />
          </div>

          <div className="ori__journeyText">
            <p className="ori__kickerDark">MEDITEA</p>
            <h2 className="ori__journeyTitle">Hành trình làm trà</h2>

            <p className="ori__journeyDesc">
              Quy trình của MediTEA bắt đầu từ việc hái lá già trên cây trà Shan
              Tuyết cổ thụ, tối thiểu từ 3 năm trở lên.Sau khi thu hái, lá được
              tuyển chọn kỹ, loại bỏ những phần sâu hoặc hư hỏng, rồi phơi trong
              bóng râm để lá héo tự nhiên mà vẫn giữ được cấu trúc nguyên vẹn.
              Khi đạt độ héo phù hợp, lá tiếp tục được đưa vào lô sao trà, nơi
              nhiệt độ và thời gian được kiểm soát cẩn trọng để làm dậy hương và
              ổn định hương vị đặc trưng của trà lá già. Vì được làm thủ công
              theo từng mẻ, hương vị có thể thay đổi rất nhẹ giữa các lần sao.
              Sự khác biệt ấy không phải là sai lệch, mà là dấu ấn tự nhiên của
              quá trình thủ công. Tuy vậy, MediTEA vẫn đảm bảo sự ổn định về
              hương thơm và cấu trúc vị đặc trưng – đậm, rõ và hậu ngọt bền.
              Không gian làm trà đặt giữa môi trường nhiều cây xanh ở vùng ngoại
              ô, nơi thiên nhiên không chỉ là khung cảnh mà là một phần của quá
              trình. Bạn có thể trải nghiệm toàn bộ hành trình này thông qua VR
              tour 360°, từ khâu chọn lá đến khi trà hoàn thiện – để hiểu rõ hơn
              điều tạo nên một chén MediTEA.
            </p>

            {/* ✅ CTA: bạn đổi href sang link VR của bạn */}
            <a className="ori__cta" href="/vr" rel="noreferrer">
              Trải nghiệm VR 360°
            </a>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Original;
