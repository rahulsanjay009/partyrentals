import { IonSearchbar } from "@ionic/react";
import { useState } from "react";

const MobileProductSearchBar = ({selectSearchText}) => {
    const [searchText,setSearchText] = useState('')
    return (
        
        <IonSearchbar
            value={searchText}
            onIonInput={(e)=>{setSearchText(e.target.value); selectSearchText(e.target.value);}}
            debounce={300}
            placeholder="Search products..."
            showClearButton="focus"
        />
   
    )
}

export default MobileProductSearchBar;