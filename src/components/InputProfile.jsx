import React from 'react'

const InputProfile = ({ label, name, value, onChange, type = "text", maxLength, minLength }) => {
  return (
  <div className='flex gap-3 justify-center'>
    <label htmlFor={name}>{label}:</label>
    <input className='bg-slate-900 border-b-2 outline-none' 
      type={type} 
      id={name} 
      name={name} 
      value={value || ''} 
      onChange={onChange}
      minLength={minLength}
      required />
  </div>
  )
}

export default InputProfile