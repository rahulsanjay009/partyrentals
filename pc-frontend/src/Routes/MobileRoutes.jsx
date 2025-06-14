import { Route, Routes } from "react-router-dom"
import MobileAboutUsContent from "../components/HomePage/MobileHome/MobileAboutUsContent"
import MobileCategoryContent from "../components/HomePage/MobileHome/MobileCategoryContent"
import MobileHomeContent from "../components/HomePage/MobileHome/MobileHomeContent"
import MobileHomePage from "../components/HomePage/MobileHome/MobileHomePage"
import MobileDisplayProduct from "../components/ProductCatalog/MobileDisplayProduct"
import Cart from "../components/ProductCatalog/Cart"

const MobileRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<MobileHomePage />}>
              {/* Nested Routes */}
              <Route index element={<MobileHomeContent />} />
              <Route path='Home' element={<MobileHomeContent />} />
              <Route path="about" element={<MobileAboutUsContent />} />
              <Route path=":category" element={<MobileCategoryContent />} />
              <Route path="Home/:category" element={<MobileCategoryContent />} />
              <Route path="/product" element={<MobileDisplayProduct />} />
              <Route path="/cart" element={<Cart />} />
            </Route>
          </Routes>
    )
}

export default MobileRoutes