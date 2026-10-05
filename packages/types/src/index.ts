// Общие TypeScript типы для всего монорепозитория

// ─── Пользователь ────────────────────────────────────────────────────────────
export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  createdAt: string
}

export type UserRole = 'admin' | 'manager' | 'user'

// ─── SMS Сообщение ───────────────────────────────────────────────────────────
export interface SmsMessage {
  id: string
  phone: string
  text: string
  status: SmsStatus
  sentAt: string
  userId: string
}

export type SmsStatus = 'pending' | 'sent' | 'failed' | 'delivered'

// ─── Статистика ──────────────────────────────────────────────────────────────
export interface Statistics {
  totalSent: number
  totalDelivered: number
  totalFailed: number
  deliveryRate: number
  byDate: DailyStat[]
}

export interface DailyStat {
  date: string
  sent: number
  delivered: number
  failed: number
}

// ─── Пагинация ───────────────────────────────────────────────────────────────
export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

// ─── API Ответ ───────────────────────────────────────────────────────────────
export interface ApiResponse<T> {
  success: boolean
  data: T
  error?: string
}

// ─── Маршруты микрофронтендов ────────────────────────────────────────────────
export type MicrofrontendRoute = '/admin/*' | '/dashboard/*' | '/profile/*'

// ─── Конфигурация Remote модуля ──────────────────────────────────────────────
export interface RemoteConfig {
  url: string
  scope: string
  module: string
}
