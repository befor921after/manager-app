import {PURPLE} from "../../helper/colors";
import { useContext } from "react";
import { ContactContext } from "../../context/contactContext";
import {BiSearchAlt} from 'react-icons/bi'
const SearchContacts = ()=>{
     const {contactSearch} = useContext(ContactContext);
    return(
        <>
            <div style={{direction:"ltr"}} className="mx-2 w-75 input-group">
                <span className="input-group-text" 
                id="basic-addon1"
                style={{backgroundColor:PURPLE}}>
                    <BiSearchAlt style={{fontSize:"1.4em"}}/>
                </span>
                <input 
                type="text"
                onChange={(e)=>contactSearch(e.target.value)}
                placeholder="جست و جوی مخاطب..."
                aria-label="Search"
                aria-describedby="basic-addon1"
                dir="rtl"
                className="form-control"/>
            </div>
        </>
    );
}
export default SearchContacts;