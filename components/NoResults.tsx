import React from 'react';
import { MdOutlineVideocamOff } from 'react-icons/md';
import {  BiCommentX } from 'react-icons/bi';


interface IProps {
    text: string
}

const NoResults = ({ text }: IProps) => {
  return (
    <div className='flex flex-col items-center justify-center h-full w-full'>
      <p className="text-center text-8xl">
        {
          text === 'No Comments yet!' 
          ? <BiCommentX /> 
          : <MdOutlineVideocamOff />
        }
      </p>  
      <p className='text-center text-2xl'>
        {text}  
      </p>    
    </div>
  )
}

export default NoResults
