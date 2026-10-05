import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { DashboardApp } from './App'

describe('DashboardApp', () => {
  it('рендерит заголовок и статистику', () => {
    render(<DashboardApp />)

    expect(screen.getByText('📊 Дашборд SMS')).toBeDefined()
    expect(screen.getByText('Всего отправлено')).toBeDefined()
    expect(screen.getByText('Доставлено')).toBeDefined()
    expect(screen.getByText('% доставки')).toBeDefined()
  })

  it('показывает вкладки', () => {
    render(<DashboardApp />)

    expect(screen.getByText('Обзор')).toBeDefined()
    expect(screen.getByText('Сообщения')).toBeDefined()
  })
})
