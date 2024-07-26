import React from 'react';
import Nav from '../../components/home/Nav';
import Header from '../../components/home/Header';
import { useParams} from 'react-router-dom';
import { useCatProductsQuery } from "../../screens/store/services/homeProducts";
import Pagination from '../../components/Pagination';
import ProductSkeleton from "../../components/home/ProductSkeleton";
import Skeleton from '../../components/skeleton/Skeleton';
import Thumbnail from '../../components/skeleton/Thumbnail';
import Text from '../../components/skeleton/Text';
import ProductCard from '../../components/home/ProductCard';
// import ProductCard from "../../components/home/ProductCard";

const CatProduct = () => {
  const { name, page = 1 } = useParams();
  const { data, isFetching } = useCatProductsQuery({ name, page: parseInt(page) });
  console.log(name);
  const encodedName = encodeURIComponent(name); 
  
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
                  <Thumbnail height="320px"/>
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
              
              return(
                <ProductCard product={product}/>
                 
              )
            })}
          </div>
          <Pagination
              page={parseInt(page)}
              count={data.count}
              perPage={data.perPage}
              path={`cat-products/${encodedName}`}
              theme="light"
            />
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
