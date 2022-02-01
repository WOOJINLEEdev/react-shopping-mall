import { useState, useEffect, useCallback } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";

const useScrollMove = ({ path }) => {
  const history = useHistory();
  const [scrollInfos, setScrollInfos] = useState(() =>
    localStorage.getItem(`${path}_scroll_Y`)
  );
  const match = useRouteMatch(path);

  const scrollSave = useCallback(() => {
    const scrollY = window.scrollY;
    setScrollInfos(scrollY);
    return localStorage.setItem(`${path}_scroll_Y`, scrollY);
  }, [window.scrollY]);

  const scrollRemove = useCallback(() => {
    setScrollInfos(0);
    localStorage.removeItem(`${path}_scroll_Y`);
  }, []);

  useEffect(() => {
    return history.listen((location) => {
      if (match?.isExact && location.pathname !== path) {
        scrollSave();
        window.scrollTo(0, 0);
      }
    });
  }, [history, match, scrollSave]);

  return { scrollInfos, scrollRemove };
};

export default useScrollMove;
