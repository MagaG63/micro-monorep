import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { AdminApp } from './App'

describe('AdminApp', () => {
  it('рендерит список SMS-сообщений', () => {
    render(
      <MemoryRouter>
        <AdminApp />
      </MemoryRouter>
    )

    expect(screen.getByText('Админ-панель — SMS Сообщения')).toBeDefined()
    expect(screen.getByText(/Ваш код подтверждения/)).toBeDefined()
    expect(screen.getByText(/Заказ #456 доставлен/)).toBeDefined()
  })

  it('показывает статус сообщений', () => {
    render(
      <MemoryRouter>
        <AdminApp />
      </MemoryRouter>
    )

    expect(screen.getAllByText('delivered').length).toBeGreaterThan(0)
    expect(screen.getAllByText('failed').length).toBeGreaterThan(0)
  })
})
