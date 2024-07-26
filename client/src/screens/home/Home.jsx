import Nav from "../../components/home/Nav"
import {Swiper , SwiperSlide} from "swiper/react"
// import {Pagination} from "swiper"
import Slider from "../../components/home/Slider"
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import Categories from "../../components/home/Categories";
const Home = () => {
  return (
    <>
    <Nav/>
    <div>
      <Slider/>
    </div>
    <div className="my-container">
      <Categories/>
    </div>
    </>
  )
}

export default Home