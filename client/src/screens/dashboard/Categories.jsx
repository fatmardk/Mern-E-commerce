import ScreenHeader from "../../components/ScreenHeader";
import Wrapper from "./Wrapper";
import { Link , useParams} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {useEffect } from "react";
import { clearMessage, setSuccess } from "../store/reducers/globalReducer";
import { useLocation } from "react-router-dom";
import { useGetQuery,useDeleteCategoryMutation } from "../store/services/categoryService";
import Spinner from "../../components/Spinner";
import Pagination from "../../components/Pagination";

const Categories = () => {
  let {page} = useParams();
  if(!page){
    page = 1;
  }

  const {success} = useSelector(state => state.globalReducer)
  const dispatch = useDispatch();
  const location = useLocation();
  const {data = [],isFetching} = useGetQuery(page);
  const [removeCategory, response] = useDeleteCategoryMutation();

  const deleteCat = id =>{
    if(window.confirm('Are you really want to delete the category?')){
      removeCategory(id);
    }
  }

  useEffect(()=>{
    if(response.isSuccess){
      dispatch(setSuccess(response?.data?.message))
    }
  }, [response?.data?.message])

  useEffect(() => {
    let timer;
    if (success) {
      timer = setTimeout(() => {
        dispatch(clearMessage());
      }, 5000); 
    }
    return () => {
      clearTimeout(timer);
    };
  }, [success, dispatch]);


  return (
    <>
    <Wrapper>
      <ScreenHeader>
        <Link to="/dashboard/create-category" className="btn-dark">Add Categories <i className="bi bi-plus-lg"></i></Link>
      </ScreenHeader>
      {success && <div className="alert-success">{success}</div>}
      
      {!isFetching ? data?.categories?.length >0 && <><div>
        <table className="w-full bg-[#907c69] rounded-md">
          <thead>
            <tr className="border-b border-white text-left">
              <td className="p-3 uppercase text-base font-medium">name</td>
              <td className="p-3 uppercase text-base font-medium">edit</td>
              <td className="p-3 uppercase text-base font-medium">delete</td>
            </tr>
          </thead>
          <tbody>
            {data?.categories?.map(category => (
              <tr key ={category._id} className="odd:bg-[#b49c84]">
                <td className="p-3 capitalize text-sm font-normal text-white">{category.name}</td>
                <td className="p-3 capitalize text-sm font-normal text-gray-400"><Link to={`/dashboard/update-category/${category._id}`} className="btn btn-warning">edit</Link></td>
                <td className="p-3 capitalize text-sm font-normal text-gray-400"><Link className="btn btn-alert" onClick={()=>deleteCat(category._id)} >delete</Link></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div> <Pagination page ={parseInt(page)} perPage={data.perPage} count={data.count} path="dashboard/categories" /> </>: <Spinner/>}
    </Wrapper>
    
    </>
  );
}

export default Categories
