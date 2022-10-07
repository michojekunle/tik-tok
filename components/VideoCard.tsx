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
  return (
    <div className='flex flex-col border-b-2 border-grey-200 pb-6'>
        <div>
            <div className='font-semibold rounded cursor-pointer gap-3 p-2 flex'>
                <div className="md:w-16 md:h-16 h-10 w-10">
                    <Link href='/'>
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
                    <Link href='/'>
                        <div>
                            <p>{post.postedBy.userName}</p>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    </div>
  )
}

export default VideoCard
