import ScreenHeader from "../../components/ScreenHeader";
import Wrapper from "./Wrapper";
import { Link } from "react-router-dom";



const Categories = () => {
  return (
    <>
    <Wrapper>
      <ScreenHeader>
        <Link to="/dashboard/create-category" className="btn-dark">Add Categories <i class="bi bi-plus-lg"></i></Link>
      </ScreenHeader>
    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Adipisci libero quos asperiores quibusdam illo nulla sint blanditiis? Culpa, itaque dolores laudantium repellendus praesentium illo veniam et ut aspernatur similique numquam.
    </Wrapper>
    
    </>
  );
}

export default Categories