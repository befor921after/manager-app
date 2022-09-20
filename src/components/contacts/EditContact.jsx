import { useEffect , useContext } from "react";
import {Link , useNavigate , useParams} from "react-router-dom";
import {Form , Field , ErrorMessage , Formik, FastField} from "formik";
import {useImmer} from "use-immer";
import { toast } from "react-toastify";
import {getContact , uppdateContact} from "../../services/apiMethods";
import {COMMENT , PURPLE , ORANGE} from "../../helper/colors";
import Spinner from "../Spinner";
import {ContactSchema} from "../../validation/validationYup";
import {ContactContext} from "../../context/contactContext";
const EditContact = ()=>{
    const {contactId} = useParams();
    const {loading , setLoading , setFilteredContacts , setContacts , groups} = useContext(ContactContext);
    const navigate = useNavigate();
    const [contact , setContact] = useImmer({});

    useEffect(()=>{
        const fetchData = async()=>{
            try{
                
                setLoading(true);
                const {data : contactData } = await getContact(contactId);
                setLoading(false);
                setContact(contactData);
            }catch(err){
                console.log(err.message);
                setLoading(false);
            }
        }
        fetchData();
    },[]);


    const submitForm  = async (enteredContact)=>{
        try{
            setLoading(true);
            const {data , status} =await uppdateContact(enteredContact , contactId);
            console.log(status , data);
            if(status===200){
                setLoading(false);
                toast.success("مخاطب با موفقیت ثبت شد !" ,{icon:"✅"});
                setContacts((draft)=>{
                    const indexContact = draft.findIndex((c)=>c.id===parseInt(contactId));
                    draft[indexContact] = {...data};
                    console.log(draft);
                });
                setFilteredContacts((draft)=>{
                    const indexFiltered = draft.findIndex(c=>c.id===parseInt(contactId))
                    draft[indexFiltered] = {...data}
                    console.log(draft);
                });
                
                navigate("/contacts");
            }
        }catch(err){
            console.log(err.message);
            setLoading(false);
        }
    }
    return(<>
        {loading?<Spinner />:
        (
            <>
                <section className="p-3">
                    <div className="container">
                        <div className="row my-2">
                            <div className="col text-center">
                                <p className="h4 fw-bold" style={{color: ORANGE}}>
                                    ویرایش مخاطب
                                </p>
                            </div>
                        </div>
                        <hr style={{backgroundColor:ORANGE}}/>
                        <div className="row p-2 w-75 align-items-center mx-auto"
                        style={{backgroundColor:"#44475a" , borderRadius:"1em"}}>
                            <div className="col-md-8">
                                <Formik 
                                initialValues={contact}
                                validationSchema={ContactSchema}
                                onSubmit={(value)=>submitForm(value)}>
                                    <Form>
                                         <div className="mb-2">
                                            <Field 
                                            name="fullname"
                                            className="form-control"
                                            type="text"
                                            placeholder="نام و نام خانوادگی"/>
                                            <ErrorMessage name="fullname"
                                            render={(msg)=>(<div className="text-danger">{msg}</div>)}/>
                                         </div>
                                         <div className="mb-2">
                                            <Field 
                                                name="photo"
                                                className="form-control"
                                                type="text"
                                                placeholder="آدرس عکس"/>
                                            <ErrorMessage name="photo"
                                                render={(msg)=>(<div className="text-danger">{msg}</div>)}
                                                />
                                         </div>
                                         <div className="mb-2">
                                            <Field 
                                                name="mobile"
                                                type="number"
                                                className="form-control"
                                                placeholder="شماره موبایل"/>
                                            <ErrorMessage  name="mobile"
                                            render={(msg)=>(<div className="text-danger">{msg}</div>)}/>
                                         </div>
                                         <div className="mb-2">
                                            <Field 
                                                name="email"
                                                type="email"
                                                className="form-control"
                                                placeholder="ایمیل"/>
                                            <ErrorMessage name="email"
                                            render={(msg)=>(<div className="text-danger">{msg}</div>)}/>
                                         </div>
                                         <div className="mb-2">
                                            <Field 
                                                name="job"
                                                type="text"
                                                className="form-control"
                                                placeholder="شغل"/>
                                            <ErrorMessage name="job"
                                            render={(msg)=>(<div className="text-danger">{msg}</div>)}/>
                                         </div>
                                         <div className="mb-2">
                                            <Field name="group" as="select" className="form-control">
                                                <option value="">انتخاب گروه</option>
                                                {groups.length>0 &&
                                                groups.map(gro=>(<option key={gro.id} value={gro.id}>{gro.name}</option>))}
                                            </Field>
                                            <ErrorMessage name="group" 
                                                render={(msg)=>(<div className="form-control">{msg}</div>)}/>
                                         </div>
                                         <div className="mx-2">
                                            <input 
                                            type="submit"
                                            className="btn"
                                            value="ویرایش مخاطبین"
                                            style={{backgroundColor:PURPLE}}/>
                                            <Link to="/contacts" className="btn mx-2" 
                                            style={{backgroundColor:COMMENT}}>
                                                انصراف
                                            </Link>
                                         </div>
                                    </Form>
                                </Formik>
                            </div>
                            <div className="col-md-4">
                                <img 
                                src={contact.photo}
                                alt={contact.fullname}
                                className="img-fluid rounded"
                                style={{ border:`1px solid ${PURPLE}`}}/>
                            </div>
                        </div>
                    </div>
                    <div className="mt-2 text-center">
                        <img
                        src={require("../../assets/man-taking-note.png")}
                        height="300px"
                        style={{opacity:"50%"}}/>
                    </div>
                </section>
            </>
        )}
    </>);
}
export default EditContact;