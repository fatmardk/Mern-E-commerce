import Sidebar from '../../components/Sidebar';
import AdminNav from '../../components/AdminNav';
import { useState } from 'react';


const Wrapper = ({children}) => {
  const [side,setSide] =useState('-left-64');
  const openSideBar = ({children}) =>{

    setSide("left-0");

  }

  const closeSideBar = ({children}) =>{

    setSide("-left-64");

  }
  return (
    <>
    <Sidebar side={side} closeSideBar={closeSideBar}/>
    <AdminNav openSideBar={openSideBar}/>
    <section className=' ml-0 sm:ml-64 min-h-screen pt-28 px-4 bg-[#f3e7db]'>
      
      <div className='bg-[#e1c4a5] text-white px-4 py-6'>
       {children}
      </div>
    </section>
    
    </>
  )
}

export default Wrapper