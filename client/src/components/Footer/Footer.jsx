import React from 'react';

export default function Footer() {
  return (
    <footer style={{
      textAlign: 'center', position: 'absolute', bottom: 0, right: 0, left: 0, fontFamily: 'Roboto', zIndex: '-10',
    }}
    >
      <p>© 2022 Создано в студии Александра Романова</p>
    </footer>
  );
}
