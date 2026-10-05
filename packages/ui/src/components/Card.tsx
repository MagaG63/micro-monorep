import React from 'react'
import { cn } from '@sms/utils'

interface CardProps {
  className?: string
  children: React.ReactNode
}

export const Card: React.FC<CardProps> = ({ className, children }) => {
  return <div className={cn('sms-card', className)}>{children}</div>
}

interface CardHeaderProps {
  className?: string
  children: React.ReactNode
}

export const CardHeader: React.FC<CardHeaderProps> = ({ className, children }) => {
  return (
    <div className={cn('sms-card__header', className)}>{children}</div>
  )
}

interface CardBodyProps {
  className?: string
  children: React.ReactNode
}

export const CardBody: React.FC<CardBodyProps> = ({ className, children }) => {
  return <div className={cn('sms-card__body', className)}>{children}</div>
}
