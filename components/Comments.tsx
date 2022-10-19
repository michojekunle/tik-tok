import React, { Dispatch, SetStateAction } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { GoVerified } from 'react-icons/go';
import useAuthStore from '../store/authStore';
import NoResults from './NoResults';

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
  const { userProfile } = useAuthStore();

  return (
    <div className='border-t-2 border-gray-200 pt-4 px-10 bg-[#F8F8F8] border-b-2 lg:pb-0 pb-[100px]'>
        <div className="overflow-scroll lg:h-[475px]">
          {comments?.length ? (
            <div>Videos:{comments.length}</div> 
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
                className='bg-primary px-6 py-4 text-md font-medium border-2 w-[250px] md:w-[700px] lg:w-[350px] border-gray-100 focus:border-gray-300 flex-1 rounded-lg focus:outline-none'
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
