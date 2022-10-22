import { useState} from 'react'
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import axios from 'axios';

import VideoCard from '../../components/VideoCard';
import NoResults from '../../components/NoResults';
import { IUser, Video } from '../../types';
import { BASE_URL } from '../../utils'; 
import useAuthStore from '../../store/authStore';

const Search = ({ videos }: { videos: Video[] }) => {

  const [isAccounts, setIsAccounts] = useState(false)

  const accounts = isAccounts ? 'border-b-2 border-black' : 'text-gray-400'; 
  const isVideos = !isAccounts ? 'border-b-2 border-black' : 'text-gray-400'; 

  return (
    <div className='w-full'>
      <div className='flex border-b-2 border-gray-200 bg-white w-full mt-10 gap-10 mb-10'>
        <p className={`text-xl font-semibold cursor-pointer mt-2 ${accounts}`} onClick={() => setIsAccounts(true)}>Accounts</p>
        <p className={`text-xl font-semibold cursor-pointer mt-2 ${isVideos}`} onClick={() => setIsAccounts(false)}>Videos</p>
      </div>
      {isAccounts ? (
        <div>
          Accounts
        </div>
      ) : (
        <div className ='md:mt-16'>
          Videos
        </div>
      )}
    </div>
  )
}

export const getServerSideProps = async ({ params: { searchTerm }} : { params: { searchTerm: string}}) => {
    const res = await axios.get(`${BASE_URL}/api/search/${searchTerm}`)

    return {
        props: { videos: res.data }
    }
}

export default Search