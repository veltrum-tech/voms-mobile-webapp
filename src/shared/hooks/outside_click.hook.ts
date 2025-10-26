import { useEffect, useRef } from "react";

// Define a simple type for your handler
type FnWithNoArgAndVoidReturnType = () => void;

export const useOutsideClick = (
  handler: FnWithNoArgAndVoidReturnType,
  listenCapturing: boolean = true
) => {
  // force to non-nullable HTMLDivElement
  const ref = useRef<HTMLDivElement>(null!)  // <-- non-null assertion

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handler();
      }
    };

    document.addEventListener("click", handleClick, listenCapturing);
    return () => {
      document.removeEventListener("click", handleClick, listenCapturing);
    };
  }, [handler, listenCapturing]);

  return ref;
};

