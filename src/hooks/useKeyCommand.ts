import { useEffect } from 'react';
import { useViewMode } from '../context/ViewModeContext';

export const useKeyCommand = () => {
  const { toggleViewMode } = useViewMode();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input, textarea, or contentEditable
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.isContentEditable)
      ) {
        return;
      }

      // Space key or 'i' to toggle view mode
      if (e.code === 'Space' || e.key.toLowerCase() === 'i') {
        // Prevent default spacebar page jump
        if (e.code === 'Space') {
          e.preventDefault();
        }
        toggleViewMode();
        return;
      }

      // Number keys for section navigation
      const sectionMap: Record<string, string> = {
        '1': 'work',
        '2': 'distributed',
        '3': 'lab',
        '4': 'notes',
        '5': 'experience',
      };

      if (sectionMap[e.key]) {
        const el = document.getElementById(sectionMap[e.key]);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [toggleViewMode]);
};
