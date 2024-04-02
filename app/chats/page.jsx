"use client"

import { useSession } from 'next-auth/react'
import { useSearchParams } from "next/navigation"
import { useState, useEffect } from 'react'
import { getMessagesFromChat } from "@utils/backend"
import Link from 'next/link'
import Chat from '@components/Chat'
import useWebSocket from 'react-use-websocket';
import { postMessageToChat } from '@utils/backend'
import Form from '@components/Form'


const ChatPage = () => {
  const { data: session, status } =  useSession()
  
  const searchParams = useSearchParams()
  const chatId = searchParams.get("id")
  const [msgs, setMsgs] = useState([])
  const { sendMessage, lastMessage, readyState } = useWebSocket(`${process.env.NEXT_PUBLIC_WS_URL}?token=${session?.id_token}`)
  const [msgFetched, setMsgFetched] = useState(false)

  // user input form below
  const [userMessage, setUserMessage] = useState("")
  const [submitting, setSubmitting] = useState(false)

  const continueConversation = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      let msg = await postMessageToChat(userMessage, session?.id_token, chatId)
      if (msg) {
        msg.keep_listening = false
        // add to messages
        setMsgs((msgs) => msgs.concat(msg))
        setUserMessage("")
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false)
    }
  }

  useEffect(() => {
    const fetchMsgs = async () => {
        const data = await getMessagesFromChat(chatId, session?.id_token)
        setMsgs(data)
    }

    if (session?.user.id) {
      if (!msgFetched) {
        fetchMsgs()
        setMsgFetched(true)
      }
      // normal message 
      //
      // "id": "ebe1f1b7-1ff2-4a1a-b0b0-e3ef0b3a4c91",
      // "content": " dear",
      // "keep_listening": true
      // starting message 
      // "id": "ebe1f1b7-1ff2-4a1a-b0b0-e3ef0b3a4c91",
      // "created_by": "063bb2ab-0a23-4146-9949-4647cefa26c5",
      // "created_by_name": "Hui Neng",
      // "created_at": "2024-04-02 06:44:28.379209+00:00",
      // "actual_content": "",
      // "chat_id": "3e3cead0-b007-4184-a2ec-47d7e06aaa95"
      // ending mesage
      // {
      //   "id": "e5c5e089-07de-4f79-94ab-363c82dba873",
      //   "content": "",
      //   "keep_listening": false
      // }

      if (lastMessage !== null) {
        let incomingMsg = null
        // try {
        // let imcomingMsg = lastMessage.data && JSON.parse(lastMessage.data)
        console.log(lastMessage.data)
        try {
          incomingMsg = JSON.parse(lastMessage.data)
        } catch (error) {
          // just to handle the welcome...
          incomingMsg = lastMessage.data
          console.log(incomingMsg.message)
        }
        
        // } catch (error) {
        //   incomingMsg = lastMessage
        // }
        
        if (incomingMsg.created_by_name) {
          // its a new message
          incomingMsg.keep_listening = true
          setMsgs((msgs) => msgs.concat(incomingMsg))
        } else if (incomingMsg.id) {
          // now we need to update one message in the msgs
          setMsgs(
            msgs => [...msgs].map(
              m => m.id === incomingMsg.id ? ({...m, actual_content: m.actual_content + incomingMsg.content, keep_listening: incomingMsg.keep_listening}) : m
            )
          )
        }
      }
    }
  }, [lastMessage, status])

  // setup the ws, and add msgs, but we need setContent


  // need to add the form in the return
  return (
    <div>
      <Chat messages={msgs} userId={session?.user.id}></Chat>
      <Form userMessage={userMessage} setUserMessage={setUserMessage} submitting={submitting} handleSubmit={continueConversation}></Form>
    </div>
  )
}

export default ChatPage