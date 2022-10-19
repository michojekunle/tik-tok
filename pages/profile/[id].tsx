import { useState, useEffect } from 'react'
import Image from 'next/image';
import { GoVerified } from 'react-icons/go';
import axios from 'axios';

import VideoCard from '../../components/VideoCard';
import NoResults from '../../components/NoResults';
import { IUser, Video } from '../../types';
import { BASE_URL } from '../../utils'; 

interface IProps {
    data: {
        user: IUser,
        userVideos: Video[],
        userLikedVideos: Video[]
    }
}

const Profile = ({ data }: IProps) => {
    const [showUserVideos, setShowUserVideos] = useState(true)
    const { user, userVideos, userLikedVideos } = data;

    const videos = showUserVideos ? 'border-b-2 border-black' : 'text-gray-400'; 
    const liked = !showUserVideos ? 'border-b-2 border-black' : 'text-gray-400'; 
    return (
        <div className='w-full'>
            <div className="flex gap-6 md:gap-10 mb-4 bg-white w-full">
              <div className='w-16 h-16 md:w-32 md:h-32'>
                  <Image 
                    src={user.image}
                    width={120}
                    height={120}
                    alt="user profile"
                    layout='responsive'
                    className='rounded-full'
                  />
                </div>
                <div className='flex flex-col justify-center'>
                  <p className='md:text-2xl tracking-wider text-primary font-bold lowercase items-center justify-center flex gap-1 '>
                    {user.userName.replaceAll(' ', '')}
                    <GoVerified className='text-blue-400'/>
                  </p>
                  <p className="capitalize md:text-xl  text-xs text-gray-400">
                    {user.userName}
                  </p>
                </div> 
            </div>            
            <div className='flex border-b-2 border-gray-200 bg-white w-full mt-10 gap-10 mb-10'>
              <p className={`text-xl font-semibold cursor-pointer mt-2 ${videos}`} onClick={() => setShowUserVideos(true)}>Videos</p>
              <p className={`text-xl font-semibold cursor-pointer mt-2 ${liked}`} onClick={() => setShowUserVideos(false)}>Liked</p>
            </div>

        </div>
    )
}

export const getServerSideProps = async ({ params: { id }} : { params: { id: string}}) => {
    const res = await axios.get(`${BASE_URL}/api/profile/${id}`)

    return {
        props: { data: res.data }
    }
}

export default Profile;