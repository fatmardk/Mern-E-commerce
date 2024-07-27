import Nav from "../../components/home/Nav"
import {Swiper , SwiperSlide} from "swiper/react"
// import {Pagination} from "swiper"
import Slider from "../../components/home/Slider"
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import Categories from "../../components/home/Categories";
import { useRandomCategoriesQuery } from "../store/services/categoryService";
import HomeProduct from "../../components/home/HomeProduct";

const Home = () => {
  const { data, isFetching } = useRandomCategoriesQuery();
  return (
    <>
      <Nav />
      <div>
        <Slider />
      </div>
      <div className="my-container mt-10">
        <Categories />
        {!isFetching &&
          data?.categories?.length > 0 &&
          data?.categories.map((category) => (
            <HomeProduct category={category} key={category._id} />
          ))}
      </div>
    </>
  );
};
export default Home;