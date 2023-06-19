// custom components
import { Navbar } from './components';

// next fonts
import { Nunito } from 'next/font/google';

// styles
import './globals.css'

// metadata infos
export const metadata = {
  title: 'Airbnb',
  description: 'Airbnb clone',
}

// setup fonts
const font = Nunito({
  subsets: ['latin'],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={font.className}
      >
        <Navbar />
        {children}
      </body>
    </html>
  )
}
