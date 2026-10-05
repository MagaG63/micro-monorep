import React from 'react'
import { cn } from '@sms/utils'

interface SpinnerProps {
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

export const Spinner: React.FC<SpinnerProps> = ({ className, size = 'md' }) => {
  return (
    <div
      className={cn('sms-spinner', `sms-spinner--${size}`, className)}
      role="status"
    >
      <span className="sms-spinner__circle"></span>
      <span className="sms-spinner__circle"></span>
      <span className="sms-spinner__circle"></span>
      <span className="sms-spinner__text">Загрузка...</span>
    </div>
  )
}
