import {Link} from "react-router-dom";
import { useContext } from "react";
import {Form , Field  , Formik , ErrorMessage} from "formik";
import {PURPLE , GREEN , COMMENT, CURRENTLINE} from "../../helper/colors";
import Spinner from "../Spinner";
import { ContactContext } from "../../context/contactContext";
import {ContactSchema} from "../../validation/validationYup";

const AddContact = ()=>{
    const {loading , groups , createContact} = useContext(ContactContext);
    return(
        <>
            {loading?<Spinner />:(
                <section className="p-3">
                    <img 
                    src={require("../../assets/man-taking-note.png")}
                    height="400px"
                    style={{
                        position:"absolute",
                        top:"130px",
                        left:"100px",
                        zIndex:"-1",
                        opacity:"50%",
                    }}/>
                    <div className="container">
                        <div className="row">
                            <div className="col">
                                <p className="text-center fw-bold h4" style={{color:GREEN}}>
                                    ساخت مخاطب جدید
                                </p>
                            </div>
                        </div>
                        <hr style={{backgroundColor:GREEN}}/>
                        <div className="row mt-5">
                            <div className="col-md-4">
                                <Formik initialValues={
                                    {
                                        fullname:"",
                                        photo:"",
                                        email:"",
                                        mobile:"",
                                        job:"",
                                        group:""
                                    }
                                }
                                validationSchema={ContactSchema}
                                onSubmit={(value)=>{createContact(value)}}>
                                    <Form>
                                        <div className="mb-2">
                                            <Field 
                                            name="fullname"
                                            type="text"
                                            className="form-control"
                                            placeholder="نام و نام خانوادگی"/>
                                            <ErrorMessage name="fullname"
                                            render={(msg)=>(<div className="text-danger">{msg}</div>)}/>
                                        </div>
                                            <div className="mb-2">
                                                <Field  
                                                name="photo"
                                                type="text"
                                                placeholder="آدرس تصویر"
                                                className="form-control"
                                                />
                                                <ErrorMessage 
                                                name="photo"
                                                render={(msg)=>(<div className="text-danger">{msg}</div>)}/>
                                            </div>
                                            <div className="mb-2">
                                                <Field 
                                                name="mobile"
                                                type="number"
                                                className="form-control"
                                                placeholder="شماره موبایل"/>
                                                <ErrorMessage 
                                                name="mobile"
                                                render={(msg)=>(<div className="text-danger">{msg}</div>)}/>
                                            </div>
                                            <div className="mb-2">
                                                <Field 
                                                name="email"
                                                type="email"
                                                className="form-control"
                                                placeholder="آدرس ایمیل"/>
                                                <ErrorMessage 
                                                name="email"
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
                                                <Field 
                                                name="group"
                                                as="select"
                                                className="form-control">
                                                    <option value="">
                                                        انتخاب گروه
                                                    </option>
                                                    {groups.length>0 && groups.map(gro =>(
                                                        <option key={gro.id} value={gro.id}>{gro.name}</option>
                                                    ))}
                                                </Field>
                                                <ErrorMessage 
                                                name="group"
                                                render={(msg)=>(<div className="text-danger">{msg}</div>)}/>
                                            </div>
                                            <div className="mx-2">
                                                <input 
                                                type="submit"
                                                value="ساخت مخاطب جدید"
                                                className="btn"
                                                style={{backgroundColor:PURPLE}}/>
                                                <Link to="/contacts" className="btn mx-2" 
                                                style={{backgroundColor:COMMENT}}>انصراف</Link>
                                            </div>
                                    </Form>
                                </Formik>
                            </div>
                        </div>
                    </div>
                </section>
            )}
        </>
    );
}
export default AddContact;