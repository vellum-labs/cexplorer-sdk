import { useEffect, useRef, useState } from "react";

interface FormatStringComponentProps {
  text: string;
  truncated: string;
  className?: string;
}

export const FormatStringComponent = ({
  text,
  truncated,
  className,
}: FormatStringComponentProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [containerWidth, setContainerWidth] = useState<number | null>(null);
  const [scrollDistance, setScrollDistance] = useState(0);
  const textRef = useRef<HTMLSpanElement>(null);
  const fullTextRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (textRef.current && !containerWidth) {
      setContainerWidth(textRef.current.offsetWidth);
    }
  }, [containerWidth]);

  useEffect(() => {
    if (isHovered && fullTextRef.current && containerWidth) {
      const fullTextWidth = fullTextRef.current.scrollWidth;
      const distance = fullTextWidth - containerWidth;
      setScrollDistance(distance > 0 ? distance : 0);
    }
  }, [isHovered, containerWidth]);

  return (
    <span
      ref={textRef}
      className={className}
      style={{
        display: "inline-block",
        overflow: "hidden",
        verticalAlign: "middle",
        ...(containerWidth ? { width: `${containerWidth}px` } : {}),
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isHovered ? (
        <span
          ref={fullTextRef}
          className='inline-block whitespace-nowrap'
          style={
            {
              animation:
                scrollDistance > 0
                  ? "marquee 10s ease-in-out infinite"
                  : "none",
              "--scroll-distance": `-${scrollDistance}px`,
            } as React.CSSProperties & { "--scroll-distance": string }
          }
        >
          {text}
        </span>
      ) : (
        <span className='whitespace-nowrap'>{truncated}</span>
      )}
    </span>
  );
};
