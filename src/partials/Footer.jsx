import React from 'react'
import { SiReact, SiDjango } from "react-icons/si";

const Footer = () => {
  return (
    <div className='bg-slate-900 h-[60px] flex gap-2 justify-center'>
      <span className='text-white flex items-center'>© Bản quyền thuộc về </span>
      <a href="/" target='_blank' className='text-white flex items-center justify-center gap-1'>
        <SiReact className='text-[#8cf8f8] text-[18px]'/> 
          <span className='flex'>
            <span className='text-[#44b78b]'>Cao Ti</span> <span className='text-[#8cf8f8]'>ến Hải</span>
          </span> <SiDjango className='text-[#44b78b]'/>
      </a>
    </div>
  )
}

export default Footer