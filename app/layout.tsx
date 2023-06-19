// custom actions
import { getCurrentUser } from './actions';

// custom components
import { Navbar, ClientOnly } from './components';

// custom modals
import { LoginModal, RegisterModal, RentModal } from './components/Modals';

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

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // get current user
  const currentUser = await getCurrentUser();


  return (
    <html lang="en">
      <body
        className={font.className}
      >
        <ClientOnly>
          <ToasterProvider />
          <LoginModal />
          <RegisterModal />
          <RentModal />
          <Navbar currentUser={currentUser} />
        </ClientOnly>
        {children}
      </body>
    </html>
  )
}
