import React, { useState } from "react";
import "../../App.css";

export default function Certificate() {
  const [isCertOpen, setIsCertOpen] = useState(false);

  return (
    <>
      <section className="commitment" id="certificate-section">
        <div className="commitment__inner">
          <div className="commitment__text scroll-reveal">
            <h2 className="commitment__heading">CAM KẾT CHẤT LƯỢNG</h2>
            <p className="commitment__desc">
              MediTEA tự hào đạt các chứng nhận uy tín về chất lượng sản phẩm và
              quy trình sản xuất. Mỗi lá trà đều kể câu chuyện về sự tận tâm và
              trách nhiệm với thiên nhiên.
            </p>
            <div className="commitment__badges">
              <div
                className="commitment__badge scroll-reveal"
                style={{ transitionDelay: "0.1s" }}
              >
                <div className="commitment__badge-icon">✓</div>
                <div>
                  <h4>An toàn Thực phẩm</h4>
                  <p>Đạt tiêu chuẩn vệ sinh an toàn thực phẩm quốc gia</p>
                </div>
              </div>
              <div
                className="commitment__badge scroll-reveal"
                style={{ transitionDelay: "0.2s" }}
              >
                <div className="commitment__badge-icon">✓</div>
                <div>
                  <h4>Chứng nhận Hữu cơ</h4>
                  <p>Sản phẩm đạt tiêu chuẩn hữu cơ quốc tế</p>
                </div>
              </div>
              <div
                className="commitment__badge scroll-reveal"
                style={{ transitionDelay: "0.3s" }}
              >
                <div className="commitment__badge-icon">✓</div>
                <div>
                  <h4>Nguồn gốc Minh bạch</h4>
                  <p>Truy xuất rõ ràng từ vùng trồng đến tay người dùng</p>
                </div>
              </div>
            </div>
            <button 
              className="commitment__link"
              onClick={() => setIsCertOpen(true)}
              style={{ 
                backgroundColor: '#957159', 
                color: '#fff', 
                border: 'none', 
                cursor: 'pointer', 
                padding: '12px 32px', 
                borderRadius: '30px', 
                fontWeight: 'bold',
                marginTop: '16px',
                fontFamily: 'inherit',
                display: 'inline-block'
              }}
            >
              XEM CHỨNG NHẬN
            </button>
          </div>
          <div
            className="commitment__img scroll-reveal-right"
            style={{ transitionDelay: "0.3s" }}
          >
            <img src="/images/chungchi1.png" alt="Quality commitment" />
          </div>
        </div>
      </section>

      {/* Certificate Lightbox Modal */}
      {isCertOpen && (
        <div 
          style={{
            position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.85)',
            zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px'
          }}
          onClick={() => setIsCertOpen(false)}
        >
          <div 
            style={{ position: 'relative', maxWidth: '90vw', maxHeight: '90vh' }}
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setIsCertOpen(false)}
              style={{
                position: 'absolute', top: '-40px', right: '0', background: 'none', border: 'none',
                color: '#fff', fontSize: '36px', cursor: 'pointer', lineHeight: '1', padding: '0'
              }}
            >
              &times;
            </button>
            <img 
              src="/images/chungchi1.png" 
              alt="Chứng nhận" 
              style={{ maxWidth: '100%', maxHeight: '90vh', objectFit: 'contain', borderRadius: '4px' }}
            />
          </div>
        </div>
      )}
    </>
  );
}
