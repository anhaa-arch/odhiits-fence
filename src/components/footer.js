import React from "react";

// Footer component

function Footer() {
  return (
    <footer style={{ padding: '16px', borderTop: '1px solid #eee', marginTop: 32, textAlign: 'center', fontSize: 14 }}>
      <div>Батхонгор Хийцэд тавтай морил</div>
      <div style={{ margin: '8px 0' }}>
        <a href="/" style={{ margin: '0 8px' }}>Нүүр</a>
        <a href="/about" style={{ margin: '0 8px' }}>Бидний тухай</a>
        <a href="/fences" style={{ margin: '0 8px' }}>Хашаа</a>
        <a href="/pricing" style={{ margin: '0 8px' }}>Үнийн санал</a>
        <a href="/blog" style={{ margin: '0 8px' }}>Блог</a>
        <a href="/contact" style={{ margin: '0 8px' }}>Холбоо барих</a>
      </div>
      <div style={{ color: '#888' }}>© 2023 Батхонгор Хийц</div>
    </footer>
  );
}

export default Footer; 