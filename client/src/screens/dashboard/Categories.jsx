import ScreenHeader from "../../components/ScreenHeader";
import Wrapper from "./Wrapper";
import { Link , useParams} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {useEffect } from "react";
import { clearMessage } from "../store/reducers/globalReducer";
import { useLocation } from "react-router-dom";
import { useGetCategoriesQuery } from "../store/services/categoryServices";
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
  const {data = [],isFetching} = useGetCategoriesQuery(page);

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
        <table className="w-full bg-gray-800 rounded-md">
          <thead>
            <tr className="border-b border-gray-100 text-left">
              <td className="p-3 uppercase text-base font-medium">name</td>
              <td className="p-3 uppercase text-base font-medium">edit</td>
              <td className="p-3 uppercase text-base font-medium">delete</td>
            </tr>
          </thead>
          <tbody>
            {data?.categories?.map(category => (
              <tr key ={category._id} className="odd:bg-gray-600">
                <td className="p-3 capitalize text-sm font-normal text-gray-400">{category.name}</td>
                <td className="p-3 capitalize text-sm font-normal text-gray-400"><Link to={`/dashboard/update-category/${category._id}`} className="btn btn-warning">edit</Link></td>
                <td className="p-3 capitalize text-sm font-normal text-gray-400"><Link>delete</Link></td>
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
