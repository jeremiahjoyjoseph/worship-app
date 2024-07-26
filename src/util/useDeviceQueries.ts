import { useMediaQuery } from "react-responsive";

export const breakpoints = {
  mobileS: "320px",
  mobileM: "375px",
  mobileP: "390px",
  mobileX: "414px",
  mobileL: "425px",
  tablet: "768px",
  laptop: "1024px",
  laptopM: "1280px",
  laptopL: "1440px",
  laptopX: "1520px",
  desktop: "2560px",
};

export const device = {
  mobileS: `(min-width: ${breakpoints.mobileS})`,
  mobileM: `(min-width: ${breakpoints.mobileM})`,
  mobileP: `(min-width: ${breakpoints.mobileP})`,
  mobileX: `(min-width: ${breakpoints.mobileX})`,
  mobileL: `(min-width: ${breakpoints.mobileL})`,
  tablet: `(min-width: ${breakpoints.tablet})`,
  laptop: `(min-width: ${breakpoints.laptop})`,
  laptopM: `(min-width: ${breakpoints.laptopM})`,
  laptopL: `(min-width: ${breakpoints.laptopL})`,
  laptopX: `(min-width: ${breakpoints.laptopX})`,
  desktop: `(min-width: ${breakpoints.desktop})`,
  desktopL: `(min-width: ${breakpoints.desktop})`,
};

export const useDeviceQueries = () => {
  const isPortrait = useMediaQuery({
    query: "(orientation: portrait)",
  });
  const isMobile = useMediaQuery({
    query: `(max-width: ${breakpoints.mobileL})`,
  });

  const isMobileS = useMediaQuery({
    query: `(min-width: ${breakpoints.mobileS})`,
  });

  const isMobileM = useMediaQuery({
    query: `(min-width: ${breakpoints.mobileM})`,
  });
  const isMobileP = useMediaQuery({
    query: `(min-width: ${breakpoints.mobileP})`,
  });
  const isMobileX = useMediaQuery({
    query: `(min-width: ${breakpoints.mobileX})`,
  });
  const isMobileL = useMediaQuery({
    query: `(min-width: ${breakpoints.mobileL})`,
  });
  const isTablet = useMediaQuery({
    query: `(min-width: ${breakpoints.tablet})`,
  });
  const isLaptop = useMediaQuery({
    query: `(min-width: ${breakpoints.laptop})`,
  });
  const isLaptopM = useMediaQuery({
    query: `(min-width: ${breakpoints.laptopM})`,
  });
  const isLaptopL = useMediaQuery({
    query: `(min-width: ${breakpoints.laptopL})`,
  });
  const isLaptopX = useMediaQuery({
    query: `(min-width: ${breakpoints.laptopX})`,
  });
  const isDesktop = useMediaQuery({
    query: `(min-width: ${breakpoints.desktop})`,
  });

  return {
    isMobileS,
    isMobile,
    isMobileM,
    isMobileP,
    isMobileX,
    isMobileL,
    isTablet,
    isLaptop,
    isLaptopM,
    isLaptopL,
    isLaptopX,
    isDesktop,
    isPortrait,
  };
};
