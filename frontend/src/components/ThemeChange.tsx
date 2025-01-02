import React, { useEffect, useState } from 'react'
import { themeChange } from 'theme-change'

const ThemeChange: React.FC = () => {
  const themes = ['default', 'retro', 'cyberpunk', 'valentine', 'aqua']
  const [currentTheme, setCurrentTheme] = useState<string>(
    localStorage.getItem('theme') || 'default',
  )

  useEffect(() => {
    themeChange(false)
    document.documentElement.setAttribute('data-theme', currentTheme)
  }, [currentTheme])

  const handleThemeChange = (theme: string) => {
    setCurrentTheme(theme)
    localStorage.setItem('theme', theme)
  }

  return (
    <div className="dropdown dropdown-end">
      <label
        tabIndex={0}
        className="btn btn-ghost flex items-center gap-2"
        aria-label="Theme Selector">
        Theme
        <svg
          width="12px"
          height="12px"
          className="h-2 w-2 fill-current opacity-60"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 2048 2048">
          <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z" />
        </svg>
      </label>
      <ul
        tabIndex={0}
        className="dropdown-content menu bg-base-200 rounded-box z-10 w-48 p-2 shadow-lg">
        {themes.map(theme => (
          <li key={theme}>
            <button
              onClick={() => handleThemeChange(theme)}
              className={`btn btn-sm btn-ghost w-full justify-start ${
                currentTheme === theme ? 'font-bold text-primary' : ''
              }`}
              aria-label={`Set theme to ${theme}`}>
              {theme.charAt(0).toUpperCase() + theme.slice(1)}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ThemeChange
