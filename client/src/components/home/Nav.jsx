import { Link } from "react-router-dom"
import duckstore from '../../assets/duckstore.png'
import {FiSearch} from "react-icons/fi"
import { IoBagOutline } from "react-icons/io5";
const Nav = () => {
  return (
    <nav className="nav">
      <div className="my-container">
        <div className="flex justify-between items-center">
          <Link to={'/'}>
          <img src={duckstore} alt="logo" className="w-32 pt-2 object-cover" />
          </Link>
          <ul className="flex items-center">
            <li className="nav-li cursor-pointer"><FiSearch size={18}/></li>
            <li className="nav-li nav-link"><Link to="/login">Sign in</Link></li>
            <li className="nav-li relative">
              <Link to="/cart">
              <IoBagOutline size={18} />
              <span className="nav-circle">10</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Nav