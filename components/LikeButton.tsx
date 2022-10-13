import React, { useState, useEffect } from 'react';
import { MdFavorite } from 'react-icons/md';
import useAuthStore from '../store/authStore';


const LikeButton = () => {
    const [alreadyLiked, setAlreadyLiked] = useState(true);
    const { userProfile } = useAuthStore();

    


  return (
    <div className='gap-6'>
        <div className="mt-4 flex justify-center cursor-pointer items-center flex-col">
            {alreadyLiked ? (
                <div className='bg-primary rounded-full p-2 md:p-4 text-[#F51997]' onChange={() => {handleDislike}}>
                    <MdFavorite className="text-lg md:text-2xl"/>
                </div>
            ): (
                <div className='bg-primary rounded-full p-2 md:p-4' onChange={() => {handleLike}>
                    <MdFavorite className="text-lg md:text-2xl"/>
                </div> 
            )}
        </div>
      LikeButton
    </div>
  )
}

export default LikeButton
