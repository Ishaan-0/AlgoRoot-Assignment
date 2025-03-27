"use client";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleUser, faEnvelope, faTrash, faSignOut } from '@fortawesome/free-solid-svg-icons'
import React, { useState, useEffect } from 'react'

type Props = {
  user: {
    name: string;
    email: string;
  }
}

export default function Navbar({user}: Props) {

  const [isOpen, setIsOpen] = useState(false);
  function deleteHandle() {
    localStorage.removeItem('username');
    localStorage.removeItem('email');
    window.location.href = '/login';
  }
  function logoutHandle() {
    localStorage.clear()
    window.location.href = '/login';
  }

  return (
    <div className='flex items-center justify-between px-4 inset-x-0 fixed bg-white z-10'>
      <p className='flex gap-4 font-semibold text-2xl items-center'>
      <img src="/algo_root_logo.png" alt="logo for algo root" className='h-16 w-auto' />
      <span className='hidden md:block'>AlgoRoot</span>
      </p>
      <div onClick={()=>{setIsOpen(!isOpen)}} className='relative flex gap-4 rounded-md bg-gray-100 p-2 w-64 items-center cursor-pointer'>
        <FontAwesomeIcon icon={faCircleUser} className='w-8 h-8 text-red-400' /> 
        <p>{user.name}</p>
        <div className={`absolute flex flex-col gap-3 top-12 inset-x-0 bg-gray-100 rounded-md p-2 transition-all ${isOpen ? 'clip-open' : 'clip-close'}`}>
          <p className='flex items-center gap-4'><FontAwesomeIcon icon={faEnvelope} className="w-8 h-8 text-red-400" /> {user.email}</p> 
          <button onClick={deleteHandle}  className='flex items-center gap-4'><FontAwesomeIcon icon={faTrash} className="w-8 h-8 text-red-400" /> Delete Account</button>
          <button onClick={logoutHandle} className='flex gap-4 p-2 bg-red-400 rounded-md justify-center items-center text-white'><FontAwesomeIcon icon={faSignOut} className="w-8 h-8" /> Log Out</button>
        </div>
      </div>
    </div>
  )
}