import { useMediaQuery } from "react-responsive";

const useDevice = () => {
  const isPc = useMediaQuery({ query: "(min-width:1024px)" });
  const isTablet = useMediaQuery({
    query: "(min-width:768px) and (max-width:1023px)",
  });
  const isMobile = useMediaQuery({
    query: "(min-width: 320px) and (max-width:767px)",
  });

  return { isPc, isTablet, isMobile };
};

export default useDevice;
