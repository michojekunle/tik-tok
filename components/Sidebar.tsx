import React from 'react'
import { NextPage } from 'next'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { GoogleLogin, GoogleLogout } from 'react-google-login'
import { AiFillHome, AiOutlineMenu } from 'react-icons/ai'
import { ImCancelCircle } from 'react-icons/im'

const Sidebar = () => {
    const [showSidebar, setShowSidebar] = useState(false)
  return (
    <div>
      <div 
        className='block xl:hidden m-2 mt-3 ml-4 text-xl'
        onClick={() => setShowSidebar((prev) => !prev)}
      >
        {
            showSidebar ? <ImCancelCircle /> : <AiOutlineMenu/>
        }
      </div>
    </div>
  )
}

export default Sidebar
