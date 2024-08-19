import { Link } from "react-router-dom"
import duckstore from '../../assets/duckstore.png'
import {FiSearch} from "react-icons/fi"
import { IoBagOutline } from "react-icons/io5";
import {useSelector} from "react-redux"

const Nav = () => {
  const {userToken,user} = useSelector(state => state.authReducer);
  const { items, total } = useSelector((state) => state.cartReducer);
  console.log(total);
  return (
    <nav className="nav">
      <div className="my-container">
        <div className="flex justify-between items-center">
          <Link to={'/'}>
          <img src={duckstore} alt="logo" className="w-32 pt-2 object-cover" />
          </Link>
          <ul className="flex items-center">
            <li className="nav-li cursor-pointer"><FiSearch size={18}/></li>
            {userToken ?
                <li className="nav-li">
                  <Link to="/user" className="nav-link">
                    {user?.name}
                  </Link>
                </li>
              : 
                <li className="nav-li">
                  <Link to="/login" className="nav-link">
                    sign in
                  </Link>
                </li>
              }
            
            <li className="nav-li relative">
              <Link to="/cart">
              <IoBagOutline size={18} />
              <span className="nav-circle">{items}</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Nav