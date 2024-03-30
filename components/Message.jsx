import React from 'react'

const Message = ({ msg, userId }) => {

  let who = "" 
  if (userId === msg.created_by) {
    who = "You"
  } else {
    who = msg.created_by_name
  }
  return (
    <div>{who}: {msg.actual_content}</div>
  )
}

export default Message