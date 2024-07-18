import ScreenHeader from "../../components/ScreenHeader";
import Wrapper from "./Wrapper";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { setSuccess } from "../store/reducers/globalReducer";
import { useDispatch } from "react-redux";
import { useFetchCategoryQuery, useUpdateCategoryMutation } from "../store/services/categoryServices";
import Spinner from "../../components/Spinner";

const UpdateCategory = () => {
  const [state, setState] = useState('');
  const { id } = useParams();
  const { data, isFetching } = useFetchCategoryQuery(id);
  console.log(data);

  useEffect(() => {
    if (data?.category) {
      setState(data?.category?.name);
    }
  }, [data?.category]);

  const [saveCategory, response] = useUpdateCategoryMutation();
  console.log(response);

  const errorMessage = response?.error?.data?.msg;

  const updateSubmit = e => {
    e.preventDefault();
    saveCategory({ name: state, id });
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (response?.isSuccess) {
      dispatch(setSuccess(response?.data?.message));
      navigate('/dashboard/categories');
    }
  }, [response?.isSuccess, dispatch, navigate]);

  return (
    <>
      <Wrapper>
        <ScreenHeader>
          <Link to="/dashboard/categories" className="btn-dark">
            <i className="bi bi-arrow-left"></i>Categories List
          </Link>
        </ScreenHeader>

        {!isFetching ? (
          <form className="w-full md:w-8/12" onSubmit={updateSubmit}>
            <h3 className="text-lg capitalize mb-3">Update Category</h3>
            {errorMessage && (
              <p className="alert-danger">{errorMessage}!</p>
            )}
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Category Name..."
                value={state}
                onChange={(e) => setState(e.target.value)}
              />
            </div>
            <div className="mb-3 mt-3">
              <input
                type="submit"
                value='UPDATE'
                className="btn-indigo"
              />
            </div>
          </form>
        ) : <Spinner />}
      </Wrapper>
    </>
  );
};

export default UpdateCategory;
