import './globals.css'

export const metadata = {
  title: 'Fake Or Not',
  description: 'A simple fact checking app',
  icons: {
    icon: '/favicon.ico'

  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
