import { useEffect, useRef, useState } from "react";
import useMousePosition from "./useMousePosition";

const useAbsoluteHover = () => {
  const { clientX, clientY } = useMousePosition();
  const [value, setValue] = useState(false);
  const ref = useRef<any>(null);

  useEffect(() => {
    const {
      width = 0,
      height = 0,
      left = Infinity,
      top = Infinity,
    } = ref?.current.getBoundingClientRect();
    if (
      clientX > left &&
      clientX < left + width &&
      clientY > top &&
      clientY < top + height
    ) {
      setValue(true);
    } else {
      setValue(false);
    }
  }, [clientX, clientY]);

  return [ref, value];
};

export default useAbsoluteHover;
