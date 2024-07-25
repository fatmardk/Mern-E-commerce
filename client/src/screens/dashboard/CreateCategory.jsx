import ScreenHeader from "../../components/ScreenHeader";
import Wrapper from "./Wrapper";
import { Link, useNavigate } from "react-router-dom";
import { useState,useEffect } from "react";
import { useCreateMutation } from "../store/services/categoryService";
import { setSuccess } from "../store/reducers/globalReducer";
import { useDispatch } from "react-redux";



const CreateCategory = () => {

  const [state,setState] = useState('');

  const [saveCategory,data] = useCreateMutation();

  console.log('data',data);

const errors = data?.error?.data?.errors ? data?.error?.data?.errors : []

  const submitCategory = e => {
    e.preventDefault();
    saveCategory({name:state})

  }
  const dispatch = useDispatch();
  const navigate = useNavigate ();
  

  useEffect (()=>{
    if(data?.isSuccess){
      dispatch(setSuccess(data?.data?.message))
      navigate('/dashboard/categories')
      
    }
  }, [data?.isSuccess, data?.data?.message, dispatch,navigate])
  return (
    <>
    <Wrapper>
      <ScreenHeader>
        <Link to="/dashboard/categories" className="btn-dark"> <i className="bi bi-arrow-left"></i>Categories List</Link>
      </ScreenHeader>

      <form className="w-full md:w-8/12" onSubmit={submitCategory}>
        <h3 className="text-lg capitalize mb-3">Create Category</h3>
        {errors.length > 0 && errors.map((error, key) => (
            <p className="alert-danger" key={key}>{error.msg}!</p>
          
        ))}

      

        <div>
          <input type="text" name="" className="form-control" placeholder="Category Name..." value={state} onChange={(e) => setState (e.target.value)} />
        </div>
        <div className="mb-3 mt-3">
          <input type="submit"
           value={data.isLoading ? 'loading...' : 'Create Category'}
           className="btn-indigo" />
        </div>
      </form>
    
    </Wrapper>
    
    </>
  );
}

export default CreateCategory