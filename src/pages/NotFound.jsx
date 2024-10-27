import React from 'react'
import '../style/not-found.css'

const NotFound = () => {
  return (
    <div className='bg-slate-400 font-mulish text-white'>
      <h1 className='text-[40px] bg-slate-600 text-white'>Not Found</h1>
      <br />
      <div className='flex justify-center'>
        <div aria-label="Orange and tan hamster running in a metal wheel" role="img" class="wheel-and-hamster">
          <div class="wheel"></div>
          <div class="hamster">
            <div class="hamster__body">
              <div class="hamster__head">
                <div class="hamster__ear"></div>
                <div class="hamster__eye"></div>
                <div class="hamster__nose"></div>
              </div>
              <div class="hamster__limb hamster__limb--fr"></div>
              <div class="hamster__limb hamster__limb--fl"></div>
              <div class="hamster__limb hamster__limb--br"></div>
              <div class="hamster__limb hamster__limb--bl"></div>
              <div class="hamster__tail"></div>
            </div>
          </div>
          <div class="spoke"></div>
        </div>
      </div>
      <br />
      <h1 className='text-[50px] text-white'>404 Error</h1>
      <br />
    </div>
  )
}

export default NotFound