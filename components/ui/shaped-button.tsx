"use client"

import { forwardRef, type ButtonHTMLAttributes } from "react"
import { cn } from "@/lib/utils"

export interface ShapedButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "filled" | "outline"
  size?: "sm" | "md" | "lg"
  fullWidth?: boolean
}

// Ive #3: Softer radii (14px) for premium tactile feel
const sizeConfig = {
  sm: { width: 140, height: 48, fontSize: 14, viewBox: "0 0 140 48", path: "M0 14C0 6.268 6.268 0 14 0H126C133.732 0 140 6.268 140 14V34C140 41.732 133.732 48 126 48H14C6.268 48 0 41.732 0 34V14Z" },
  md: { width: 184, height: 65, fontSize: 20, viewBox: "0 0 184 65", path: "M0 16C0 7.163 7.163 0 16 0H168C176.837 0 184 7.163 184 16V49C184 57.837 176.837 65 168 65H16C7.163 65 0 57.837 0 49V16Z" },
  lg: { width: 220, height: 65, fontSize: 18, viewBox: "0 0 220 65", path: "M0 16C0 7.163 7.163 0 16 0H204C212.837 0 220 7.163 220 16V49C220 57.837 212.837 65 204 65H16C7.163 65 0 57.837 0 49V16Z" },
}

export const ShapedButton = forwardRef<HTMLButtonElement, ShapedButtonProps>(
  ({ className, variant = "filled", size = "md", fullWidth = false, children, ...props }, ref) => {
    const config = sizeConfig[size]
    
    return (
      <button
        ref={ref}
        className={cn(
          // Ive #3: Subtle shadow on hover, refined press state with squish effect
          "relative cursor-pointer group",
          "transition-all duration-300 ease-out",
          "hover:scale-[1.03] hover:shadow-[0_8px_30px_rgba(255,255,255,0.15)]",
          "active:scale-[0.97] active:shadow-none",
          fullWidth ? "w-full" : "",
          className
        )}
        style={{ 
          width: fullWidth ? "100%" : config.width, 
          height: config.height,
          transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
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
