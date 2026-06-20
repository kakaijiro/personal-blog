import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useTheme } from '@/hooks/useTheme'
import iconMoon from '@/assets/images/icon-moon.svg'
import iconSun from '@/assets/images/icon-sun.svg'
import iconMenu from '@/assets/images/icon-menu.svg'
import iconMenuClose from '@/assets/images/icon-menu-close.svg'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/blog', label: 'Blog' },
  { to: '/about', label: 'About' },
  { to: '/newsletter', label: 'Newsletter' },
]

export function Navbar() {
  const { theme, toggle } = useTheme()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-bg border-b border-border">
      <nav className="max-w-content mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
        <NavLink to="/" className="text-preset-5 font-extrabold text-text-primary">
          Paulina
        </NavLink>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-6">
          {navLinks.map(({ to, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  `text-preset-8 transition-colors ${
                    isActive
                      ? 'text-text-primary font-semibold'
                      : 'text-text-secondary hover:text-text-primary'
                  }`
                }
                style={({ isActive }) =>
                  isActive
                    ? { background: 'linear-gradient(transparent 78%, hsl(206 95% 78% / 0.45) 78%)' }
                    : {}
                }
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <button
            onClick={toggle}
            className="p-2 rounded-full hover:bg-bg-secondary transition-colors"
            aria-label="Toggle theme"
          >
            <img
              src={theme === 'dark' ? iconSun : iconMoon}
              alt={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              className="w-5 h-5"
            />
          </button>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-full hover:bg-bg-secondary transition-colors"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            <img
              src={menuOpen ? iconMenuClose : iconMenu}
              alt=""
              className="w-5 h-5"
            />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-border bg-bg">
          <ul className="max-w-content mx-auto px-4 py-4 flex flex-col gap-1">
            {navLinks.map(({ to, label }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  end={to === '/'}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `block px-3 py-2 rounded-lg text-preset-7 transition-colors ${
                      isActive
                        ? 'bg-bg-secondary text-text-primary font-semibold'
                        : 'text-text-secondary hover:bg-bg-secondary hover:text-text-primary'
                    }`
                  }
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  )
}
