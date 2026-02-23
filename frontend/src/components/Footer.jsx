import "../App.css";

export default function Footer() {
  return (
    <footer className="ft">
      <div className="ft__top">
        <div className="ft__brand">
          <div className="ft__mark" aria-hidden="true">
            <span className="ft__leaf" />
          </div>

          <div className="ft__brandText">
            <div className="ft__name">MediTea</div>
            <div className="ft__tag">tea production</div>
          </div>
        </div>

        <div className="ft__social">
          <span className="ft__socialLabel">Follow us</span>
          <span className="ft__dash" aria-hidden="true">
            —
          </span>

          <div className="ft__icons">
            <a className="ft__icon" href="#" aria-label="Twitter">
              {/* twitter */}
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M21 7.2c-.7.3-1.5.5-2.3.6.8-.5 1.4-1.2 1.7-2.1-.8.5-1.6.8-2.5 1A3.6 3.6 0 0 0 12 7.9c0 .3 0 .6.1.9-3-.2-5.7-1.6-7.5-4-.3.6-.5 1.2-.5 2 0 1.2.6 2.3 1.6 3-.6 0-1.1-.2-1.6-.4v.1c0 1.8 1.3 3.3 3 3.6-.3.1-.7.1-1.1.1-.2 0-.5 0-.7-.1.5 1.6 2 2.8 3.8 2.8A7.2 7.2 0 0 1 3 17.8a10.2 10.2 0 0 0 15.7-8.6v-.4c.7-.5 1.3-1.1 1.8-1.8Z" />
              </svg>
            </a>

            <a className="ft__icon" href="#" aria-label="Facebook">
              {/* facebook */}
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M14 8.6V7.2c0-.7.5-1.2 1.2-1.2H17V3h-2.2A4.3 4.3 0 0 0 10.5 7.2v1.4H8v3h2.5V21h3.5v-9.4h2.8l.5-3H14Z" />
              </svg>
            </a>

            <a className="ft__icon" href="#" aria-label="Instagram">
              {/* instagram */}
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4Zm10 2H7a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2Zm-5 3.5A3.5 3.5 0 1 1 8.5 12 3.5 3.5 0 0 1 12 8.5Zm0 2A1.5 1.5 0 1 0 13.5 12 1.5 1.5 0 0 0 12 10.5ZM17.6 7.4a.8.8 0 1 1-.8.8.8.8 0 0 1 .8-.8Z" />
              </svg>
            </a>

            <a className="ft__icon" href="#" aria-label="Google Plus">
              {/* google plus (icon kiểu G+) */}
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 11v2.2h3.1c-.4 1.4-1.6 2.2-3.1 2.2A3.6 3.6 0 1 1 12 8.2c.9 0 1.6.3 2.2.8l1.5-1.5A5.7 5.7 0 0 0 12 6.5a5.7 5.7 0 1 0 0 11.4c3 0 5.4-2.1 5.4-5.7 0-.4 0-.8-.1-1.2H12Zm8.5 0v-1.5H19V11h-1.5v1.5H19V14h1.5v-1.5H22V11h-1.5Z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div className="ft__line" />

      <div className="ft__bottom">
        <h3 className="ft__title">About us</h3>

        <p className="ft__addr">
          <span className="ft__addrLabel">Addres:</span> Thach That
          <br />
          Ha Noi
        </p>
      </div>

      <span className="ft__bgLeaf ft__bgLeaf--l" aria-hidden="true" />
      <span className="ft__bgLeaf ft__bgLeaf--r" aria-hidden="true" />
    </footer>
  );
}
