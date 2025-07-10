import { useState, useEffect } from "react";

export const useScreenSize = () => {
  const [screenSize, setScreenSize] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const updateScreenSize = () => {
        setScreenSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      };

      // Set initial size
      updateScreenSize();

      // Add event listener
      window.addEventListener("resize", updateScreenSize);

      // Cleanup
      return () => window.removeEventListener("resize", updateScreenSize);
    }
  }, []);

  return screenSize;
};
