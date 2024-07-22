import Nav from "../../../components/home/Nav"
import Header from "../../../components/home/Header"
import { Link } from "react-router-dom"
import {motion} from "framer-motion"
const Login = () => {
  return (
    <div>
      <Nav/>
      <div>
         <Header>
          <p>sign in</p>
         </Header>
         <div className="flex flex-wrap justify-end mr-10 sm:mr-2">
          
          <motion.div 
          initial={{opacity:0, x:"-100vw"}}
          animate={{opacity:1, x:0}}
          
          className="lg:w-3/6 sm:w-8/12 md:w-2/3 p-6 ">
            <form className="bg-white rounded-lg -mt-52 border border-gray-200 p-5">
             <h1 className="heading">sign in</h1>
             <div className="mb-4">
              <label htmlFor="email" className="form-label">email</label>
              <input type="email" name="email" id="email" className="form-input" placeholder="Email..." />
             </div>

             <div className="mb-4">
              <label htmlFor="password" className="form-label">Password</label>
              <input type="password" name="password" id="password" className="form-input" placeholder="Password..." />
             </div>

             <div className="mb-4">
              <input type="submit" value="sign in" className="btn btn-dark w-full" />
             </div>

             <div>
              <p>Don't have an account ? <span className="capitalize font-medium text-lg text-black "> <Link to="/register">register</Link></span></p>
             </div>


            </form>
          </motion.div>
         </div>
      </div>
    </div>
  )
}

export default Login