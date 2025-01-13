import * as React from "react";

interface LabelProps extends React.HTMLAttributes<HTMLDivElement> {
  color?: string;
}

export function Label({
  color,
  children,
  className = "",
  ...props
}: LabelProps) {
  return (
    <div
      style={{ backgroundColor: color }}
      className={`inline-flex items-center leading-none  justify-center rounded-full px-3 py-1 text-xs max-w-[70px] overflow-hidden ${className}`}
      {...props}
    >
      <span className="truncate">{children}</span>
    </div>
  );
}
