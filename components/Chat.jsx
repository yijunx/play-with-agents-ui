import Message from './Message'
import { useRef, useEffect } from "react";

const Chat = ({ messages, userId }) => {
  // here userId is really the userId
  const ref = useRef();

  useEffect(() => {
    if (messages.length) {
      ref.current?.scrollIntoView(
        {
          behavior: "smooth",
          block: "end"
        }  
      )
    }
  }, [messages.length])

  return (
    <div className="overflow-y-scroll scrollbar">
      <div className='h-2 bg-black'/>
        {
            messages.map(
                (item, i) => {
                    return (<Message msg={item} key={i} userId={userId}/>)
                }
            )
        }
        <div ref={ref} className='h-2 bg-black'/>
    </div>
  )
}

export default Chat