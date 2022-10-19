import React, {  useEffect } from 'react';
import Image from 'next/image'
import Link from 'next/link'
import { GoVerified } from 'react-icons/go';

import useAuthStore from '../store/authStore';
import { IUser } from '../types';


const SuggestedAccounts = () => {
  const { fetchAllUsers, allUsers } = useAuthStore();

  useEffect(() => {
    fetchAllUsers();
  }, [fetchAllUsers]);

  return (
    <div className='xl:border-b-2 border-grey-200 pb-4'>
      <p className='hidden font-semibold m-3 mt-3 xl:block text-grey-500'> 
        SuggestedAccounts
      </p> 
      <div>
        {
          allUsers.slice(0, 6).map((user: IUser) => (
            <Link href={`/profile/${user._id}`} key={user._id}>
              <div className="flex gap-3 hover:bg-primary p-2 cursor-pointer font-semibold">
                <div className='w-8 h-8'>
                  <Image 
                    src={user.image}
                    width={34}
                    height={34}
                    alt="user profile"
                    layout='responsive'
                    className='rounded-full'
                  />
                </div>
                <div className="hidden xl:block">
                  <p className='text-primary font-bold lowercase items-center flex gap-1 '>
                    {user.userName.replaceAll(' ', '')}
                    <GoVerified className='text-blue-400'/>
                  </p>
                  <p className="capitalize text-xs text-gray-400">
                    {user.userName}
                  </p>
                </div>
              </div>
            </Link>
          ))
        }
      </div>
    </div>
  )
}

export default SuggestedAccounts
