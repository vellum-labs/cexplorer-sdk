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
  const containerRef = useRef<HTMLSpanElement>(null);
  const fullTextRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (isHovered && fullTextRef.current && containerWidth) {
      const fullTextWidth = fullTextRef.current.scrollWidth;
      const distance = fullTextWidth - containerWidth;
      setScrollDistance(distance > 0 ? distance : 0);
    }
  }, [isHovered, containerWidth]);

  return (
    <span
      ref={containerRef}
      className={className}
      style={{
        display: "inline-block",
        verticalAlign: "middle",
        ...(isHovered
          ? {
              overflow: "hidden",
              width: containerWidth ? `${containerWidth}px` : undefined,
            }
          : {}),
      }}
      onMouseEnter={() => {
        if (containerRef.current) {
          setContainerWidth(containerRef.current.offsetWidth);
        }
        setIsHovered(true);
      }}
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
