import React from 'react'
import { cn } from '@sms/utils'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  className,
  ...props
}) => {
  return (
    <button
      className={cn(
        'sms-btn',
        `sms-btn--${variant}`,
        `sms-btn--${size}`,
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}
