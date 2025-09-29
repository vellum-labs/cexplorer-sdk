interface LoadingSkeletonProps {
  height?: string;
  width?: string;
  maxHeight?: string;
  maxWidth?: string;
  margin?: string;
  rounded?: "sm" | "md" | "lg" | "xl" | "full";
  className?: string;
};

export const LoadingSkeleton = ({
  height = "100%",
  width = "100%",
  maxHeight = "100%",
  maxWidth = "100%",
  rounded = "sm",
  className,
}: LoadingSkeletonProps) => {
  return (
    <div
      style={{
        height: height,
        width: width,
        maxHeight: maxHeight,
        maxWidth: maxWidth,
      }}
      data-testid='skeleton'
      className={`shimmer shrink-0 bg-gray-400/15 rounded-${rounded} ${className}`}
    />
  );
};

