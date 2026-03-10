"use client"

import { forwardRef, type ButtonHTMLAttributes } from "react"
import { cn } from "@/lib/utils"

export interface ShapedButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "filled" | "outline"
  size?: "sm" | "md" | "lg"
  fullWidth?: boolean
}

const sizeConfig = {
  sm: { width: 140, height: 48, fontSize: 14, viewBox: "0 0 140 48", path: "M0 8C0 3.58172 3.58172 0 8 0H132C136.418 0 140 3.58172 140 8V40C140 44.4183 136.418 48 132 48H8C3.58172 48 0 44.4183 0 40V8Z" },
  md: { width: 184, height: 65, fontSize: 20, viewBox: "0 0 184 65", path: "M0 8C0 3.58172 3.58172 0 8 0H176C180.418 0 184 3.58172 184 8V57C184 61.4183 180.418 65 176 65H8C3.58172 65 0 61.4183 0 57V8Z" },
  lg: { width: 220, height: 65, fontSize: 18, viewBox: "0 0 220 65", path: "M0 8C0 3.58172 3.58172 0 8 0H212C216.418 0 220 3.58172 220 8V57C220 61.4183 216.418 65 212 65H8C3.58172 65 0 61.4183 0 57V8Z" },
}

export const ShapedButton = forwardRef<HTMLButtonElement, ShapedButtonProps>(
  ({ className, variant = "filled", size = "md", fullWidth = false, children, ...props }, ref) => {
    const config = sizeConfig[size]
    
    return (
      <button
        ref={ref}
        className={cn(
          "relative transition-transform duration-200 ease-out hover:scale-105 active:scale-95 cursor-pointer group",
          fullWidth ? "w-full" : "",
          className
        )}
        style={{ 
          width: fullWidth ? "100%" : config.width, 
          height: config.height 
        }}
        {...props}
      >
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox={fullWidth ? `0 0 320 ${config.height}` : config.viewBox}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path
            d={fullWidth 
              ? `M0 8C0 3.58172 3.58172 0 8 0H312C316.418 0 320 3.58172 320 8V${config.height - 8}C320 ${config.height - 3.58172}4183 316.418 ${config.height} 312 ${config.height}H8C3.58172 ${config.height} 0 ${config.height - 3.58172}4183 0 ${config.height - 8}V8Z`
              : config.path
            }
            fill={variant === "filled" ? "white" : "transparent"}
            stroke={variant === "outline" ? "white" : undefined}
            strokeWidth={variant === "outline" ? 2 : undefined}
            className={cn(
              "transition-all duration-300",
              variant === "filled" && "group-hover:fill-white/90",
              variant === "outline" && "group-hover:fill-white/10"
            )}
          />
        </svg>
        <span
          className={cn(
            "relative z-10 flex items-center justify-center gap-2 w-full h-full font-bold uppercase tracking-wide",
            variant === "filled" ? "text-[#161a20]" : "text-white"
          )}
          style={{ fontSize: config.fontSize }}
        >
          {children}
        </span>
      </button>
    )
  }
)

ShapedButton.displayName = "ShapedButton"
