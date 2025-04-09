// src/components/common/ScrollToTop.tsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll to top (0, 0) whenever the pathname changes
    // Use try/catch just in case window isn't available in some SSR scenarios (though unlikely for scrollTo)
    try {
      window.scrollTo(0, 0);
    } catch (error) {
      console.error("ScrollToTop failed:", error);
    }
  }, [pathname]); // Dependency array ensures effect runs only when pathname changes

  return null; // This component doesn't render anything itself
};

export default ScrollToTop;
