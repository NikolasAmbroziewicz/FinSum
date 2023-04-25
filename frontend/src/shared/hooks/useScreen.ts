import { useEffect, useState } from 'react';

interface IUseScreen {
  width: number | undefined;
  height: number | undefined;
}

const screens = {
  xs: 375,
  sm: 600,
  md: 900,
  lg: 1200,
  xl: 1536
};

export const useScreen = () => {
  const [windowSize, setWindowSize] = useState<IUseScreen>({
    width: undefined,
    height: undefined
  });

  const handleResize = () => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight
    });
  };

  useEffect(() => {
    // Add event listener
    window.addEventListener('resize', handleResize);
    // Call handler right away so state gets updated with initial window size
    handleResize();
    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isXSmallScreen = () => {
    return windowSize.width && windowSize.width <= screens.xs;
  };

  const isMobileScreen = () => {
    return windowSize.width && windowSize.width <= screens.sm;
  };

  const isTabletScreen = () => {
    return windowSize.width && windowSize.width <= screens.md;
  };

  const isDesktopScreen = () => {
    return windowSize.width && windowSize.width <= screens.lg;
  };

  const isLargeScreen = () => {
    return windowSize.width && windowSize.width <= screens.xl;
  };

  return {
    isXSmallScreen,
    isMobileScreen,
    isTabletScreen,
    isDesktopScreen,
    isLargeScreen
  };
};
