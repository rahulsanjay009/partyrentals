import React, { useState } from 'react';
import {
  IonMenu,
  IonContent,
  IonItem,
  IonLabel,
  IonMenuToggle,
  IonIcon,
} from '@ionic/react';


const MobileResponsiveMenu = ({ categories, selectCategory, currentCategory }) => {
  const [selectedCategory, setSelectedCategory] = useState(currentCategory || "Home");
  const [expanded, setExpanded] = useState(false);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category); // Set the selected category
    selectCategory(category); // Trigger the selection in the parent component
    setExpanded(false); // Collapse categories after selection
  };

  return (
    <IonMenu contentId="main-content">
      <IonContent>
        {/* Home button */}
        <IonMenuToggle>
          <IonItem button onClick={() => handleCategoryChange('Home')}>
            <IonLabel>Home</IonLabel>
          </IonItem>
        </IonMenuToggle>

        {/* Categories toggle button */}
        <IonItem button onClick={() => setExpanded(!expanded)} className='categories'>
          <IonLabel>Categories</IonLabel>
          <IonLabel> {expanded? '-' : '+'} </IonLabel>
        </IonItem>

        {/* Category list with sliding effect */}
        <div className={`category-list ${expanded ? 'expanded' : ''}`}>
            <IonMenuToggle key={'ALL'}>
              <IonItem button onClick={() => handleCategoryChange('ALL')}>
                <IonLabel>{'All'}</IonLabel>
              </IonItem>
            </IonMenuToggle>
          {expanded && categories.map((cat, index) => (
            <IonMenuToggle key={index}>
              <IonItem button onClick={() => handleCategoryChange(cat)}>
                <IonLabel>{cat}</IonLabel>
              </IonItem>
            </IonMenuToggle>
          ))}
        </div>
      </IonContent>
    </IonMenu>
  );
};

export default MobileResponsiveMenu;
