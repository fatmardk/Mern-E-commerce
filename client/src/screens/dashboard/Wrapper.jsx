import Sidebar from '../../components/Sidebar';
import AdminNav from '../../components/AdminNav';

const Wrapper = ({children}) => {
  return (
    <>
    <Sidebar/>
    <AdminNav/>
    <section className='ml-64 min-h-screen pt-28 px-4'>
      <div className='bg-dashboard text-white p-4'>
       {children}
      </div>
    </section>
    
    </>
  )
}

export default Wrapper