export default function Logo({ size = 28, showTagline = false }) {
  return (
    <div className="pc-logo">
      <span className="pc-logo-mark" style={{ width: size, height: size }}>
        <svg viewBox="0 0 24 24" fill="none" width="60%" height="60%">
          <path
            d="M9 3h6v4h4a1 1 0 0 1 1 1v3H4V8a1 1 0 0 1 1-1h4V3Z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <path
            d="M4 11h16v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8Z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <path d="M12 13v6M9 16h6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      </span>
      <span className="pc-logo-text">
        Medureon
        {showTagline && <span className="pc-logo-sub">ERP</span>}
      </span>
    </div>
  );
}
