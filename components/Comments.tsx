import React, { Dispatch, SetStateAction } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { GoVerified } from 'react-icons/go';
import useAuthStore from '../store/authStore';
import NoResults from './NoResults';
import { IUser } from '../types';

interface IProps {
  isPostingComment: Boolean,
  comment: string,
  setComment: Dispatch<SetStateAction<string>>,
  addComment: (e: React.FormEvent) => void,
  comments: any[];
}

interface IComment {
  comment: string,
  length?: number,
  _key: string,
  postedBy: { _ref: string; _id: string }
}


const Comments = ({ comment, addComment, setComment, comments, isPostingComment}: IProps ) => {
  const { userProfile, allUsers } = useAuthStore();

  return (
    <div className='border-t-2 border-gray-200 pt-4 mt-10 mb-10 px-10 bg-[#F8F8F8] border-b-2 lg:pb-0 pb-[100px] relative'>
        <div className=" overflow-scroll lg:h-[475px] w-[400px] ">
          {comments?.length ? (
            <div>
              {comments.map((item, idx) => (
                <>
                  {allUsers.map((user :IUser) => (
                    user._id === (item.postedBy._id || item.postedBy._ref) && (
                      <div className='p-2 items-center' key={idx}>
                        <Link href={`/profile/${user._id}`}>
                          <div className='flex gap-3 items-start'>
                            <div className='w-8 h-8'>
                              <Image 
                                src={user.image}
                                width={34}
                                height={34}
                                alt="user profile"
                                layout='responsive'
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
                        <div>
                          <p className='text-sm p-2 ml-2 text-gray-500'>{item.comment}</p>                         
                        </div>
                      </div>
                    )
                  ))}
                </>
              ))}
            </div> 
            ) : (
              <NoResults text='No Comments yet!'/>
            )}
        </div>
        {userProfile && (
            <div className="absolute left-0 bottom-0 pb-6 px-2 md:px-10">
              <form onSubmit={addComment} className='flex gap-4'>
                <input 
                  type="text"
                  value={comment} 
                  onChange={(e) => {setComment(e.target.value)}}
                  placeholder='Add a comment'
                  className='bg-primary px-6 py-4 text-md font-medium border-2 w-[200px] md:w-[300px] lg:w-[330px] border-gray-100 focus:border-gray-300 flex-1 rounded-lg focus:outline-none'
                />
                <button className='text-md text-gray-400' onClick={addComment}>
                  {
                    isPostingComment ? 'Commenting' : 'Comment'
                  }
                </button>
              </form>
            </div>
          )}
    </div>
  )
}

export default Comments
