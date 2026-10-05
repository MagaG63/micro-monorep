import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import App from './App'

describe('ProfileApp', () => {
  it('рендерит профиль пользователя', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    )

    expect(screen.getByText('👤 Профиль пользователя')).toBeDefined()
    expect(screen.getByText('Иван Петров')).toBeDefined()
    expect(screen.getByText('ivan@example.com')).toBeDefined()
  })

  it('показывает кнопки действий', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    )

    expect(screen.getByText('Редактировать')).toBeDefined()
    expect(screen.getByText('Выйти')).toBeDefined()
  })
})
