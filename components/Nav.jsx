"use client"

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { signIn, signOut, useSession, getProviders } from 'next-auth/react'

const Nav = () => {
  const { data: session, status } =  useSession()
  const [providers, setProviders] = useState(null)
  const [toggleDropdown, setToggleDropDown] = useState(false)

  useEffect(() => {
    const setupProviders = async () => {
        const response = await getProviders()
        setProviders(response)
    }
    setupProviders()
  }, [status])

  return (
    <nav className="flex-between w-full mb-16 pt-3">
        <Link href="/" className="flex gap-2 flex-center">
            <Image
                src="/assets/images/logo.svg"
                width={32}
                height={32}
                alt='app logo'
                className='object-contain'
            ></Image>
            <p className='logo_text'>Social Lab</p>
        </Link>

        {/* desk navigation first, later on we focus on mobile */}
        <div className="sm:flex hidden">
          {session?.user ? (
            <div className='flex gap=3 md:gap-5'>
                {/* <Link href="/create-prompt" className='black_btn'>Start Chat</Link> */}
                <button type='button' onClick={signOut} className='outline_btn'>Sign Out</button>
                <Link href="/profile"><Image src={session?.user.image} width={37} height={37} className='rounded-full' alt='profile'></Image></Link>
            </div>
          ) : (
            <>
            {providers &&
             Object.values(providers).map((provider) => (
                <button type="button" key={provider.name} onClick={() => signIn(provider.id)} className='black_btn'>Sign In</button>
             )) }
            </>
          )}
        </div>

        {/* mobile nav */}
        <div className="sm:hidden flex relative">
            {session?.user ? (
                <div className='flex'>
                    <Image
                        src={session?.user.image}
                        width={37}
                        height={37}
                        className='rounded-full'
                        alt='profile'
                        onClick={() => setToggleDropDown(
                            (prev) => !prev
                        )}
                    ></Image>
                    {toggleDropdown && (
                        <div className='dropdown'>
                            {/* <Link href="/profile" className='dropdown_link' onClick={() => setToggleDropDown(false)}>
                                My Profile
                            </Link>
                            <Link href="/create-prompt"  className='dropdown_link'onClick={() => setToggleDropDown(false)} >
                                Start chat
                            </Link> */}
                            <button
                                type="button"
                                onClick={() => {setToggleDropDown(false); signOut()}}
                                className='mt-5 w-full black_btn'
                            >Sign Out</button>
                        </div>
                    )}
                </div>
            ) : (
            <>
                {providers &&
                Object.values(providers).map((provider) => (
                    <button type="button" key={provider.name} onClick={() => signIn(provider.id)} className='black_btn'>Sign In</button>
                )) }
            </>
            )}
        </div>

    </nav>
  )
}

export default Nav