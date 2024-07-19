import Wrapper from "./Wrapper";
import { Link } from "react-router-dom";


const Products = () => {
  return (
    <>
    <Wrapper>
    <Link to="/dashboard/create-product" className="btn-dark"> <i className="bi bi-arrow-left"></i>Create Product</Link>
    </Wrapper>
    
    </>
  );
}

export default Products