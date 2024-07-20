import ScreenHeader from "../../components/ScreenHeader";
import Wrapper from "./Wrapper";
import { Link,useNavigate } from "react-router-dom";
import { TwitterPicker } from "react-color";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from 'uuid';
import { useAllCategoriesQuery } from "../store/services/categoryServices";
import { useCreateProductMutation } from "../store/services/productService";
import Spinner from "../../components/Spinner";
import toast, {Toaster} from 'react-hot-toast'; 
import {setSuccess} from "../store/reducers/globalReducer" 
import { useState, useEffect } from "react";
import Colors from "../../components/Colors";
import SizeList from "../../components/SizeList";
import ImagesPreview from "../../components/ImagesPreview";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';

const CreateProduct = () => {
  const { data = [], isLoading, isSuccess } = useAllCategoriesQuery();

  const [value, setValue] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate ();


  const [state, setState] = useState({
    title: '',
    price: 0,
    discount: 0,
    stock: 0,
    category: '', 
    colors: [],
    image1: '',
    image2: '',
    image3: ''
  });

  const [sizes] = useState([
    { name: 'xsm' },
    { name: 'sm' },
    { name: 'md' },
    { name: 'lg' },
    { name: 'xl' },
    { name: '1 year' },
    { name: '2 year' },
    { name: '3 year' },
    { name: '4 year' },
    { name: '5 year' }
  ]);

  const [sizeList, setSizeList] = useState([]);

  const [preview, setPreview] = useState({
    image1: '',
    image2: '',
    image3: ''
  });

  const imageHandle = e => {
    if (e.target.files.length !== 0) {
      setState({ ...state, [e.target.name]: e.target.files[0] });
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview({ ...preview, [e.target.name]: reader.result });
      };
      reader.readAsDataURL(e.target.files[0]);
    } 
  };
  
  

  const handleInput = e => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const saveColors = color => {
    const filtered = state.colors.filter(clr => clr.color !== color.hex);
    setState({ ...state, colors: [...filtered, { color: color.hex, id: uuidv4() }] });
  };

  const deleteColor = color => {
    const filtered = state.colors.filter(clr => clr.color !== color.color);
    setState({ ...state, colors: filtered });
  };

  const chooseSize = sizeObject => {
    const filtered = sizeList.filter(size => size.name !== sizeObject.name);
    setSizeList([...filtered, sizeObject]);
  };

  const deleteSize = name => {
    const filtered = sizeList.filter(size => size.name !== name);
    setSizeList(filtered);
  };

  const [createNewProduct,response] = useCreateProductMutation();

  console.log('your response', response);

  const createPro = e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('data', JSON.stringify(state));
    formData.append('sizes', JSON.stringify(sizeList));
    formData.append('description', value);
    formData.append('image1', state.image1);
    formData.append('image2', state.image2);
    formData.append('image3', state.image3);
    createNewProduct(formData);
  };

  useEffect(()=>{
    if(!response.isSuccess){
      response?.error?.data?.errors.map(err => {
        toast.error(err.msg);
      })
    }
  },[response?.error?.data?.errors])

  useEffect (()=>{
    if(response?.isSuccess){
      dispatch(setSuccess(response?.data?.msg))
      navigate('/dashboard/products')
      
    }
  }, [response?.isSuccess])
  

  return (
    <Wrapper>
      <ScreenHeader>
        <Link to="/dashboard/products" className="btn-dark">
          <i className="bi bi-arrow-left"></i>Product List
        </Link>
      </ScreenHeader>
      <Toaster position="top-right" reverseOrder={true}/>
      <div className="flex flex-wrap -mx-3">
        <form className="w-full xl:w-8/12 p-3" onSubmit={createPro}>
          <div className="flex flex-wrap">
            <div className="w-full md:w-6/12 p-3">
              <label htmlFor="title" className="label">Title</label>
              <input type="text" name="title" className="form-control" id="title" placeholder="Title..." onChange={handleInput} value={state.title} />
            </div>

            <div className="w-full md:w-6/12 p-3">
              <label htmlFor="price" className="label">Price</label>
              <input type="number" name="price" className="form-control" id="price" placeholder="Price..." onChange={handleInput} value={state.price} />
            </div>

            <div className="w-full md:w-6/12 p-3">
              <label htmlFor="discount" className="label">Discount</label>
              <input type="number" name="discount" className="form-control" id="discount" placeholder="Discount..." onChange={handleInput} value={state.discount} />
            </div>

            <div className="w-full md:w-6/12 p-3">
              <label htmlFor="stock" className="label">Stock</label>
              <input type="number" name="stock" className="form-control" id="stock" placeholder="Stock..." onChange={handleInput} value={state.stock} />
            </div>

            <div className="w-full md:w-6/12 p-3">
              <label htmlFor="category" className="label">Categories</label>
              {!isLoading && isSuccess ? (
                data?.categories?.length > 0 && (
                  <select name="category" id="category" className="form-control" onChange={handleInput} value={state.category}>
                    <option>Choose category</option>
                    {data?.categories?.map(category => (
                      <option value={category.name} key={category._id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                )
              ) : (
                <Spinner />
              )}
            </div>

            <div className="w-full md:w-6/12 p-3">
              <label htmlFor="color" className="label p-1">Choose Color</label>
              <TwitterPicker onChangeComplete={saveColors} />
            </div>

            <div className="w-full p-3">
              <label htmlFor="sizes" className="label p-1">Choose Sizes</label>
              {sizes.length > 0 && (
                <div className="flex flex-wrap -mx-3">
                  {sizes.map(size => (
                    <div key={size.name} className="size" onClick={() => chooseSize(size)}>
                      {size.name}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="w-full p-3">
              <label htmlFor="image1">Image 1</label>
              <input type="file" name="image1" id="image1" className="input-file" onChange={imageHandle} />
            </div>

            <div className="w-full p-3">
              <label htmlFor="image2">Image 2</label>
              <input type="file" name="image2" id="image2" className="input-file" onChange={imageHandle} />
            </div>

            <div className="w-full p-3">
              <label htmlFor="image3">Image 3</label>
              <input type="file" name="image3" id="image3" className="input-file" onChange={imageHandle} />
            </div>
            <div className="w-full p-3">
              <label htmlFor="description">Description</label>
              <ReactQuill theme="snow" id="description" value={value} onChange={setValue} className="placeholder:text-black" placeholder="Description..."/>
              
            </div>

            <div className="w-full p-3">
              <input type="submit" value={response.isLoading ? 'loading...' : 'save product'} disabled={response.isLoading ? true : false} className="btn btn-dark"/>
            </div>
          </div>
        </form>
        
        <div className="w-full xl:w-4/12 p-3">
          <Colors colors={state.colors} deleteColor={deleteColor} />
          <SizeList list={sizeList} deleteSize={deleteSize} />
          <ImagesPreview url={preview.image1} heading="Image 1" />
          <ImagesPreview url={preview.image2} heading="Image 2" />
          <ImagesPreview url={preview.image3} heading="Image 3" />
        </div>
      </div>
    </Wrapper>
  );
};

export default CreateProduct;
