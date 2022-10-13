import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import  { GoogleLogin, googleLogout } from '@react-oauth/google'
import { AiOutlineLogout } from 'react-icons/ai'
import { BiSearch } from 'react-icons/bi'
import { IoMdAdd } from 'react-icons/io'


import logo from '../utils/tiktik-logo.png'
import { createOrGetUser } from '../utils'
import useAuthStore from '../store/authStore'

const Navbar = () => {
  const user = false

  const { userProfile, addUser, removeUser } = useAuthStore();
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
        <div>SEARCH</div>
        <div>
          {
            userProfile ? (
              <div className='flex gap-5 md:gap-10'>
                <Link href='/upload'>
                  <button className='border-2 px-2 md:px-4 flex text-md items-center gap-2 font-semibold'>
                    <IoMdAdd className='text-xl'/> {` `}
                    <span className='hidden md:block'>Upload</span>
                  </button>
                </Link>
                {userProfile.image && (
                  <Link href='/'>
                    <>
                        <Image 
                            width={40}
                            height={40}
                            className='rounded-full cursor-pointer'
                            src={userProfile.image}
                            alt='profile photo'   
                        />
                    </>
                  </Link>
                )}
                <button 
                  type='button' 
                  className='px-2'
                  onClick={() => {
                    googleLogout();
                    removeUser();
                  }}
                >
                  <AiOutlineLogout color='red' fontSize={21}/>
                </button>


              </div>
            ) :(
              <GoogleLogin
                onSuccess={(response) => createOrGetUser(response, addUser)}
                onError={() => console.log('Error')}
              />
            )
          } 
        </div>
    </div>
  )
}

export default Navbar
