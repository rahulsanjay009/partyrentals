import { useLocation } from "react-router-dom";

const DisplayProduct = () => {
    const location = useLocation()
    const {product, products} = location.state || {}
    console.log(product,products)
    return (
        <>

        </>
    )
}

export default DisplayProduct;