import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Check, Copy } from 'lucide-react'
import { useState } from 'react'

interface CopyButtonProps {
  textToCopy: string
}

export const CopyButton = ({ textToCopy }: CopyButtonProps) => {
  const [isCopied, setIsCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(textToCopy)
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 2000)
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleCopy}
      className="size-7 rounded-md"
    >
      <Check className={cn('size-4 text-emerald-500', { hidden: !isCopied })} />
      <Copy
        className={cn('size-4 text-muted-foreground', { hidden: isCopied })}
      />
    </Button>
  )
}
