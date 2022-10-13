import type { NextPage } from 'next'
import axios from 'axios';
import { Video } from '../types'
import NoResults from '../components/NoResults';
import VideoCard from '../components/VideoCard';
import { BASE_URL } from '../utils';


interface IProps {
  videos: Video[]
}

const Home = ({ videos }: IProps) => {
  console.log(videos)
  return (
    <h1 className="text-3xl font-bold underline">
      <div className="videos flex flex-col gap-10 h-full ">
        {videos.length ? (
          videos.map((video: Video) => (
            <VideoCard post={video} key={video._id}/>
          ))
        ) : (
          <NoResults text={'No Videos'}/>
        )}
      </div>
    </h1>
  )
}

export const getServerSideProps = async () => {
  const { data } = await axios.get(`${BASE_URL}/api/post`);

  return {
    props: {
      videos: data
    }
  }
} 

export default Home