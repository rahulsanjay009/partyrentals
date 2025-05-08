import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useParams, Outlet } from 'react-router-dom'; // Use Outlet for nested routing

import MobileResponsiveMenu from './MobileResponsiveMenu'
import useCategories from "../../../utils/useCategories";
import MobileContactUs from "../../ContactUs/MobileContactUs";
import MobileProductSearchBar from "../../ProductSearchBar/MobileProductSearchBar";

const MobileHomePage = () => {
  const { category } = useParams();  // Get category dynamically from the URL
  const { categories } = useCategories();
  return (
    <>
      
      <MobileResponsiveMenu categories={categories}/>
      <IonPage id="main-content">
        <IonHeader>
          <IonToolbar className="ion_toolbar">
            <IonButtons slot="start">
              <IonMenuButton className="ion_menu_button" />
            </IonButtons>
            <IonTitle>
              <div className="ion_title">
               <a href='/'> 
               <img
                  src="https://res.cloudinary.com/dmm4awbwm/image/upload/f_auto,q_auto/tsee5mrm7cymclmefpic"
                  alt="Kitten"
                  height="30"
                  width="30"
                />
                </a>
                <IonText>{!category || category === '/ALL' ? "Sri Krishna Party Rentals LLC" : category.replace('/','')}</IonText>
              </div>
            </IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent scrollEvents={true}>
          <MobileResponsiveMenu categories={categories} />
          {/* The Outlet will render the nested routes based on the current category */}
          <Outlet />
          <MobileContactUs />
        </IonContent>
      </IonPage>
    </>
  );
};

export default MobileHomePage;
