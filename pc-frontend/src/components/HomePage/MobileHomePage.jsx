import {
    IonButtons,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonContent,
    IonHeader,
    IonImg,
    IonItem,
    IonLabel,
    IonLoading,
    IonMenuButton,
    IonPage,
    IonText,
    IonTitle,
    IonToolbar
} from "@ionic/react";
import { useEffect, useState } from "react";

import MobileResponsiveMenu from "./MobileResponsiveMenu";
import useCategories from "../../utils/useCategories";
import useProducts from "../../utils/useProducts";
import MobileProductCatalog from "../ProductCatalog/MobileProductCatalog";
import MobileProductSearchBar from "../ProductSearchBar/MobileProductSearchBar";
import CategoryImages from "./CategoryImages";
import MobileCardCarousel from "../Carousel/MobileCardCarousel";
import MobileContactUs from "../ContactUs/MobileContactUs";

const MobileHomePage = () => {
    const { categories, loading, message } = useCategories();
    const [category, setCategory] = useState("Home");
    const { products, productsLoading } = useProducts(category);
    const [searchText, setSearchText] = useState("");
    console.log(categories)
    const filteredProducts = searchText.trim() === "" ? products : products.filter(product =>
        product.name?.toLowerCase().includes(searchText.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchText.toLowerCase())
    );

    return (
        <>
            {productsLoading && <IonLoading trigger="open-loading" message="Loading..." />}
            <MobileResponsiveMenu categories={categories} selectCategory={setCategory} currentCategory={category} />
            <IonPage id="main-content">
                <IonHeader >
                    <IonToolbar className='ion_toolbar'>
                        <IonButtons slot="start">
                            <IonMenuButton className='ion_menu_button'/>
                        </IonButtons>
                        <IonTitle >
                            <div className='ion_title'>    
                                <img src="https://res.cloudinary.com/dmm4awbwm/image/upload/f_auto,q_auto/tsee5mrm7cymclmefpic" alt="Kitten" height="30" width="30"/>
                                <IonText>{category === "ALL" || category === 'Home'? "Sri Krishna Party Rentals" : category}</IonText>                                  
                            </div>
                        </IonTitle>                    
                    </IonToolbar>
                </IonHeader>

                {
                    category === 'Home' ? 
                    <IonContent scrollEvents={true}>
                        <IonCard className='content'>
                            <IonCardContent>      
                                <IonText>                      
                                    <h1> It's Your Day, Make It Memorable! </h1><br/>
                                </IonText>                                
                                <IonText>
                                    <p> Srikrishna Party Rentals LLC is an event rental and event decoration services company located in Cordelia Ln, Tracy, CA 95377, United States. Our professional team can help you plan an amazing event Party Rentals that meets all of your needs. We provide everything from party rental supplies to custom decoration services. Our goal is to make every event memorable for you. </p>                            
                                </IonText>
                            </IonCardContent>
                        </IonCard>          
                        <IonItem>
                            <IonLabel style={{textAlign:'center'}}> Browse by categories </IonLabel>
                        </IonItem>                        
                        <div className="categories_cards">                                        
                            {['ALL',...categories].map((cat, index) => (
                                <IonCard key={index} onClick={()=>{setCategory(cat)}} className="category_card">                        
                                    <IonCardContent>                                        
                                        <img src={CategoryImages[cat]} height="100" width="100"/> <br/>
                                        <IonText>{cat} </IonText>
                                    </IonCardContent>
                                </IonCard>
                            ))}
                        </div>                        
                        <MobileCardCarousel/>      
                        <MobileContactUs/>    
                    </IonContent>
                    :
                    <>
                        <MobileProductSearchBar selectSearchText={setSearchText} />
                        <IonContent className="ion-padding">                    
                            <MobileProductCatalog products={filteredProducts} />
                            <MobileContactUs/>
                        </IonContent>
                    </>
                }
            </IonPage>
        </>
    );
};

export default MobileHomePage;
