import { TextField, Typography } from "@mui/material";
import { useState } from "react";

const ProductSearchBar = ({selectSearchText}) => {
    const [searchText,setSearchText] = useState('')
    return(
        
            
            <TextField 
                fullWidth id="outlined-basic" 
                label="Search Products" 
                variant="outlined" 
                onChange={(e)=>{setSearchText(e.target.value); selectSearchText(e.target.value);}}
                value={searchText}
            />
        
    )
}

export default ProductSearchBar;