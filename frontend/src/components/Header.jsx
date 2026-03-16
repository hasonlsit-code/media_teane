import "../App.css";
import { Link, useNavigate } from "react-router-dom";
import { UserOutlined, LogoutOutlined, EditOutlined } from "@ant-design/icons";
import { useState, useEffect, useRef } from "react";
import { requestLogout } from "../config/UserRequest";

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const loadUserFromStorage = () => {
    try {
      const stored = localStorage.getItem("user");
      if (stored) {
        setUser(JSON.parse(stored));
      } else {
        setUser(null);
      }
    } catch (e) {
      setUser(null);
    }
  };

  // Detect scroll to trigger compact header
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Load user when mount
  useEffect(() => {
    loadUserFromStorage();
  }, []);

  // Listen when login/logout happens
  useEffect(() => {
    const handleUserChanged = () => {
      loadUserFromStorage();
    };

    window.addEventListener("userChanged", handleUserChanged);
    return () => window.removeEventListener("userChanged", handleUserChanged);
  }, []);

  // Click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await requestLogout();
    } catch (error) {
      console.log("Logout API failed", error);
    }

    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");

    setUser(null);
    setDropdownOpen(false);
    window.dispatchEvent(new Event("userChanged"));
    navigate("/");
  };

  const handleEditProfile = () => {
    setDropdownOpen(false);
    navigate("/edit-profile");
  };

  return (
    <header className={`hero__header ${scrolled ? "header--scrolled" : ""}`}>
      <Link to="/" className="header__brand">
        <div className="header__brand-icon">🍵</div>
        <span className="header__brand-name">Medi-Tea</span>
      </Link>

      <nav className="header__nav">
        <Link className="nav__link active" to="/">
          Trang chủ
        </Link>
        <Link className="nav__link" to="/about">
          MediTea
        </Link>
        <Link className="nav__link" to="/shop">
          Sản phẩm
        </Link>
        <a className="nav__link" href="#">
          Bài Viết
        </a>
        <div className="nav__dropdown">
          <a
            className="nav__link"
            href="https://console.cloudinary.com/app/c-6d980ff239f94f854959a0da1715cf/assets/media_library/folders/ce53228d4b0935aa324ff853a756d21e03?view_mode=mosaic"
            target="_blank"
            rel="noopener noreferrer"
          >
            Thư viện ảnh
          </a>
          <span className="nav__caret">›</span>
        </div>
        <a className="nav__link" href="#">
          Kết Nối
        </a>
        <div className="nav__dropdown">
          <a
            className="nav__link"
            href="https://www.facebook.com/medihomeretreat"
            target="_blank"
            rel="noopener noreferrer"
          >
            Fanpage
          </a>
          <span className="nav__caret">›</span>
        </div>
      </nav>

      <div className="header__actions">
        {/* <button className="iconBtn" aria-label="Search">
          <svg viewBox="0 0 24 24" className="icon">
            <path d="M10 4a6 6 0 104.24 10.24l4.26 4.26 1.42-1.42-4.26-4.26A6 6 0 0010 4zm0 2a4 4 0 110 8 4 4 0 010-8z" />
          </svg>
        </button> */}

        {user ? (
          <div className="header__user-menu" ref={dropdownRef}>
            <div
              className="header__user-info"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <div className="header__user-avatar">
                <UserOutlined />
              </div>
              <span className="header__user-name">
                {user.fullName || user.name || user.email || "User"}
              </span>
              <span
                className={`header__user-caret ${
                  dropdownOpen ? "header__user-caret--open" : ""
                }`}
              >
                ▾
              </span>
            </div>

            {dropdownOpen && (
              <div className="header__dropdown">
                <button
                  className="header__dropdown-item"
                  onClick={handleEditProfile}
                >
                  <EditOutlined className="header__dropdown-icon" />
                  <span>Thay đổi thông tin</span>
                </button>
                <div className="header__dropdown-divider" />
                <button
                  className="header__dropdown-item header__dropdown-item--danger"
                  onClick={handleLogout}
                >
                  <LogoutOutlined className="header__dropdown-icon" />
                  <span>Đăng xuất</span>
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link className="login" to="/login">
            <svg viewBox="0 0 24 24" className="icon icon--user">
              <path d="M12 12a4 4 0 10-4-4 4 4 0 004 4zm0 2c-4.4 0-8 2.2-8 5v1h16v-1c0-2.8-3.6-5-8-5z" />
            </svg>
            Login
          </Link>
        )}

        {/* <button className="iconBtn iconBtn--cart" aria-label="Cart">
          <span className="badge">0</span>
          <svg viewBox="0 0 24 24" className="icon">
            <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-1.99.9-1.99 2S15.9 22 17 22s2-.9 2-2-.9-2-2-2zM6.2 6l.6 3h12.7l-1.2 6H7.4l-.3-1.5H5.1L4 3H2V1h3.6l.6 3h13.9v2H6.2z" />
          </svg>
        </button> */}
      </div>
    </header>
  );
}

export default Header;
