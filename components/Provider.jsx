import React from 'react'
import { SessionProvider } from 'next-auth/react'

const Provider = ({ children, session }) => {
// this is high order componenet
  return (
    <div>Provider</div>
  )
}

export default Provider