import {Link} from "react-router-dom";
import {CYAN , PURPLE , BACKGROUND , RED , ORANGE, CURRENTLINE} from "../../helper/colors";
import {AiOutlineEye} from "react-icons/ai";
import {FaPencilAlt} from "react-icons/fa";
import {FaRegTrashAlt} from "react-icons/fa";
const Contact = ({contact , deleteContact})=>{
    return(
        <>
            <div className="col-md-6">
                <div style={{backgroundColor:CURRENTLINE}} className="card my-2">
                    <div className="card-body">
                        <div className="row d-flex align-items-center justify-content-around">
                            <div className="col-md-4 col-sm-4">
                                <img 
                                src={contact.photo}
                                alt={contact.fullname}
                                style={{border:`1px solid ${PURPLE}`}}
                                className="img-fluid rounded"
                                />
                            </div>
                            <div className="col-md-7 col-sm-7">
                                <ul className="list-group">
                                    <li className="list-group-item list-group-item-dark">
                                        نام و نام خانوادگی:{"   "}
                                        <span className="fw-bold">{contact.fullname}</span>
                                    </li>
                                    <li className="list-group-item list-group-item-dark">
                                            شماره موبایل:{"   "}
                                            <span className="fw-bold">{contact.mobile}</span>
                                    </li>
                                    <li className="list-group-item list-group-item-dark">
                                        آدرس ایمیل:{"   "}
                                        <span className="fw-bold">{contact.email}</span>
                                    </li>

                                </ul>
                            </div>
                            <div className="col-md-1 col-sm-1 d-flex flex-column align-items-center">
                                <Link to={`/contacts/${contact.id}`} className="btn my-1" style={{backgroundColor:ORANGE}}>
                                    <AiOutlineEye style={{fontWeight:"bold"}}/>
                                </Link>
                                <Link to={`/contacts/edit/${contact.id}`} className="btn my-1" style={{backgroundColor:CYAN}}>
                                    <FaPencilAlt />
                                </Link>
                                <button className="btn my-1" onClick={deleteContact} style={{backgroundColor:RED}}>
                                    <FaRegTrashAlt />
                                </button>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default Contact;