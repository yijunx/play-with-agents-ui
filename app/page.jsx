import Link from "next/link"

function Home() {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        Talk to Pals
        <br className="max-md:hidden" />
        <span className="orange_gradient text-center">AI-POWERED AGENTS</span>
      </h1>

      <p className="desc text-center">This is just to help you communicate, pal</p>
      <Link href="/create-chat">Start</Link>
    </section>
  )
}

export default Home