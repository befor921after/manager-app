import {useLocation} from "react-router-dom";
import {BACKGROUND , PURPLE} from "../helper/colors";
import SearchContacts from "./contacts/SearchContacts";
import {MdBadge} from "react-icons/md"

const Navbar = ()=>{
     const location = useLocation();

    return(
        <>
            <nav className="navbar navbar-dark navbar-expand-sm shadow-lg" 
            style={{backgroundColor:BACKGROUND}}>
                <div className="container">
                    <div className="row w-100">
                        <div className="col">
                            <div className="navbar-brand">
                            <MdBadge/> وب
                                اپلیکیشن مدیریت {`   `}
                                <span style={{color:PURPLE}}>مخاطبین</span>
                            </div>
                        </div>
                    
                        {location.pathname==="/contacts"? <div className="col"><SearchContacts/></div>:null} 
                    </div>
                </div>
            </nav>
        </>
    );
}
export default Navbar;