import { useEffect, useRef } from 'react';

export const useFadeInOnScroll = () => {
  const refs = useRef<HTMLDivElement[]>([]);

    const addToRefs = (el: HTMLDivElement | null) => {
  if (el && !refs.current.includes(el)) {
    refs.current.push(el);
  }
};
  useEffect(() => {
    const handleScroll = () => {
      refs.current.forEach((ref) => {
        if (ref) {
          const rect = ref.getBoundingClientRect();
          const isInViewport = rect.top <= window.innerHeight && rect.bottom >= 0;

          if (isInViewport) {
            ref.classList.add('active');
          } else {
            ref.classList.remove('active');
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return addToRefs;
};
