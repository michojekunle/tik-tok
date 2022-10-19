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

            </Link>
          ))
        }
      </div>
    </div>
  )
}

export default SuggestedAccounts
