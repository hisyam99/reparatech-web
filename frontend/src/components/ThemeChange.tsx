import React, { useLayoutEffect, useState } from 'react'
import { themeChange } from 'theme-change'

const ThemeChange: React.FC = () => {
  const themes = [
    // cek ./tailwind.config.ts di line 81 untuk contoh penerapannya
    'contoh_tema_kustom',
    'light',
    'dark',
    'cupcake',
    'bumblebee',
    'emerald',
    'corporate',
    'synthwave',
    'retro',
    'cyberpunk',
    'valentine',
    'halloween',
    'garden',
    'forest',
    'aqua',
    'lofi',
    'pastel',
    'fantasy',
    'wireframe',
    'black',
    'luxury',
    'dracula',
    'cmyk',
    'autumn',
    'business',
    'acid',
    'lemonade',
    'night',
    'coffee',
    'winter',
    'dim',
    'nord',
    'sunset',
  ]

  const [currentTheme, setCurrentTheme] = useState<string>('default')

  useLayoutEffect(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme') || 'default'
      setCurrentTheme(savedTheme)
      document.documentElement.setAttribute('data-theme', savedTheme)
      themeChange(false)
    }
  }, [])

  const handleThemeChange = (theme: string) => {
    setCurrentTheme(theme)
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', theme)
      document.documentElement.setAttribute('data-theme', theme)
    }
  }

  return (
    <div className="dropdown dropdown-end dropdown-bottom">
      <div tabIndex={0} role="button" className="btn btn-ghost">
        <div className="flex items-center space-x-2">
          <p>Theme</p>
          <svg
            width="12px"
            height="12px"
            className="inline-block fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 2048 2048">
            <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path>
          </svg>
        </div>
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content z-[1] max-h-60 w-52 overflow-y-auto rounded-box bg-base-300 p-2 shadow-2xl flex flex-col">
        {themes.map(themeOption => (
          <li key={themeOption}>
            <button
              onClick={() => handleThemeChange(themeOption)}
              className={`btn btn-ghost btn-sm btn-block justify-start ${
                currentTheme === themeOption ? 'font-bold text-primary' : ''
              }`}
              aria-label={`Set theme to ${themeOption}`}>
              {themeOption.charAt(0).toUpperCase() + themeOption.slice(1)}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ThemeChange
