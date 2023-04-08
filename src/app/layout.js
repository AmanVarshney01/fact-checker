import './globals.css'

export const metadata = {
  title: 'News Verifier',
  description: 'A simple fact checking app',
  icons: {
    icon: '/favicon.ico'

  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={" bg-[#f1f1f1]"}>
        {children}
      </body>
    </html>
  )
}
