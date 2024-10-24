import React from 'react'
import { ImHome } from "react-icons/im";
import { ImBook } from "react-icons/im";

const Header = () => {
  return (
    <div className='flex flex-row bg-pink-500 pl-8 pr-8 font-mulish sticky top-0'>
      <div className='basis-1/4 pt-3 pb-3'>
        <img className='h-[50px]'
          src="https://raw.githubusercontent.com/PacktPublishing/Web-Development-with-Django-Second-Edition/refs/heads/main/Chapter07/Exercise7.03/bookr/reviews/static/reviews/logo.png"
          alt="Logo" />
      </div>
      <div className='basis-2/4 flex flex-row items-center justify-between'>
        <a href='/' className='h-[74px] flex items-center gap-2'>
          <ImHome className='text-[20px] text-white' />
          <div className='text-[20px] text-white'>Home</div>
        </a>
        <a href="/books" className='h-[74px] flex items-center gap-2'>
          <ImBook className='text-[20px] text-white' />
          <div className='text-[20px] text-white'>Bookcase</div>
        </a>
      </div>
      <div className='basis-1/4'></div>
    </div>
  )
}

export default Header