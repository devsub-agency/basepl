import { cn } from '@/lib/utils'
import { CircleAlert, TriangleAlert } from 'lucide-react'
import { JSX } from 'react'

interface NotificationContainerProps {
  children: JSX.Element
  context: 'informational' | 'warning'
}

export const NotificationContainer = ({
  children,
  context = 'warning',
}: NotificationContainerProps) => {
  return (
    <div
      className={cn('flex gap-4 rounded-lg border p-4', {
        'border-sky-500/20': context === 'informational',
        'border-yellow-500/20': context === 'warning',
        'bg-sky-500/10': context === 'informational',
        'bg-yellow-500/10': context === 'warning',
      })}
    >
      <div className="pt-1">
        <TriangleAlert
          className={cn('hidden size-5 text-yellow-500 dark:text-yellow-400', {
            flex: context === 'warning',
          })}
        />
        <CircleAlert
          className={cn('text-bue-500 hidden size-5 dark:text-sky-400', {
            block: context === 'informational',
          })}
        />
      </div>
      <p
        className={cn('text-sm', {
          'text-yellow-700 dark:text-yellow-200': context === 'warning',
          'text-sky-700 dark:text-sky-200': context === 'informational',
        })}
      >
        {children}
      </p>
    </div>
  )
}
