import React from 'react'
import { cn } from '@sms/utils'

interface StatCardProps {
  label: string
  value: string | number
  variant?: 'primary' | 'success' | 'danger' | 'warning'
  className?: string
}

export const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  variant = 'primary',
  className,
}) => {
  return (
    <div className={cn('sms-stat-card', `sms-stat-card--${variant}`, className)}>
      <span className="sms-stat-card__value">{value}</span>
      <span className="sms-stat-card__label">{label}</span>
    </div>
  )
}
