import React from 'react'
import duckstore from '../assets/duckstore.png';
import {Link} from "react-router-dom" 

const Sidebar = ({side,closeSideBar}) => {
  return (
    <div className={`fixed top-0 ${side} sm:left-0 w-64 h-screen bg-sidebarbg z-10 transition-all`}>
      <i class="bi bi-x-lg absolute top-4 right-4 sm:hidden block cursor-pointer text-lg" onClick={closeSideBar}></i>
      <div className='bg-amber-50 h-29 '>
        <img className='h-28 flex ml-5' src={duckstore} alt="logo" />
      </div>

      <ul className='mt-4'>
        <li className='p-3 text-white cursor-pointer hover:bg-sidebarhv transition 200'>
        <i class="bi bi-card-list mr-2 inline-block text-lg"></i><Link to="/dashboard/products" className='text-base capitalize'>Products</Link>
        </li>
        <li className='p-3 text-white cursor-pointer hover:bg-sidebarhv transition 200'>
        <i class="bi bi-bag-check mr-2 inline-block text-lg"></i><Link to="/dashboard/products" className='text-base capitalize'>Orders</Link>
        </li>
        <li className='p-3 text-white cursor-pointer hover:bg-sidebarhv transition 200'>
        <i class="bi bi-people mr-2 inline-block text-lg"></i><Link to="/dashboard/products" className='text-base capitalize'>Customers</Link>
        </li>
      </ul>



    </div>
  )
}

export default Sidebar