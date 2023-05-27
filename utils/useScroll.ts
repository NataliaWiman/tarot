import { useState, useEffect, RefObject } from "react";

export function useScroll(ref: RefObject<HTMLElement>) {
  const [scrollY, setScrollY] = useState(0);
  const [scrollYProgress, setScrollYProgress] = useState(0);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleScroll = () => {
      const maxScroll = element.scrollHeight - element.clientHeight;
      setScrollY(element.scrollTop);
      setScrollYProgress(element.scrollTop / maxScroll);
    };

    element.addEventListener("scroll", handleScroll);
    return () => element.removeEventListener("scroll", handleScroll);
  }, [ref]);

  return { scrollY, scrollYProgress };
}
