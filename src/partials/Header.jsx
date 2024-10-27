import React, { useState, useEffect } from 'react';
import { ImHome, ImSearch, ImBook } from "react-icons/im";
import { FaUser } from "react-icons/fa6";
import { useLocation } from 'react-router-dom';

const Header = () => {
  const [query, setQuery] = useState('');
  const locationSearch = useLocation().search;
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('access'));

  useEffect(() => {
    const keyword = new URLSearchParams(locationSearch).get('q');
    if (keyword) {
      setQuery(keyword)
    }
    setIsAuthenticated(!!localStorage.getItem('access'));
  }, [locationSearch])

  return (
    <div className='flex flex-row bg-slate-900 pl-8 pr-8 font-mulish sticky top-0'>
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
      <div className='basis-1/4 flex flex-row items-center justify-end gap-4'>
        <form action='/book-search' className="p-4 overflow-hidden w-[50px] h-[50px] hover:w-[65%] bg-slate-400  shadow-[2px_2px_20px_rgba(0,0,0,0.08)] rounded-full flex group items-center hover:duration-300 duration-300">
          <button className="flex items-center justify-center">
            <ImSearch className='text-white text-[20px]'/>
          </button>
          <input name='q' type="text" autoComplete='off' 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border-b-2 outline-none bg-transparent w-full text-white font-normal mx-3"/>
        </form>

        <a href={isAuthenticated ? '/logout': 'login'} 
        className='text-white flex items-center p-4 overflow-hidden w-[50px] h-[50px] hover:w-[35%] bg-slate-400 shadow-[2px_2px_20px_rgba(0,0,0,0.08)] rounded-full group hover:duration-300 duration-300'>
          <div className='flex items-center justify-center'>
            <FaUser className='text-[20px]'/>
          </div>
          { isAuthenticated ? 
          <span className='outline-none bg-transparent w-full hidden group-hover:inline-block mx-3 transition-all duration-300 text-[18px]'>
            Logout
          </span>: 
          <span className='outline-none bg-transparent w-full hidden group-hover:inline-block mx-3 transition-all duration-300 text-[18px]'>
            Login
          </span>}
        </a>
      </div>
    </div>
  )
}

export default Header