import React, { useEffect, useState, useRef } from 'react'
import Loading from '../components/Loading';
import api from "../api";
import { useNavigate } from "react-router-dom";
import InputProfile from '../components/InputProfile';

const Profile = () => {
  const [user, setUser] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({});
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [isEditInfo, setIsEditInfo] = useState(false)
  const [isEditPassword, setIsEditPassword] = useState(false)
  const formRef = useRef(null);
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true)
      try {
        const { data }= await api.get(`/api-real/users/${currentUser.id}`);
        setUser(data);
        setFormData(data);
      } catch {
        setError('No user');
      } finally {
        setLoading(false)
      }
    };
    fetchUser();
  }, [currentUser.id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'old_password') setOldPassword(value);
    else if (name === 'password') setNewPassword(value);
    else if (name === 'password2') setConfirmNewPassword(value);
    else setFormData((prev) => ({ ...prev, [name]: value }));
    setError(null)
  };

  const handleSubmit = async (e, type) => {
    e.preventDefault();
    setLoading(true);
    if (type === 'password' && newPassword !== confirmNewPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }
    try {
      await api.put(`/api-real/users/${currentUser.id}/`, type === 'password'
        ? { ...formData, old_password: oldPassword, password: newPassword }
        : formData);
      navigate('/');
      window.location.reload();
    } catch {
      setError(type === 'password' ? 'Mật khẩu cũ không đúng' : 'Xem lại thông tin người dùng');
    } finally {
      setLoading(false);
    }
  };

  const handleClickOutside = (e) => {
    if (formRef.current && !formRef.current.contains(e.target)) {
      setIsEditInfo(false);
      setIsEditPassword(false)
      setError(null)
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isEditInfo, isEditPassword]);

  if (loading) return <Loading/>

  return (
    <div className='bg-slate-400 font-mulish relative text-white min-h-[81.5vh]'>
      <h1 className='text-[40px] bg-slate-600 text-white'>My Profile</h1>
      <div>{user.first_name} {user.last_name}</div>
      <div>{user.username}</div>
      <div>{user.email}</div>
      <div className='flex justify-center'>
        <button className='text-[14px] border-b-2' onClick={() => setIsEditInfo(!isEditInfo)}>
          Update Profile
        </button>
      </div>
      <div className='flex justify-center'>
        <button className='text-[14px] border-b-2' onClick={() => setIsEditPassword(!isEditPassword)}>
          Change Password
        </button>
      </div>
      {(isEditInfo || isEditPassword) && (
        <div ref={formRef} className='absolute bg-slate-900 w-[50vw] top-16 left-[25%]'>
          <div className='text-[25px] mt-5 mb-3'>{isEditInfo ? 'Update Profile' : 'Change Password'}</div>
          <form onSubmit={(e) => handleSubmit(e, isEditInfo ? 'info' : 'password')}>
            {isEditInfo ? (
              <>
                <InputProfile label="Email" name="email" type="email"
                  minLength={12}
                  value={formData.email} 
                  onChange={handleChange}
                />
                <InputProfile label="First Name" name="first_name" 
                  value={formData.first_name} 
                  onChange={handleChange}
                />
                <InputProfile label="Last Name" name="last_name" 
                  value={formData.last_name} 
                  onChange={handleChange} 
                />
              </>
            ) : (
              <>
                <InputProfile label="Old Password" name="old_password" type="password" 
                  value={oldPassword} 
                  onChange={handleChange}
                  minLength={8}
                />
                <InputProfile label="New Password" name="password" type="password" 
                  value={newPassword} 
                  onChange={handleChange}
                  minLength={8}
                />
                <InputProfile label="Confirm New Password" name="password2" type="password"
                  value={confirmNewPassword} 
                  onChange={handleChange} 
                  minLength={8}
                />
              </>
            )}
            {error && <p className='text-[14px] text-slate-600'>{error}</p>}
            <button type="submit" className='bg-slate-400 px-6 py-2 mt-6 mb-10'>{isEditInfo ? 'Confirm Update' : 'Confirm Change'}</button>
          </form>
        </div>
      )}
    </div>
  )
}

export default Profile