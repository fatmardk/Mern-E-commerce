import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import {Pagination } from 'swiper/modules';
import {useRandomCategoriesQuery} from "../../screens/store/services/categoryService"
import Spinner from "../Spinner"
import { Link } from "react-router-dom";


const Slider = () => {
  const {data,isFetching} = useRandomCategoriesQuery();
  console.log(data,isFetching);
  return (
    isFetching ? <div className='my-container h-[70]flex items-center justify-center'>
      <Spinner/>
    </div> : <div>
    <Swiper
      pagination={{
        dynamicBullets: true,
      }}
      modules={[Pagination]}
      className="mySwiper"
    >
      {data?.categories.length > 0 &&
        data?.categories.map((cat, index) => (
          <SwiperSlide className="slide" key={cat._id}>
            <div className={`slide-img`}>
              <img
                src={`./slider/${index + 1}.jpg`}
                className="w-full h-full object-cover"
                alt=""
              />
            </div>
            <div className="absolute inset-0 w-full h-full bg-black/30">
              <div className="my-container h-[70vh] flex flex-col items-center justify-center">
                <h1 className="text-white text-xl font-medium capitalize mb-5">
                  {cat.name}
                </h1>
                <div className="">
                  <Link
                    to={`/cat-products/${cat.name}`}
                    className="btn text-sm"
                  >
                    browse collections
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
    </Swiper>
    </div>
  );
}

export default Slider;
