interface BadgesProps {
  label: string
  text: string
}
export const Badges = ({ text, label }: BadgesProps) => {
  const textBlocks = text.split(',')

  return (
    <div className="my-3 flex gap-4">
      <span className="text-sm font-medium text-emerald-500 dark:text-emerald-400">
        {label}
      </span>
      <div className="flex flex-wrap items-center gap-1">
        {textBlocks.map((block, index) => (
          <span
            key={index}
            className="inline rounded-md bg-accent-foreground/10 px-2 py-0.5 font-mono text-xs text-foreground/90"
          >
            {block}
          </span>
        ))}
      </div>
    </div>
  )
}
