"use client"

import { useSession } from 'next-auth/react'
import { useSearchParams } from "next/navigation"
import { useState, useEffect } from 'react'
import { getMessagesFromConversation } from "@utils/backend"
import Link from 'next/link'
import Conversation from '@components/Conversation'

const AConversation = () => {
  const { data: session, status } =  useSession()

  const searchParams = useSearchParams()
  const convId = searchParams.get("id")
  const [msgs, setMsgs] = useState([])

  useEffect(() => {
    const fetchMsgs = async () => {
        const data = await getMessagesFromConversation(convId, session?.id_token)
        setMsgs(data)
    }
    if (session?.user.id) fetchMsgs()
  }, [status]) // put the status here

  return (
    <div>
      <Conversation messages={msgs}></Conversation>
    </div>
  )
}

export default AConversation