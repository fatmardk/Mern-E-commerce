import React from 'react';
import Nav from '../../components/home/Nav';
import Header from '../../components/home/Header';
import { useParams, Link } from 'react-router-dom';
import currency from "currency-formatter"
import { useCatProductsQuery } from "../../screens/store/services/homeProducts";
import Pagination from '../../components/Pagination';
import ProductSkeleton from "../../components/home/ProductSkeleton";
import Skeleton from '../../components/skeleton/Skeleton';
import Thumbnail from '../../components/skeleton/Thumbnail';
import Text from '../../components/skeleton/Text';
// import ProductCard from "../../components/home/ProductCard";

const CatProduct = () => {
  const { name, page = 1 } = useParams();
  const { data, isFetching } = useCatProductsQuery({ name, page: parseInt(page) });
  
  return (
    <>
      <Nav />
      <div>
        <Header>{name}</Header>
      </div>
      <div className="my-container my-10">
        {isFetching ? (
          <div className="flex flex-wrap -mx-4 mb-10">
            {[1, 2, 3, 4].map((item) => (
              <div
                className="w-6/12 sm:w-4/12 md:w-3/12 lg:w-4/12 xl:w-2/12 p-4"
                key={item}
              >
                <Skeleton>
                  <Thumbnail />
                  <Text mt="15px" />
                </Skeleton>
              </div>
            ))}
          </div>
        ) : data && data.count > 0 ? (
          <>
          <p className='ml-4 text-base font-medium text-gray-700'>{data.count} products found in {name}</p>
          <div className='flex flex-wrap -mx-5'>
            
            {data.products.map((product) => {
              const percentage = product.discount/100;
              const discountPrice = product.price - (product.price * percentage)
              console.log(discountPrice);
              return(
                <div className='w-full md:w-3/12 p-4 px-5 py-10' key={product._id}>
                <Link to={`/product/${product._id}`}>
                  <div className="w-full">
                    <img
                      src={`/images/${product.image1}`}
                      alt={product.name}
                      className='w-full h-[280px] object-cover'
                    />
                  </div>
                  <p className='capitalize text-base font-medium text-black my-2.5'>{product.title}</p>
                  <div className="flex justify-between">
                    <del className='text-lg font-medium text-gray-600'>
                      {currency.format(product.price, {code:"USD"})}
                    </del>
                    <span className='text-lg font-medium text-rose-600'>
                      {currency.format(discountPrice, {code:"USD"})}
                    </span>
                  </div>
                </Link>
              </div>
              )
            })}
          </div>
          </>
        ) : (
          <p className='alert-danger'>No products found in {name} category</p>
        )}
      </div>
      {/* Pagination Component can be added here if needed */}
    </>
  );
}

export default CatProduct;
