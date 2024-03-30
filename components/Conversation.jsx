import React from 'react'
import Message from './Message'

const Conversation = ({ messages }) => {
  return (
    <div>
        {
            messages.map(
                (item, i) => {
                    return (<Message content={item.actual_content} key={i}/>)
                }
            )
        }
    </div>
  )
}

export default Conversation