import ClientOnly from './components/ClientOnly';
import Footer from './components/Footer';
import Header from './components/Header';
import SigninModal from './components/modals/SigninModal';
import SignupModal from './components/modals/SignupModal';
import AuthContext from './context/AuthContext';
import ToasterContext from './context/ToasterProvider';

import './globals.css';

import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
    title: 'Precious Preemie',
    description: 'A community for premature baby parents',
};

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <AuthContext>
                    <ClientOnly>
                        <SigninModal />
                        <SignupModal />
                        <ToasterContext />
                        <Header />
                        <Footer />
                    </ClientOnly>
                </AuthContext>
                <div className="pb-20 pt-28">{children}</div>
            </body>
        </html>
    );
}
