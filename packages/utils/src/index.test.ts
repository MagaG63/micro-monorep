import { describe, it, expect } from 'vitest'
import {
  formatDate,
  formatPhone,
  isValidEmail,
  isValidPhone,
  cn,
  percentage,
  generateId,
} from './index'

describe('formatDate', () => {
  it('форматирует ISO дату в ru-RU', () => {
    const result = formatDate('2024-01-15T10:00:00Z')
    expect(result).toContain('15')
    expect(result).toContain('01')
    expect(result).toContain('2024')
  })
})

describe('formatPhone', () => {
  it('форматирует 11-значный номер', () => {
    const result = formatPhone('79161234567')
    expect(result).toBe('+7 (916) 123-45-67')
  })

  it('возвращает оригинал для короткого номера', () => {
    const result = formatPhone('123')
    expect(result).toBe('123')
  })
})

describe('isValidEmail', () => {
  it('валидный email', () => {
    expect(isValidEmail('user@example.com')).toBe(true)
  })

  it('невалидный email', () => {
    expect(isValidEmail('not-an-email')).toBe(false)
  })
})

describe('isValidPhone', () => {
  it('валидный 11-значный номер', () => {
    expect(isValidPhone('79161234567')).toBe(true)
  })

  it('невалидный номер', () => {
    expect(isValidPhone('123')).toBe(false)
  })
})

describe('cn', () => {
  it('объединяет строки', () => {
    expect(cn('a', 'b', 'c')).toBe('a b c')
  })

  it('игнорирует false и undefined', () => {
    expect(cn('a', false, undefined, 'b')).toBe('a b')
  })

  it('работает с объектом', () => {
    expect(cn({ active: true, disabled: false })).toBe('active')
  })
})

describe('percentage', () => {
  it('вычисляет процент', () => {
    expect(percentage(50, 200)).toBe(25)
  })

  it('ноль при total=0', () => {
    expect(percentage(0, 0)).toBe(0)
  })
})

describe('generateId', () => {
  it('генерирует строку длиной 7', () => {
    const id = generateId()
    expect(typeof id).toBe('string')
    expect(id.length).toBe(7)
  })

  it('генерирует уникальные значения', () => {
    const ids = new Set(Array.from({ length: 100 }, () => generateId()))
    expect(ids.size).toBeGreaterThan(90)
  })
})
