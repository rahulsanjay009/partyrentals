import { Route, Routes } from "react-router-dom"
import MobileAboutUsContent from "../components/HomePage/MobileHome/MobileAboutUsContent"
import MobileCategoryContent from "../components/HomePage/MobileHome/MobileCategoryContent"
import MobileHomeContent from "../components/HomePage/MobileHome/MobileHomeContent"
import MobileHomePage from "../components/HomePage/MobileHome/MobileHomePage"

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
            </Route>
          </Routes>
    )
}

export default MobileRoutes