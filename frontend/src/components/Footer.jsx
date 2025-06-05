import React from 'react';

function Footer() {
  return (
    <footer className="py-3 mt-auto" style={{ background: '#c7dff4' }}>
      <div className="container-fluid text-center">
        <span className="text-muted">
          &copy; {new Date().getFullYear()} ALTIUSHUB. All rights reserved.
        </span>
      </div>
    </footer>
  );
}

export default Footer;