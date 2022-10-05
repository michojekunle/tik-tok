import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { GoogleLogin, GoogleLogout } from 'react-google-login'
import { AiOutlineLogout } from 'react-icons/ai'
import { BiSearch } from 'react-icons/bi'
import { IoMdAdd } from 'react-icons/io'

import logo from '../utils/tiktik-logo.png'

const Navbar = () => {
  return (
    <div className='w-full flex justify-between items-center border-b-2 border-grey-200 py-5 px-4 '>
        <Link href='/'>
            <div className='w-[100px] md:w-[130px] md:h-[30px] h-[30px] '>
                <Image 
                    className='cursor-pointer'
                    src={logo}
                    alt="Tik-Tik"
                    layout='responsive'
                />
            </div>
        </Link>
    </div>
  )
}

export default Navbar
