'use client';

import { useEffect, useRef } from 'react';

export default function AdsterraNativeBanner() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Prevent duplicate script injection during hot-reloads/hydrations
    if (containerRef.current && !containerRef.current.querySelector('script')) {
      const script = document.createElement('script');
      script.src = 'https://bauval.org/21/603813c3d0ae6af50e1e9af87b98b517';
      script.async = true;
      script.setAttribute('data-cfasync', 'false');

      containerRef.current.appendChild(script);
    }
  }, []);

  return (
    <div ref={containerRef} className="my-8 flex flex-col items-center justify-center">
      <div id="container-603813c3d0ae6af50e1e9af87b98b517"></div>
    </div>
  );
}