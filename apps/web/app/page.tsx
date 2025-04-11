import Link from 'next/link'
import React from 'react'

const Home = () => {
  return (
    <section className='w-full min-h-screen bg-white flex flex-col justify-center items-center'>
      Talkr
      <Link href="/sign-in">Click here</Link>
    </section>
  )
}

export default Home