// custom components
import { Navbar, ClientOnly } from './components';

// custom modals
import { Modal, RegisterModal } from './components/Modals';

// next fonts
import { Nunito } from 'next/font/google';

// styles
import './globals.css'
import { ToasterProvider } from './providers';

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
        <ClientOnly>
          <ToasterProvider />
          <RegisterModal />
          <Navbar />
        </ClientOnly>
        {children}
      </body>
    </html>
  )
}
