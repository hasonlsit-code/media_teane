import "../App.css";
import { Link } from "react-router-dom";
import { CompassOutlined } from "@ant-design/icons";
function Header() {
  return (
    <header className="hero__header">
      <div className="hero__logo">
        <CompassOutlined />
      </div>
      <nav className="hero__nav">
        <Link className="nav__link active" to="/">
          Home
        </Link>
        <a className="nav__link" href="#">
          About us
        </a>
        <a className="nav__link" href="#">
          Products
        </a>
        <a className="nav__link" href="#">
          Blog
        </a>
        <a className="nav__link" href="#">
          Gallery
        </a>
        <a className="nav__link" href="#">
          Contacts
        </a>
        <div className="nav__dropdown">
          <a className="nav__link" href="#">
            Pages
          </a>
          <span className="nav__caret">›</span>
        </div>
      </nav>

      <div className="hero__actions">
        <button className="iconBtn" aria-label="Search">
          <svg viewBox="0 0 24 24" className="icon">
            <path d="M10 4a6 6 0 104.24 10.24l4.26 4.26 1.42-1.42-4.26-4.26A6 6 0 0010 4zm0 2a4 4 0 110 8 4 4 0 010-8z" />
          </svg>
        </button>

        <button className="iconBtn iconBtn--cart" aria-label="Cart">
          <span className="badge">0</span>
          <svg viewBox="0 0 24 24" className="icon">
            <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-1.99.9-1.99 2S15.9 22 17 22s2-.9 2-2-.9-2-2-2zM6.2 6l.6 3h12.7l-1.2 6H7.4l-.3-1.5H5.1L4 3H2V1h3.6l.6 3h13.9v2H6.2z" />
          </svg>
        </button>

        <Link className="login" to="/login">
          {" "}
          {/* 2. Thay <a> bằng <Link> và href bằng to */}
          <svg viewBox="0 0 24 24" className="icon icon--user">
            <path d="M12 12a4 4 0 10-4-4 4 4 0 004 4zm0 2c-4.4 0-8 2.2-8 5v1h16v-1c0-2.8-3.6-5-8-5z" />
          </svg>
          Login
        </Link>
      </div>
    </header>
  );
}
export default Header;
