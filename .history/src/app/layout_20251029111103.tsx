import './globals.css'
import Providers from '../app/Providers'
import { ThemeProvider } from './Themeprovider'
import ThemeScript from './Theme-script'

export const metadata = {
  title: 'My App',
  description: 'Dashboard App'
}

export default function RootLayout ({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en' suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body>
        <Providers>
          <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
            {children}
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  )
}
