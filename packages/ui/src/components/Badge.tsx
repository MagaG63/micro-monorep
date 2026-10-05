import React from 'react'
import { cn } from '@sms/utils'

interface BadgeProps {
  variant?: 'info' | 'success' | 'danger' | 'warning'
  className?: string
  children: React.ReactNode
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'info',
  className,
  children,
}) => {
  return <span className={cn('sms-badge', `sms-badge--${variant}`, className)}>{children}</span>
}
