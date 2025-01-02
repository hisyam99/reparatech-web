import type { Config } from 'tailwindcss'
import tailwindcssForm from '@tailwindcss/forms'
import daisyui from 'daisyui'

const daisyuiColorObj = require('daisyui/src/theming/index')

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        border: daisyuiColorObj['base-content'],
        input: daisyuiColorObj['base-content'],
        ring: daisyuiColorObj['base-content'],
        background: daisyuiColorObj['base-100'],
        foreground: daisyuiColorObj['base-content'],
        primary: {
          DEFAULT: daisyuiColorObj['primary'],
          foreground: daisyuiColorObj['primary-content'],
        },
        secondary: {
          DEFAULT: daisyuiColorObj['secondary'],
          foreground: daisyuiColorObj['secondary-content'],
        },
        destructive: {
          DEFAULT: daisyuiColorObj['error'],
          foreground: daisyuiColorObj['error-content'],
        },
        muted: {
          DEFAULT: daisyuiColorObj['base-300'],
          foreground: daisyuiColorObj['base-content'],
        },
        accent: {
          DEFAULT: daisyuiColorObj['accent'],
          foreground: daisyuiColorObj['accent-content'],
        },
        popover: {
          DEFAULT: daisyuiColorObj['base-100'],
          foreground: daisyuiColorObj['base-content'],
        },
        card: {
          DEFAULT: daisyuiColorObj['base-100'],
          foreground: daisyuiColorObj['base-content'],
        },
      },
      borderRadius: {
        lg: 'var(--rounded-btn)',
        md: 'calc(var(--rounded-btn) - 2px)',
        sm: 'calc(var(--rounded-btn) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [daisyui, tailwindcssForm, require('tailwindcss-animate')],
  daisyui: {
    themes: true,
    darkTheme: 'dark',
    base: true,
    styled: true,
    utils: true,
    prefix: '',
    logs: true,
    themeRoot: ':root',
  },
}
export default config

// const defaultTheme = require('tailwindcss/defaultTheme')

// module.exports = {
//   content: ['./src/**/*.js'],
//   darkMode: 'media',
//   theme: {
//     extend: {
//       fontFamily: {
//         sans: ['Nunito', ...defaultTheme.fontFamily.sans],
//       },
//     },
//   },
//   variants: {
//     extend: {
//       opacity: ['disabled'],
//     },
//   },
//   plugins: [require('@tailwindcss/forms')],
// }
