import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { FaCloudUploadAlt } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import axios from 'axios';
import { SanityAssetDocument } from '@sanity/client';
import { topics } from '../utils/constants';
import useAuthStore from '../store/authStore';
import { client } from '../utils/client';
import { BASE_URL } from '../utils';


const Upload = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [videoAsset, setVideoAsset] = useState<SanityAssetDocument | undefined>();
    const [wrongFileType, setWrongFileType] = useState(false);
    const [caption, setCaption] = useState('')
    const [category, setCategory] = useState(topics[0].name)
    const [savingPost, setSavingPost] = useState(false)
    const { userProfile }: { userProfile: any } = useAuthStore();
    const router = useRouter();

    const uploadVideo = async (e: any) => {
        const selectedFile = e.target.files[0];
        const fileTypes = ['video/mp4', 'video/webm', 'video/ogg'];
        if(fileTypes.includes(selectedFile.type)) {
            setIsLoading(true)
            client.assets.upload('file', selectedFile, {
                contentType: selectedFile.type,
                filename: selectedFile.name
            }) .then ((data) => {
                setVideoAsset(data);
                setIsLoading(false)
            })
        } else {
            setIsLoading(false);
            setWrongFileType(true);
        }
    }

    const handlePost = async () => {
        if(caption && videoAsset?._id && category) {
            setSavingPost(true)
            const document = {
                _type: 'post',
                caption,
                video: {
                    _type: 'file',
                    asset: {
                        _type: 'reference',
                        _ref: videoAsset?._id
                    }
                },
                userId: userProfile?._id,
                postedBy: {
                    _type: 'postedBy',
                    _ref: userProfile?._id
                },
                topic: category
            }

            await axios.post(`${BASE_URL}api/post`, document);
            router.push('/')
        }
    }


  return (
    <div className='flex w-full h-full absolute left-0 top-[80px] mb-10 pt-10 lg:pt-20 bg-[#F8F8F8] justify-center'>
        <div className="bg-white w-[60%] rounded-lg xl:h-[80vh] flex gap-6 flex-wrap justify-between items-center p-14 pt-6 ">
            <div>
                <div>
                    <p className='text-2xl font-bold' >Upload Video</p>
                    <p className='text-md text-gray-400 mt-1'>Post a video to your account</p>
                </div>
                <div className='border-dashed rounded-xl border-4 border-gray-200 flex flex-col justify-center items-center mt-10 outline-none w-[260px] h-[460px] cursor-pointer hover:border-red-300 hover:bg-gray-100 '>
                    {
                        isLoading ? (
                            <p>Uploading...</p>
                        ) : (
                            <div>
                                {
                                    videoAsset ? (
                                        <div>
                                            <video 
                                                src={videoAsset.url}
                                                loop
                                                controls
                                                className='rounded-xl h-[320px] mt-16 bg-black'
                                            >
                                            </video>
                                        </div>
                                    ) : (
                                        <label className='cursor-pointer'>
                                            <div className='flex flex-col justify-center items-center h-full'>
                                                <div className='flex flex-col items-center justify-center'>
                                                    <p>
                                                        <FaCloudUploadAlt className='text-gray-300 text-6xl'/>
                                                    </p>
                                                    <p className='text-xl font-semi-bold'>Upload Video</p>
                                                </div>
                                                <p className='text-gray-400 text-center text-sm mt-10 leading-10'>
                                                    MP4 or WebM or ogg <br/>
                                                    720 x 1280 or higher <br/>
                                                    Up to ten minutes <br/>
                                                    Less than 2 GB
                                                </p>
                                                <p className='bg-[#F51997] text-white text-center mt-10 rounded p-2 text-md font-medium w-52 outline-none'>
                                                    Select File
                                                </p>
                                            </div>
                                            <input 
                                                type="file" 
                                                name='upload-video' 
                                                className='w-0 h-0' 
                                                onChange={uploadVideo}
                                            />
                                        </label>
                                    )}
                            </div>
                        )}
                        {wrongFileType && (
                            <p className='text-xl text-red-400  text-center font-semibold mt-4 w-[250px]'>
                                Please Select A video file
                            </p>
                        )}
                </div>
            </div>
                <div className='flex flex-col gap-3 pb-10'>
                    <label htmlFor="" className='text-md font-medium'>Caption</label>
                    <input 
                        type="text" 
                        value={caption}
                        onChange={e => setCaption(e.target.value)}
                        className='rounded outline-none text-md border-2 border-gray-200 p-2'
                    />
                    <label htmlFor="" className='text-md font-medium'>Choose A Category</label>
                    <select
                        name="" 
                        onChange={e => setCategory(e.target.value)}
                        className='outline-none border-2 border-gray-200 bg-white text-gray-700 rounded text-md capitalize lg:p-4 p-2 hover:bg-slate-300'
                    >
                        { topics.map(topic => (
                            <option 
                                key={topic.name} 
                                value={topic.name}
                            >
                                {topic.name}

                            </option>
                        ))
                        }
                    </select>
                    <div className='flex gap-6 mt-10'>
                        <button
                            // onClick={}
                            type="button"
                            className='border-gray-300 border-2 text-md font-medium p-2 rounded w-28 lg:w-44'
                        >
                            Discard
                        </button>
                        <button
                            onClick={handlePost}
                            type="button"
                            className='bg-[#F51970] text-white border-gray-300 border-2 text-md font-medium p-2 rounded w-28 lg:w-44'
                        >
                            Post
                        </button>
                    </div>
                </div>
        </div>
    </div>
  )
}

export default Upload
