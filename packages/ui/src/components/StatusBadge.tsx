import React from 'react'
import { cn } from '@sms/utils'

interface StatusBadgeProps {
  status: string
  label: string
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, label }) => {
  const colorMap: Record<string, string> = {
    sent: 'sent',
    delivered: 'delivered',
    pending: 'pending',
    failed: 'failed',
  }

  const color = colorMap[status] || 'unknown'

  return (
    <span className={cn('sms-badge', `sms-badge--${color}`)}>
      {label}
    </span>
  )
}
