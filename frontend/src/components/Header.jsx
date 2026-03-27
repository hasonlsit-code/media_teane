import "../App.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { UserOutlined, LogoutOutlined, EditOutlined } from "@ant-design/icons";
import { useState, useEffect, useRef } from "react";
import { requestLogout } from "../config/UserRequest";
import { requestGetCart } from "../config/CartRequest";

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Helper function to check if link is active
  const isActive = (path) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  // Fetch cart count when user exists
  const fetchCartCount = async () => {
    try {
      const res = await requestGetCart();
      const items = res?.metadata?.cart?.products || [];
      const total = items.reduce((sum, item) => sum + (item.quantity || 1), 0);
      setCartCount(total);
    } catch (error) {
      console.log("Failed to fetch cart:", error);
      setCartCount(0);
    }
  };

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

  // Detect scroll to trigger full header visibility
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fetch cart count when user logs in or cart updates
  useEffect(() => {
    if (user) {
      fetchCartCount();
    } else {
      setCartCount(0);
    }
  }, [user]);

  // Listen for cart updates
  useEffect(() => {
    const handleCartChanged = () => {
      if (user) {
        fetchCartCount();
      }
    };

    window.addEventListener("cartChanged", handleCartChanged);
    return () => window.removeEventListener("cartChanged", handleCartChanged);
  }, [user]);
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
    setCartCount(0);
    window.dispatchEvent(new Event("userChanged"));
    navigate("/");
  };

  const handleEditProfile = () => {
    setDropdownOpen(false);
    navigate("/edit-profile");
  };

  // Hide header on shop, product detail, and cart pages
  const hideHeaderPages = ["/shop", "/product", "/cart"];
  const shouldHideHeader = hideHeaderPages.some(page => 
    location.pathname === page || location.pathname.startsWith(page + "/")
  );

  if (shouldHideHeader) {
    return null;
  }

  const isHomePage = location.pathname === "/";
  const isScrolled = scrolled || !isHomePage;

  const navLinkStyle = {
    color: isScrolled ? '#6b5b4f' : '#ebd9b4',
    textTransform: 'uppercase',
    fontWeight: '700',
    fontFamily: '"Montserrat", "Inter", sans-serif',
    letterSpacing: '0.8px',
    fontSize: '12px',
    transition: 'all 0.4s ease-in-out',
    textDecoration: 'none',
    whiteSpace: 'nowrap'
  };

  return (
    <header 
      className={isScrolled ? "header--scrolled" : ""}
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0, zIndex: 9999,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: isScrolled ? '12px 32px 12px 64px' : '20px 32px 20px 64px',
        transition: 'all 0.4s ease-in-out',
        background: isScrolled ? '#ffffff' : 'transparent',
        boxShadow: isScrolled ? '0 1px 4px rgba(0,0,0,0.1), 0 0 1px rgba(0,0,0,0.1)' : 'none',
        borderBottom: isScrolled ? '1px solid rgba(0,0,0,0.05)' : 'none'
      }}
    >
      {/* Left Nav */}
      <nav 
        className="header__nav header__nav--left"
        style={{ 
          display: 'flex', gap: '24px', flex: 1, justifyContent: 'flex-start', padding: 0, border: 'none', alignItems: 'center',
          opacity: isScrolled ? 1 : 0, 
          visibility: isScrolled ? 'visible' : 'hidden', 
          transition: 'all 0.4s ease-in-out'
        }}
      >
        <Link className={`nav__link ${isActive("/") ? "active" : ""}`} to="/" style={navLinkStyle}>Trang chủ</Link>
        <Link className={`nav__link ${isActive("/about") ? "active" : ""}`} to="/about" style={navLinkStyle}>Về MediTea</Link>
        <Link className={`nav__link ${isActive("/story-2") ? "active" : ""}`} to="/story-2" style={navLinkStyle}>Triết lý</Link>
        <Link className={`nav__link ${isActive("/bancha-detail") ? "active" : ""}`} to="/bancha-detail" style={navLinkStyle}>Kiến thức</Link>
      </nav>

      {/* Center Logo */}
      <Link 
        to="/" 
        className="header__brand"
        style={{ 
          position: 'absolute', left: '50%', transform: 'translate(-50%, 0)', // Absolute centering
          display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 0,
          opacity: isScrolled ? 1 : 0, 
          visibility: isScrolled ? 'visible' : 'hidden', 
          transition: 'all 0.4s ease-in-out'
        }}
      >
        <img 
          src="/images/logo.png.png" 
          alt="Medi-Tea Logo" 
          style={{ 
            height: isScrolled ? '45px' : '55px', 
            transition: 'all 0.4s ease-in-out', 
            objectFit: 'contain',
            transform: 'scale(3.0)',
            transformOrigin: 'center',
            filter: 'drop-shadow(0 0 20px rgba(255, 255, 255, 1))'
          }} 
        />
      </Link>

      {/* Right Nav + Actions */}
      <nav 
        className="header__nav header__nav--right"
        style={{ display: 'flex', gap: '0px', flex: 1, justifyContent: 'flex-end', alignItems: 'center', padding: 0, border: 'none' }}
      >
        <div style={{
          display: 'flex', gap: '8px', alignItems: 'center',
          opacity: isScrolled ? 1 : 0, 
          visibility: isScrolled ? 'visible' : 'hidden', 
          transition: 'all 0.4s ease-in-out'
        }}>
          <Link className={`nav__link ${isActive("/shop") ? "active" : ""}`} to="/shop" style={navLinkStyle}>Sản phẩm</Link>
          <Link className={`nav__link ${isActive("/blog") ? "active" : ""}`} to="/blog" style={navLinkStyle}>Bài Viết</Link>
          <Link className={`nav__link ${isActive("/media") ? "active" : ""}`} to="/media" style={navLinkStyle}>Thư viện ảnh</Link>
          <a
            className="nav__link"
            href="https://www.facebook.com/medihomeretreat"
            target="_blank"
            rel="noopener noreferrer"
            style={navLinkStyle}
          >
            Fanpage
          </a>
        </div>

        <div className="header__actions" style={{ position: 'relative', top: 'auto', right: 'auto', display: 'flex', alignItems: 'center', gap: '8px', marginLeft: '4px' }}>
          {user && (
            <button
              className="iconBtn"
              aria-label="Cart"
              onClick={() => navigate("/cart")}
              title={`Giỏ hàng (${cartCount} sản phẩm)`}
              style={{ opacity: isScrolled ? 1 : 0, visibility: isScrolled ? 'visible' : 'hidden', transition: 'all 0.4s ease-in-out' }}
            >
              {cartCount > 0 && <span className="badge">{cartCount}</span>}
              <svg viewBox="0 0 24 24" className="icon" style={{ fill: isScrolled ? '#6b5b4f' : '#ebd9b4' }}>
                <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-1.99.9-1.99 2S15.9 22 17 22s2-.9 2-2-.9-2-2-2zM6.2 6l.6 3h12.7l-1.2 6H7.4l-.3-1.5H5.1L4 3H2V1h3.6l.6 3h13.9v2H6.2z" />
              </svg>
            </button>
          )}

          {user ? (
            <div className="header__user-menu" ref={dropdownRef} style={{ opacity: isScrolled ? 1 : 0, visibility: isScrolled ? 'visible' : 'hidden', transition: 'all 0.4s ease-in-out' }}>
              <div
                className="header__user-info"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <div className="header__user-avatar" style={{ color: isScrolled ? '#6b5b4f' : '#ebd9b4', borderColor: isScrolled ? '#6b5b4f' : '#ebd9b4' }}>
                  <UserOutlined />
                </div>
                <span className="header__user-name" style={{ color: isScrolled ? '#6b5b4f' : '#ebd9b4', fontWeight: '600' }}>
                  {user.fullName || user.name || user.email || "User"}
                </span>
                <span
                  className={`header__user-caret ${
                    dropdownOpen ? "header__user-caret--open" : ""
                  }`}
                  style={{ color: isScrolled ? '#6b5b4f' : '#ebd9b4' }}
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
            <Link 
              to="/login"
              style={isScrolled ? {
                padding: '8px 20px',
                backgroundColor: '#957159',
                color: '#ffffff',
                border: '1px solid #957159',
                borderRadius: '30px',
                fontWeight: '700',
                cursor: 'pointer',
                fontSize: '12px',
                fontFamily: '"Montserrat", "Inter", sans-serif',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                textDecoration: 'none',
                transition: 'all 0.4s ease-in-out',
                whiteSpace: 'nowrap',
                display: 'inline-block'
              } : {
                padding: '10px 20px',
                backgroundColor: '#f3d9a9',
                color: '#333333',
                border: 'none',
                borderRadius: '30px',
                fontWeight: '700',
                cursor: 'pointer',
                fontSize: '13px',
                fontFamily: '"Montserrat", "Inter", sans-serif',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                textDecoration: 'none',
                transition: 'all 0.4s ease-in-out',
                boxShadow: '0 4px 15px rgba(243, 217, 169, 0.4)',
                whiteSpace: 'nowrap',
                display: 'inline-block'
              }}
            >
              Đăng nhập
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Header;
