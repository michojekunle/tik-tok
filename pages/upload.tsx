import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { FaCloudUploadAlt } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import axios from 'axios';
import { SanityAssetDocument } from '@sanity/client';

import useAuthStore from '../store/authStore';
import { client } from '../utils/client';


const Upload = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [videoAsset, setVideoAsset] = useState<SanityAssetDocument | undefined>();
    const [wrongFileType, setWrongFileType] = useState(false);

    const uploadVideo = async (e: any) => {
        const selectedFile = e.target.files[0];
        const fileTypes = ['video/mp4', 'video/webm', 'video/ogg'];
        if(fileTypes.includes(selectedFile.type)) {
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
  return (
    <div className='flex w-full h-full'>
        <div className="bg-white rounded-lg">
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
                                    )

                                }
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
      
    </div>
  )
}

export default Upload
