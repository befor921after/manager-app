import {Link} from 'react-router-dom';
import Contact from "./Contact";
import {CURRENTLINE , ORANGE  , PINK} from "../../helper/colors";
import { useContext } from 'react';
import {ContactContext} from "../../context/contactContext";
import {ImUserPlus} from 'react-icons/im';
import Spinner from "../Spinner";
const Contacts = ()=>{
    const {loading , deleteContact , filteredContacts} = useContext(ContactContext);

    return(
        <>
            <section className='container'>
                <div className='grid'>
                    <div className='row'>
                        <div className='col'>
                            <p className='h3 float-end'>
                                <Link to="/contacts/add" className='btn m-4' style={{backgroundColor: PINK}}>
                                    ساخت مخاطب جدید
                                    <ImUserPlus style={{margin:"2px"}}/>
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            {loading?<Spinner />:(
                <section className='container'>
                    <div className='row'>
                        {filteredContacts.length>0?
                        (filteredContacts.map((c)=>(
                            <Contact 
                            key={c.id}
                            contact={c}
                            deleteContact={()=> deleteContact(c.id , c.fullname)}/>
                        ))):(
                            <div className='text-center py-5' style={{backgroundColor: CURRENTLINE}}>
                                <p className='h3' style={{color:ORANGE}}>
                                    مخاطب یافت نشد...
                                </p>
                                <img 
                                    src={require("../../assets/no-found.gif")}
                                    alt="مخاطب یافت نشد"
                                    className='w-25'
                                />
                            </div>
                        )}
                    </div>
                </section>
            )}
        </>
    );
}
export default Contacts;