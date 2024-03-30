"use client"

import { useSession } from 'next-auth/react'
import { useSearchParams } from "next/navigation"
import { useState, useEffect } from 'react'
import { getMessagesFromChat } from "@utils/backend"
import Link from 'next/link'
import Chat from '@components/Chat'

const AConversation = () => {
  const { data: session } =  useSession()

  const searchParams = useSearchParams()
  const chatId = searchParams.get("id")
  const [msgs, setMsgs] = useState([])

  useEffect(() => {
    const fetchMsgs = async () => {
        const data = await getMessagesFromChat(chatId, session?.id_token)
        setMsgs(data)
    }
    if (session?.user.id) fetchMsgs()
  }, [])

  return (
    <div>
      <Chat messages={msgs} userId={session?.user.id}></Chat>
    </div>
  )
}

export default AConversation