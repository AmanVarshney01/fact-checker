import './globals.css'

export const metadata = {
  title: 'Fake Or Not',
  description: 'A simple fact checking app',
  icons: {
    icon: '/public/favicon.png',
    shortcut: '/public/favicon.png'
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
