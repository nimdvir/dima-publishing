import { useState, useEffect, useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'motion/react';

interface ImageLightboxProps {
  src: string;
  alt: string;
  onClose: () => void;
}

const MIN_SCALE = 0.8;
const MAX_SCALE = 6;
const WHEEL_STEP = 0.3;

export default function ImageLightbox({ src, alt, onClose }: ImageLightboxProps) {
  const [scale, setScale] = useState(1);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const viewportRef = useRef<HTMLDivElement>(null);

  const resetZoom = useCallback(() => {
    setScale(1);
    setPos({ x: 0, y: 0 });
  }, []);

  // Escape key
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [handleKeyDown]);

  // Non-passive wheel listener for zoom
  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      setScale((prev) => {
        const delta = e.deltaY < 0 ? WHEEL_STEP : -WHEEL_STEP;
        return Math.min(MAX_SCALE, Math.max(MIN_SCALE, prev + delta));
      });
    };

    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, []);

  // Drag to pan
  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (scale > 1.01) {
        e.preventDefault();
        setDragging(true);
        dragStart.current = { x: e.clientX - pos.x, y: e.clientY - pos.y };
      }
    },
    [scale, pos]
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (dragging) {
        setPos({
          x: e.clientX - dragStart.current.x,
          y: e.clientY - dragStart.current.y,
        });
      }
    },
    [dragging]
  );

  const handleMouseUp = useCallback(() => {
    setDragging(false);
  }, []);

  // Double-click: toggle zoom
  const handleDoubleClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      if (scale > 1.1) {
        resetZoom();
      } else {
        setScale(2.5);
        setPos({ x: 0, y: 0 });
      }
    },
    [scale, resetZoom]
  );

  // Backdrop click
  const handleBackdropClick = useCallback(() => {
    if (scale <= 1.05) onClose();
    else resetZoom();
  }, [scale, onClose, resetZoom]);

  return createPortal(
    <motion.div
      className="image-lightbox-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-label={alt || 'Enlarged image'}
    >
      <button
        className="image-lightbox-close"
        onClick={onClose}
        aria-label="Close image viewer"
      >
        &#x2715;
      </button>
      <div className="image-lightbox-viewport" ref={viewportRef}>
        <motion.img
          src={src}
          alt={alt || ''}
          className={`image-lightbox-img${dragging ? ' dragging' : scale > 1.01 ? ' grabbable' : ''}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{
            transform: `translate(${pos.x}px, ${pos.y}px) scale(${scale})`,
          }}
          transition={{ duration: 0.15 }}
          onClick={(e) => e.stopPropagation()}
          onDoubleClick={handleDoubleClick}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          draggable={false}
        />
      </div>
    </motion.div>,
    document.body
  );
}
