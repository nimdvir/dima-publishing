import type { ReactNode } from 'react';

interface MobileNavProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}

export default function MobileNav({ open, onClose, children }: MobileNavProps) {
  return (
    <>
      {/* Overlay */}
      <div
        className={`mobile-overlay ${open ? 'is-open' : ''}`}
        onClick={onClose}
        aria-hidden="true"
      />
      {/* Drawer */}
      <nav className={`mobile-drawer ${open ? 'is-open' : ''}`} aria-label="Mobile navigation">
        {children}
      </nav>
    </>
  );
}
