import React, { useState } from 'react';
import { AiOutlineBook, AiOutlineUser } from "react-icons/ai";
import { Menu } from 'antd';
import { useNavigate } from 'react-router-dom';
import WashingMachine from '../components/WashingMachine';

const items = [
  {
    key: '1',
    label: 'Bookcase',
    icon: <AiOutlineBook />,
    path: '/books',
  },
  {
    key: 'sub1',
    label: 'Account',
    icon: <AiOutlineUser />,
    children: [
      {
        key: '2',
        label: 'My Profile',
        path: '/profile'
      },
      {
        key: '3',
        label: 'Reviewed',
        path: '/reviewed'
      }
    ],
  },
];
const SideBar = () => {
  const [current, setCurrent] = useState('');
  const navigate = useNavigate();

  const onClick = (e) => {
    setCurrent(e.key);
    const selectedItem = findItemByKey(items, e.key);
    if (selectedItem && selectedItem.path) {
      navigate(selectedItem.path);
    }
  };

  const findItemByKey = (menuItems, key) => {
    for (const item of menuItems) {
      if (item.key === key) {
        return item;
      } else if (item.children) {
        const found = findItemByKey(item.children, key);
        if (found) return found;
      }
    }
    return null;
  };

  return (
    <div className='w-[15vw] pt-5 min-h-screen fixed bg-slate-900 font-mulish'>
      <Menu
        theme="dark"
        onClick={onClick}
        defaultOpenKeys={['sub1']}
        selectedKeys={[current]}
        mode="inline"
        items={items}
      />
      <div className='flex justify-center mt-5'>
        <WashingMachine/>
      </div>
    </div>
  );
};
export default SideBar;