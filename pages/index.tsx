import type { NextPage } from 'next'
import axios from 'axios';


const Home: NextPage = () => {
  return (
    <h1 className="text-3xl font-bold underline">
      Hello world!
    </h1>
  )
}

export const getServerSideProps = async () => {
  const response = await axios.get(`http://localhost:3000/api/post`);
  console.log(response.data.name);

  return {
    props: {}
  }
} 

export default Home