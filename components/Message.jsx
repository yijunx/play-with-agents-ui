import React from 'react'

const Message = ({ msg, userId }) => {

  const agentColor = new Map()
  
  agentColor["Prof. Boffin"] = "red"
  agentColor["Hui Neng"] = "green"
  agentColor["George Michael"] = "blue"

  let who = "" 
  let color = ""
  if (userId === msg.created_by) {
    who = "You"
    color = "gray"
  } else {
    // backend here needs to directly give agent color
    who = msg.created_by_name
    color = agentColor[who]
  }
  return (
    <div className={`border-2 bg-${color}-100`}>{who}: {msg.actual_content.split(":").pop()}</div>
  )
}

export default Message