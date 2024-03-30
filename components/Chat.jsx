import React from 'react'
import Message from './Message'

const Chat = ({ messages, userId }) => {
  return (
    <div>
        {
            messages.map(
                (item, i) => {
                    return (<Message msg={item} key={i} userId={userId}/>)
                }
            )
        }
    </div>
  )
}

export default Chat