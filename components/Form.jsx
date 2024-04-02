import React from 'react'
import Link from 'next/link'

const Form = ({
  // audience,
  // setAudience,
  userMessage,
  setUserMessage,
  submitting,
  handleSubmit
}) => {


  return (
    <section className='w-full min-w-600'>
      <form onSubmit={handleSubmit} className='mt-8 w-full gap-7 bg-green-100'>
        <div>
          what do you want to say
        </div>

        <textarea type="text" cols="60" rows="2"
        value={userMessage}
        onChange={(e) => {
          setUserMessage(e.target.value)
        }} />
        <div className="flex-end mx-3 my-5 gap-4">
          <Link href="/" className='text-gray-500 text-sm'>Cancel</Link>
          <button type='submit' disabled={submitting} className='px-5 py-1.5 text-sm bg-green-400 rounded-full text-white'>
            {submitting ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>


    </section>
  )
}

export default Form