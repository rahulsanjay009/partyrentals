import {
    IonButtons,
    IonContent,
    IonHeader,
    IonMenuButton,
    IonPage,
    IonTitle,
    IonToolbar
} from "@ionic/react";
import { useEffect, useState } from "react";

import MobileResponsiveMenu from "./MobileResponsiveMenu";
import useCategories from "../../utils/useCategories";
import useProducts from "../../utils/useProducts";
import MobileProductCatalog from "../ProductCatalog/MobileProductCatalog";
import MobileProductSearchBar from "../ProductSearchBar/MobileProductSearchBar";

const MobileHomePage = () => {
    const { categories, loading, message } = useCategories();
    const [category, setCategory] = useState("ALL");
    const { products } = useProducts(category);
    const [searchText, setSearchText] = useState("");

    const filteredProducts = searchText.trim() ==="" ? products : products.filter(product =>
        product.name?.toLowerCase().includes(searchText.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchText.toLowerCase())
    );


    return (
        <>
            <MobileResponsiveMenu categories={categories} selectCategory={setCategory} />
            <IonPage id="main-content">
                <IonHeader >
                    <IonToolbar className='ion_title'>
                        <IonButtons slot="start">
                            <IonMenuButton />
                        </IonButtons>
                        <IonTitle >
                            {category === "ALL" ? "Sri Krishna Party Rentals" : category}
                        </IonTitle>
                    </IonToolbar>
                </IonHeader>
                <MobileProductSearchBar selectSearchText={setSearchText} />
                <IonContent className="ion-padding">                    
                    <MobileProductCatalog products={filteredProducts} />
                </IonContent>
            </IonPage>
        </>
    );
};

export default MobileHomePage;
