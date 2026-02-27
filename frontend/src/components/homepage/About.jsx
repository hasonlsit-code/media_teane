import { Link } from "react-router-dom";
import "../../App.css";
const FEATURES = [
  {
    title: "1. Lá trà đủ tuổi",
    desc: "Chọn lá trà đủ năm để vị đậm và hậu sâu tự nhiên.",
  },
  {
    title: "2. Chế biến thủ công",
    desc: "Sao sấy thủ công, tôn trọng nhịp điệu của từng mẻ trà.",
  },
  {
    title: "3. Giữ vị nguyên bản",
    desc: "Không hương liệu. Không phụ gia. Không che lấp bản tính của lá.",
  },
  {
    title: "4. Trung thực nguồn gốc",
    desc: "Rõ vùng trồng, rõ cách làm, rõ tiêu chuẩn.",
  },
  {
    title: "5. Gắn bó thiên nhiên",
    desc: "Làm trà giữa môi trường núi rừng, nơi khí hậu và thời gian định hình hương vị.",
  },
  {
    title: "6. Bền vững dài hạn",
    desc: "Theo đuổi chất lượng ổn định, không đánh đổi vì số lượng.",
  },
];

function FeatureIcon({ type = "badge" }) {
  // SVG đơn giản (clone style icon line trong vòng tròn)
  const icons = {
    badge: (
      <path d="M12 3l2.2 1.2 2.5-.3 1.2 2.2 2.2 1.2-.3 2.5 1.2 2.2-2.2 1.2-1.2 2.2-2.5-.3L12 21l-2.2-1.2-2.5.3-1.2-2.2L3.9 15l.3-2.5L3 10.3 5.2 9 6.4 6.8l2.5.3L12 3z" />
    ),
    kettle: <path d="M7 10h8v6H7v-6zm2-6h4l2 3H7l2-3zM9 16v3m6-3v3" />,
    leaf: <path d="M6 17c7 0 12-5 12-12-7 0-12 5-12 12zm0 0c0-4 3-7 7-7" />,
    tin: <path d="M8 7h8v14H8V7zm0 4h8M10 7V5h4v2" />,
    wheat: (
      <path d="M12 3v18m-4-4c2-1 4-3 4-6-2 1-4 3-4 6zm8 0c-2-1-4-3-4-6 2 1 4 3 4 6z" />
    ),
    flask: (
      <path d="M10 3h4m-1 0v5l4 7a3 3 0 0 1-2.6 4.5H9.6A3 3 0 0 1 7 15l4-7V3" />
    ),
  };

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="ps__icon-svg">
      <g
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {icons[type] || icons.badge}
      </g>
    </svg>
  );
}

export default function About() {
  return (
    <section className="ps">
      <div className="ps__inner">
        <p className="ps__kicker">TRIẾT LÝ MEDITEA</p>
        <h2 className="ps__title"></h2>
        <p className="ps__desc">
          Chúng tôi tin rằng giá trị của trà không nằm ở việc làm khác đi, mà ở
          việc để lá đủ năm trên cây, quá trình chế biến đủ chậm và hương vị đủ
          thật khi đến tay người dùng.
        </p>

        <div className="ps__features" role="list">
          {FEATURES.map((f, idx) => (
            <div className="ps__feature" role="listitem" key={f.title}>
              <div className="ps__badge">
                <FeatureIcon
                  type={
                    ["badge", "kettle", "leaf", "tin", "wheat", "flask"][idx] ||
                    "badge"
                  }
                />
              </div>

              {/* đường nối chấm giữa các icon */}
              {idx !== FEATURES.length - 1 && (
                <span className="ps__dotted" aria-hidden="true" />
              )}

              <h3 className="ps__feature-title">{f.title}</h3>
              <p className="ps__feature-desc">
                {f.desc.split("\n").map((line, i) => (
                  <span key={i}>
                    {line}
                    <br />
                  </span>
                ))}
              </p>
            </div>
          ))}
        </div>

        <Link to="story-2">
          Tìm hiểu chi tiết <span className="ps__btn-dot" aria-hidden="true" />
        </Link>
      </div>

      {/* Try your colors panel */}
    </section>
  );
}
