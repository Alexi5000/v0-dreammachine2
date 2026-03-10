import { cn } from "@/lib/utils"

export interface SectionHeaderProps {
  label: string
  title: string
  description?: string
  align?: "left" | "center"
  className?: string
}

export function SectionHeader({
  label,
  title,
  description,
  align = "left",
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "max-w-3xl mb-16 md:mb-24",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      <span className="inline-block text-sm font-bold uppercase text-white/50 tracking-widest mb-4">
        {label}
      </span>
      <h2
        className="text-4xl md:text-6xl lg:text-7xl font-bold uppercase text-white mb-6"
        style={{ lineHeight: 1.1, letterSpacing: "-2px" }}
      >
        {title}
      </h2>
      {description && (
        <p className="text-lg text-white/60 leading-relaxed">{description}</p>
      )}
    </div>
  )
}
