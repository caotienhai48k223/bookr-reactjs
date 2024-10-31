import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import api from "../api";
import { FaUserPlus } from "react-icons/fa6";
import { PiEyeClosed, PiEye } from "react-icons/pi";
import Loading from '../components/Loading';
import '../style/form.css'
import Truck from '../components/Truck';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    setLoading(true)
    e.preventDefault();
    if (password !== passwordConfirm) {
      setError('Passwords do not match');
      setLoading(false)
      return;
    }
    try {
        await api.post('/api-real/users/', {
            username,
            email,
            password
        });
        const res = await api.post('/api-real/login/', {
          username,
          password
        });
        localStorage.setItem("access", res.data.access);
        localStorage.setItem("refresh", res.data.refresh);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        navigate('/')
        window.location.reload();
    } catch {
      setError('User already exists');
    } finally {
      setLoading(false)
    }
  };

  return (
    <div className='font-mulish bg-slate-400 min-h-[81.5vh]'>
      <h1 className='font-mulish text-[40px] bg-slate-600 text-white'>Register</h1>
      <br />
      <div className='flex justify-center'>
        <div className='w-2/5 p-10 border-slate-900 border-2'>
          {loading ? <Loading/> : <>
          <div className='mb-3 flex justify-center'>
            <Truck/>
          </div>
          <form onSubmit={handleRegister}>
            <div className='flex justify-center'>
              <div className="input-info">
                <input id="username" name="username" type="text" value={username} minLength={6}
                onFocus={() => setError(null)} autoComplete='off' required
                onChange={(e) => setUsername(e.target.value)} placeholder=" "/>
                <label for="username">Username:</label>
              </div>
            </div>
            <div className='flex justify-center'>
              <div className="input-info">
                <input id="email" name="email" type="email" value={email} minLength={12} 
                onFocus={() => setError(null)} autoComplete='off' required
                onChange={(e) => setEmail(e.target.value)} placeholder=" "/>
                <label for="email">Email:</label>
              </div>
            </div>
            <div className='flex justify-center'>
              <div className="input-info">
                <input type={showPassword ? 'text': 'password'} id="password" name="password" value={password} minLength={8}
                onFocus={() => setError(null)} autoComplete='off' required
                onChange={(e) => setPassword(e.target.value)} placeholder=" "/>
                <label for="password">Password:</label>
                <button className='absolute right-[1%] bottom-2 text-[20px] text-white' 
                type='button' 
                onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <PiEye/> : <PiEyeClosed/>}
                </button>
              </div>
            </div>
            <div className='flex justify-center mb-3'>
              <div className="input-info">
                <input type={showPassword ? 'text': 'password'} id="password2" name="password2" value={passwordConfirm} minLength={8}
                onFocus={() => setError(null)} autoComplete='off' required
                onChange={(e) => setPasswordConfirm(e.target.value)} placeholder=" "/>
                <label for="password2">Confirm Password:</label>
              </div>
            </div>

            {error && <p className='text-[14px] text-slate-600'>{error}</p>}
            <button className='mt-3 bg-slate-900 pl-10 pr-10 pb-1 pt-1 text-white'>Register</button>
          </form>
          </>}
        </div>
      </div>
      <br />
    </div>
  )
}

export default Register