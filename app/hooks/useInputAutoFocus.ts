import React from "react";

export default function useInputAutoFocus() {
  const inputElement = React.useRef<HTMLInputElement | null>(null);

  React.useEffect(() => {
    window.addEventListener("focus", () => {
      if (inputElement.current) {
        (inputElement.current as HTMLInputElement).focus();
      }
    });

    return () => {
      window.removeEventListener("focus", () => {
        if (inputElement.current) {
          (inputElement.current as HTMLInputElement).focus();
        }
      });
    };
  }, []);

  return inputElement;
}
