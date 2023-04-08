import './globals.css'

export const metadata = {
  title: 'Fake Or Not',
  description: 'A simple fact checking app',
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png'
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
