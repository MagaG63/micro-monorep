import { Link, useLocation } from 'react-router-dom'
import { cn } from '@sms/utils'

const navItems = [
  { path: '/', label: 'Главная' },
  { path: '/admin', label: 'Админ' },
  { path: '/dashboard', label: 'Дашборд' },
  { path: '/profile', label: 'Профиль' },
]

export const Header = () => {
  const { pathname } = useLocation()

  return (
    <header className="header">
      <div className="header__inner">
        <Link to="/" className="header__logo">
          SMS Platform
        </Link>
        <nav className="header__nav">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                'header__nav-item',
                (item.path === '/'
                  ? pathname === '/'
                  : pathname.startsWith(item.path)) &&
                  'header__nav-item--active'
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}
