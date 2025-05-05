import {
    IonAccordionGroup,
    IonAccordion,
    IonItem,
    IonLabel,
    IonMenuToggle,
    IonMenu,
    IonContent,
    IonIcon
  } from '@ionic/react';
  import { useState } from 'react';
  
  const MobileResponsiveMenu = ({ categories, selectCategory, currentCategory }) => {
    const [selectedCategory, setSelectedCategory] = useState(currentCategory || "Home");
  
    const handleCategoryChange = (category) => {
      setSelectedCategory(category);
      selectCategory(category);
    };
  
    return (
      <IonMenu contentId="main-content">
        <IonContent>
  
          {/* Home */}
          <IonMenuToggle>
            <IonItem button onClick={() => handleCategoryChange('Home')}>
              <IonLabel>Home</IonLabel>
            </IonItem>
          </IonMenuToggle>
  
          {/* Accordion for Categories */}
          <IonAccordionGroup>
            <IonAccordion value="categories">
              <IonItem slot="header">
                <IonLabel>Categories</IonLabel>                
              </IonItem>
              <div className="ion-padding" slot="content">
                <IonMenuToggle>
                  <IonItem button onClick={() => handleCategoryChange('ALL')}>
                    <IonLabel>All</IonLabel>
                  </IonItem>
                </IonMenuToggle>
  
                {categories.map((cat, index) => (
                  <IonMenuToggle key={index}>
                    <IonItem button onClick={() => handleCategoryChange(cat)}>
                      <IonLabel>{cat}</IonLabel>
                    </IonItem>
                  </IonMenuToggle>
                ))}
              </div>
            </IonAccordion>
          </IonAccordionGroup>
  
        </IonContent>
      </IonMenu>
    );
  };
  
  export default MobileResponsiveMenu;
  