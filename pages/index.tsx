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


export const getServerSideProps = async ({
  query: { topic }
}: {
  query: { topic: string }
}) => {
  console.log(topic)
  let response = null;

  if(topic){
    response = await axios.get(`${BASE_URL}/api/discover/${topic}`);
  } else {
    response = await axios.get(`${BASE_URL}/api/post`);
  }

  return {
    props: {
      videos: response?.data
    }
  }
} 

export default Home