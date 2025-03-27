import React from 'react'

type Props = {
    active: string;
}

export default function Sidebar({active}: Props) {
  return (
    <div className='hidden md:flex flex-col gap-4 inset-y-0 fixed left-0 w-40 pt-20 px-6 bg-gray-100 z-0'>
        <a href='/' className={`${active == 'details' ? 'font-semibold text-black' : 'text-gray-800'}`}>DETAILS</a> 
        <p className={`${active == 'about' ? 'font-semibold text-black' : 'text-gray-800'}`}>ABOUT</p> 
    </div> 
  )
}