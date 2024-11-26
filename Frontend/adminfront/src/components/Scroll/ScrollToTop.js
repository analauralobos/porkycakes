import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // Desplaza el scroll hacia la parte superior
  }, [pathname]); 

  return null; 
};

export default ScrollToTop;
