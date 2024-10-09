import React from 'react'
import Link from 'next/link'

export default function Nav() {
  return (
    <nav className='bg-yellow-300 flex'>
      <Link href='/'>Home</Link>
      <Link href='/ebooks'>Ebooks</Link>
    </nav>
  )
}
