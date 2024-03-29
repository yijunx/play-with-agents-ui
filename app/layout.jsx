import '@styles/globals.css'
import Nav from '@components/Nav'
import Provider from '@components/Provider'
import { Suspense } from 'react'

export const metadata = {
    title: "SocialLab",
    description: "Talk to pals"
}

function RootLayout({ children }) {
  return (
    <html lang='en'>
        <body>
            <Provider>
                <div className='main'>
                    <div className='gradient' />
                </div>
                <main className='app'>
                    <Nav></Nav>
                    <Suspense fallback={<div>Loading...</div>}>
                        {children}
                    </Suspense>
                </main>
            </Provider>
        </body>
    </html>
  )
}

export default RootLayout