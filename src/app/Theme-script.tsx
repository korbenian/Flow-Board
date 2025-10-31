'use client'
import Script from 'next/script'

export default function ThemeScript () {
  const script = `
    (function() {
      try {
        const theme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const html = document.documentElement;
        const colorScheme = theme === 'dark' || (!theme && prefersDark) ? 'dark' : 'light';
        html.classList.add(colorScheme);
        html.style.colorScheme = colorScheme;
      } catch (e) {}
    })();
  `

  return (
    <Script
      id='theme-script'
      strategy='beforeInteractive' // выполняется ДО React
      dangerouslySetInnerHTML={{ __html: script }}
    />
  )
}
