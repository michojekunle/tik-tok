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
import { GoVerified } from 'react-icons/go';

const Search = ({ videos }: { videos: Video[] }) => {

  const [isAccounts, setIsAccounts] = useState(false);
  const router = useRouter();
  const { searchTerm }: any = router.query;
  const { allUsers } = useAuthStore();

  const accounts = isAccounts ? 'border-b-2 border-black' : 'text-gray-400'; 
  const isVideos = !isAccounts ? 'border-b-2 border-black' : 'text-gray-400'; 
  const searchedAccounts = allUsers.filter((user: IUser) => user.userName.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <div className='w-full'>
      <div className='flex border-b-2 border-gray-200 bg-white w-full mt-10 gap-10 mb-10'>
        <p className={`text-xl font-semibold cursor-pointer mt-2 ${accounts}`} onClick={() => setIsAccounts(true)}>Accounts</p>
        <p className={`text-xl font-semibold cursor-pointer mt-2 ${isVideos}`} onClick={() => setIsAccounts(false)}>Videos</p>
      </div>
      {isAccounts ? (
        <div className='md:mt-16'>
          {searchedAccounts.length > 0 ? (
            searchedAccounts.map((user: IUser, idx) => (
              <Link href={`/profile/${user._id}`} key={idx}>
                <div className='flex gap-3 p-2 cursor-pointer border-b-2 border-gray-200 rounded'>
                  <div>
                    <Image 
                      src={user.image}
                      width={50}
                      height={50}
                      alt="user profile"
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
          ): <NoResults text={`No Account results for ${searchTerm}`}/>}
        </div>
      ) : (
        <div className ='md:mt-16 flex flex-wrap gap-6 md:justify-start'>
          {videos.length ? (
            videos.map((video: Video, idx) => (
              <VideoCard post={video} key={idx}/>
            ))
          ):  <NoResults text={`No video results for ${searchTerm}`}/>}
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