import ScreenHeader from "../../components/ScreenHeader";
import Wrapper from "./Wrapper";
import { Link , useParams} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {useEffect } from "react";
import { clearMessage } from "../store/reducers/globalReducer";
import { useLocation } from "react-router-dom";
import { useGetCategoriesQuery } from "../store/services/categoryServices";

const Categories = () => {
  const {page} = useParams();

  const {success} = useSelector(state => state.globalReducer)
  const dispatch = useDispatch();
  const location = useLocation();
  const {data = [],isLoading} = useGetCategoriesQuery(page ? page : 1);
  console.log(data,isLoading);

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
      
    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Adipisci libero quos asperiores quibusdam illo nulla sint blanditiis? Culpa, itaque dolores laudantium repellendus praesentium illo veniam et ut aspernatur similique numquam.
    </Wrapper>
    
    </>
  );
}

export default Categories
