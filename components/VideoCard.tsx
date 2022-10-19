import React from 'react';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Video } from '../types';
import { NextPage } from 'next';
import { HiVolumeUp, HiVolumeOff } from 'react-icons/hi';
import { BsFillPlayFill, BsFillPauseFill, BsPlay } from 'react-icons/bs';
import { GoVerified } from 'react-icons/go';

interface IProps {
    post: Video;
}

const VideoCard: NextPage<IProps> = ({ post }) => {
    const [isHover, setIsHover] = useState(false)
    const [isPlaying, setIsPlaying] = useState(false)
    const [isVideoMuted, setIsVideoMuted] = useState(false)

    const videoRef = useRef<HTMLVideoElement>(null);
    const onVideoPress = () => {
        if(isPlaying) {
            videoRef?.current?.pause();
            setIsPlaying(false);
        } else {
            videoRef?.current?.play();
            setIsPlaying(true);
        }
    }

    useEffect(()=> {
        if(videoRef?.current) {
            videoRef.current.muted = isVideoMuted;
        }
    }, [isVideoMuted])
    
  return (
    <div className='flex flex-col border-b-2 border-grey-200 pb-6'>
        <div>
            <div className='font-semibold rounded cursor-pointer gap-3 p-2 flex'>
                <div className="md:w-16 md:h-16 h-10 w-10">
                    <Link href={`/profile/${post.postedBy._id}`}>
                        <>
                            <Image 
                                width={62}
                                height={62}
                                className='rounded-full'
                                src={post.postedBy.image}
                                alt='profile photo'
                                layout='responsive'   
                            />
                        </>
                    </Link>
                </div>
                <div>
                    <Link href={`/profile/${post.postedBy._id}`}>
                        <div className='flex gap-2 items-center '>
                            <p className='flex gap-2 items-center md:text-xs text-md font-bold text-primary'>{post.postedBy.userName} {'  '} <GoVerified className='text-blue-400 text-md' /></p>
                            <p className='capitalize text-primary text-xs text-gray-500 hidden md:block '>{post.postedBy.userName}</p>      
                        </div>
                    </Link>
                </div>
            </div>
        </div>
        <div className="lg:ml-20 flex gap-4 relative">
            <div 
                className='rounded-3xl'
                onMouseEnter={() => setIsHover(true)}
                onMouseLeave={() => setIsHover(false)}
            >
                <Link href={`/detail/${post._id}`}>
                    <video
                        loop
                        ref={videoRef}
                        src={post.video.asset.url}
                        className='lg:w-[600px] h-[300px] md:h-[400px] lg:h-[530px] w-[200px] cursor-pointer rounded-2xl bg-gray-100'
                    >

                    </video>                
                </Link>
                {
                    isHover && (
                        <div className='absolute bottom-6 left-8 cursor-pointer md:left-14 lg:left-0 flex gap-10 lg:justify-between p-3 w-[100px] md:w-[50px] '>
                            {
                                isPlaying ? (
                                    <button onClick={onVideoPress}>
                                        <BsFillPauseFill className='text-black text-2xl lg:text-4xl'/>
                                    </button>) : (
                                    <button onClick={onVideoPress}>
                                        <BsFillPlayFill className='text-black text-2xl lg:text-4xl'/>    
                                    </button>
                                )
                            }
                            {
                                 isVideoMuted ? (
                                    <button onClick={() => setIsVideoMuted(false)}>
                                        <HiVolumeOff className='text-black text-2xl lg:text-4xl'/>
                                    </button>) : (
                                    <button onClick={() => setIsVideoMuted(true)}>
                                        <HiVolumeUp className='text-black text-2xl lg:text-4xl'/>    
                                    </button>
                                )
                            }
                        </div>
                    )
                }
            </div>
        </div>
    </div>
  )
}

export default VideoCard
