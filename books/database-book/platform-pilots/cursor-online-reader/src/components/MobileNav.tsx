type MobileNavProps = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export function MobileNav({ isOpen, onOpen, onClose }: MobileNavProps) {
  return (
    <>
      <button
        type="button"
        className="mobile-menu-button"
        aria-label="Open chapter menu"
        aria-expanded={isOpen}
        onClick={onOpen}
      >
        Menu
      </button>
      {isOpen && (
        <button
          type="button"
          className="sidebar-backdrop"
          aria-label="Close chapter menu"
          onClick={onClose}
        />
      )}
    </>
  );
}
