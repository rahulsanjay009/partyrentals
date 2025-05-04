import {  IonContent, IonHeader, IonItem, IonList, IonMenu,  IonMenuToggle,  IonTitle, IonToolbar } from "@ionic/react";

const MobileResponsiveMenu = ({categories, selectCategory}) => {

    return (        
             <IonMenu side="start" contentId="main-content">
                <IonHeader>
                <IonToolbar>
                    <IonTitle>Categories</IonTitle>
                </IonToolbar>
                </IonHeader>
                <IonContent>
                <IonList>
                <IonMenuToggle>
                    <IonItem
                        key={'All'}
                        button
                        onClick={async () => {
                            selectCategory('ALL')
                        }}
                    >
                        All
                    </IonItem>
                    </IonMenuToggle>
                    {categories.map((category) => (
                    <IonMenuToggle key={category}>
                    <IonItem
                        key={category}
                        button
                        onClick={async () => {
                            selectCategory(category)
                        }}
                    >
                        {category}
                    </IonItem>
                    </IonMenuToggle>
                    ))}
                </IonList>
                </IonContent>
            </IonMenu>           
       
    );
}

export default MobileResponsiveMenu;