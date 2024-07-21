import Wrapper from "./Wrapper";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearMessage, setSuccess } from "../store/reducers/globalReducer";
import { useEffect } from "react";
import toast, { Toaster } from 'react-hot-toast';
import { useGetProductsQuery, useDeleteProductMutation } from "../store/services/productService";
import ScreenHeader from "../../components/ScreenHeader";
import Spinner from "../../components/Spinner";
import Pagination from "../../components/Pagination";

const Products = () => {
  const { page = 1 } = useParams(); 
  const { data = {}, isFetching } = useGetProductsQuery(page);
  console.log(data);
  const { success } = useSelector(state => state.globalReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    if (success) {
      toast.success(success);
      dispatch(clearMessage());
    }
  }, [success, dispatch]);

  const [delProduct] = useDeleteProductMutation();

  const deleteProduct = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      delProduct(id).then(() => {
        dispatch(setSuccess('Product deleted successfully!'));
      });
    }
  };

  return (
    <Wrapper>
      <ScreenHeader>
        <Link to="/dashboard/create-product" className="btn-dark inline-flex items-center">
          Create Product
        </Link>
        <Toaster position="top-right" />
      </ScreenHeader>
      {!isFetching ? (
        data?.products?.length ? (
          <>
            <table className="w-full bg-[#907c69] rounded-md">
              <thead>
                <tr className="border-b border-white text-left">
                  <th className="p-3 uppercase text-base font-medium">Name</th>
                  <th className="p-3 uppercase text-base font-medium">$ Price</th>
                  <th className="p-3 uppercase text-base font-medium">Stock</th>
                  <th className="p-3 uppercase text-base font-medium">Image</th>
                  <th className="p-3 uppercase text-base font-medium">Edit</th>
                  <th className="p-3 uppercase text-base font-medium">Delete</th>
                </tr>
              </thead>
              <tbody>
                {data?.products?.map(product => (
                  <tr key={product._id} className="odd:bg-[#b49c84]">
                    <td className="p-3 capitalize text-sm font-normal text-white">{product.title}</td>
                    <td className="p-3 capitalize text-sm font-normal text-white">${product.price}.00</td>
                    <td className="p-3 capitalize text-sm font-normal text-white">{product.stock}</td>
                    <td className="p-3 capitalize text-sm font-normal text-white">
                      <img
                        src={`/images/${product.image1}`}
                        alt={product.title}
                        className="w-20 h-20 rounded-md object-cover"
                      />
                    </td>
                    <td className="p-3 capitalize text-sm font-normal text-white">
                      <Link
                        to={`/dashboard/update-product/${product._id}`}
                        className="btn btn-warning"
                      >
                        Edit
                      </Link>
                    </td>
                    <td className="p-3 capitalize text-sm font-normal text-white">
                      <span className=" btn btn-alert cursor-pointer" onClick={() => deleteProduct(product._id)}>delete</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Pagination
              page={parseInt(page)}
              perPage={data.perPage}
              count={data.count}
              path="dashboard/products"
            />
          </>
        ) : (
          "There are no products added yet."
        )
      ) : (
        <Spinner />
      )}
    </Wrapper>
  );
};

export default Products;