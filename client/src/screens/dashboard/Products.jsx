import Wrapper from "./Wrapper";
import { Link,useParams } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import { clearMessage, setSuccess } from "../store/reducers/globalReducer";
import { useEffect } from "react";
import toast, {Toaster} from 'react-hot-toast'; 
import { useGetProductQuery } from "../store/services/productService";


const Products = () => {
  let  {page} = useParams();
  if(!page){
    page = 1;
  }

  const {data = [], isFetching} = useGetProductQuery(page);
  const {success} = useSelector(state => state.globalReducer)
  const dispatch = useDispatch();
  useEffect(()=>{
    if(success){
      toast.success(success);
    }
    return () => {
      dispatch(clearMessage())
    }
  },[])
  return (
    <>
    <Wrapper>
    <Link to="/dashboard/create-product" className="btn-dark"> <i className="bi bi-arrow-left"></i>Create Product</Link>
    <Toaster position="top-right"/>
    </Wrapper>
    
    </>
  );
}

export default Products