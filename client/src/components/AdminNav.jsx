import {Link} from "react-router-dom" 

const AdminNav = () => {
  return (
    <nav className="fixed left-60 top-0 right-0 mx-4">
      <div className="bg-navbar w-full justify-end flex p-4 h-20">
        <Link to="/" className="py-2 px-4 bg-white text-black rounded-md capitalize">Logout</Link>
      </div>

    </nav>
  )
}

export default AdminNav