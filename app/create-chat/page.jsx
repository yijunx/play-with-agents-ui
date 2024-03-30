"use client"


import Form from '@components/Form'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { postChat } from '@utils/backend'
import { useSession } from 'next-auth/react'

const CreateConversation = () => {
  const router = useRouter()
  const [audience, setAudience] = useState(["monk", "professor", "engineer"])
  const [userMessage, setUserMessage] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const { data: session } =  useSession()

  const startConversation = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      const msg = await postChat(userMessage, session?.id_token)
      if (msg) {
        router.push(`/chats?id=${msg.chat_id}`)
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div>
        {session?.user ? (
            <div>
                <Form
                    audience={audience}
                    setAudience={setAudience}
                    userMessage={userMessage}
                    setUserMessage={setUserMessage}
                    submitting={submitting}
                    handleSubmit={startConversation}
                ></Form>
            </div>
        ): (
            <div>
                <div>pls login first</div>
            </div>
        )}
    </div>
  )
}

export default CreateConversation