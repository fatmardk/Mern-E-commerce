import {Link} from "react-router-dom" 
import {useDispatch} from "react-redux"
import { logout } from "../screens/store/reducers/authReducer"

const AdminNav = ({openSideBar}) => {

  const dispatch =useDispatch();
  const adminLogout =()=>{
    dispatch(logout());
  }
  return (
    <nav className="fixed left-0 sm:left-64 top-4 right-0 mx-4">
      <div className="bg-navbar w-full justify-between sm:justify-end items-center flex p-4 h-20">
      <i class="bi bi-filter-left text-white text-2xl cursor-pointer sm:hidden block" onClick={openSideBar}></i>
        <button className="py-2 px-4 bg-amber-50 hover:bg-brown1 hover:text-white transition 200 text-black rounded-md capitalize" onClick={adminLogout}>Logout</button>
      </div>

    </nav>
  )
}

export default AdminNav