import { EasingFunction, motion, useScroll, useTransform } from "framer-motion";
import {
  PropsWithChildren,
  ReactElement,
  useEffect,
  useRef,
  useState,
} from "react";

type SlideAnimationProps = {
  easing?: EasingFunction | number[];
};

const SlideAnimation = ({
  children,
  easing = [0.4, 0, 0.5, 1],
}: PropsWithChildren<SlideAnimationProps>): ReactElement => {
  const ref = useRef<HTMLInputElement | null>(null);
  const [elementTop, setElementTop] = useState(0);
  const [windowHeight, setWindowHeight] = useState(0);

  const { scrollY } = useScroll();

  useEffect(() => {
    if (!ref.current) return;
    setElementTop(ref.current.offsetTop);
    setWindowHeight(window.innerHeight);
  }, []);

  const opacity = useTransform(
    scrollY,
    [elementTop - windowHeight, elementTop - windowHeight + 70],
    [0, 1],
    { ease: easing as EasingFunction },
  );
  const y = useTransform(
    scrollY,
    [elementTop - windowHeight, elementTop - windowHeight + 70],
    [20, 0],
    { ease: easing as EasingFunction },
  );

  return (
    <motion.div ref={ref} style={{ opacity, y }}>
      {children}
    </motion.div>
  );
};

export default SlideAnimation;
