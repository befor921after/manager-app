import {useEffect} from "react";
import {useNavigate , Navigate , Route , Routes } from "react-router-dom";
import {confirmAlert} from "react-confirm-alert";
import {useImmer} from "use-immer";
import { ToastContainer, toast } from "react-toastify";
import _ from "lodash";
import { ContactContext } from "./context/contactContext";
import {Contacts , AddContact , EditContact , ViewContact , Navbar} from "./components";
import {getAllContacts , getAllGroups, createContact , deleteContact} from "./services/apiMethods";
import {FOREGROUND , CURRENTLINE , PURPLE , COMMENT , YELLOW} from "./helper/colors";

function App() {
  const [loading , setLoading] = useImmer(false);
  const [contacts , setContacts] = useImmer([]);
  const [filteredContacts , setFilteredContacts]= useImmer([]);
  const [groups , setGroups] = useImmer([]);

  const navigate = useNavigate();


  useEffect(()=>{
    const fetchData = async()=>{
        try{
            setLoading(true);
              const {data : contactsData } = await getAllContacts();
              const {data : groupsData} = await getAllGroups();
              setContacts(contactsData);
              setGroups(groupsData);
              setFilteredContacts(contactsData);
            setLoading(false);
        }catch(err){
          console.log(err.message);
          setLoading(false);
        }
    }
    fetchData();
  },[]);

  const createContactForm = async(values)=>{
    try{
      setLoading(true);
      const {data , status} = await createContact(values);
      if(status===201){
        toast.success("مخاطب با موفقیت ایجاد شد !" ,{icons:"🚀"});
        setContacts(draft=> {draft.push(data)});
        setFilteredContacts(draft=>{draft.push(data)});
        setLoading(false);
        navigate("/contacts");
      }
    }catch(err){
      console.log(err.message);
      setLoading(false);
      toast.error("خطایی رخ داده !!!");
      navigate("/contacts");
    }
  }

  const ConfirmDelete = (contactId , contactfullname)=>{
    confirmAlert({
      customUI:(({onClose})=>{
        return(
          <>
            <div dir="rtl"
            style={{
              border:`1px solid ${PURPLE}`,
              borderRadius:"1em",
              backgroundColor:CURRENTLINE
            }}
            className="p-4">
              <h1 style={{color:YELLOW }}>حذف مخاطب</h1>
              <p style={{color:FOREGROUND}}>ایا مطمئنی میخوای {contactfullname} رو حذف کنی ؟</p>
              <button  
                onClick={()=> {
                  onClose();
                  removeContact(contactId);
                  }}
                style={{backgroundColor:COMMENT}}
                className="btn mx-2">حذف مخاطب</button>

                <button className="btn" onClick={onClose}
                style={{background:YELLOW}}>انصراف</button>
                
            </div>
          </>
        )
      })
    });
  }

  const removeContact = async(contactId)=>{
    const backupcontact = [...contacts];
    try{
      
      setContacts(draft=> draft.filter((c)=>c.id!==contactId));
      setFilteredContacts(draft => draft.filter((c)=>c.id!==contactId));

      const {status} =await deleteContact(contactId);
      toast.success("مخاطب با موفقیت حذف شد !" , {icons:"💣"});
      navigate("/contacts");
      if(status!==200){
        setContacts(backupcontact);
        setFilteredContacts(backupcontact);

      }
    }catch(err){
      console.log(err.message);
      setContacts(backupcontact);
      setFilteredContacts(backupcontact);
    }
  }

 const contactSearch = _.debounce((query)=>{
  console.log(query);
  if(!query) return setFilteredContacts([...contacts]);
  setFilteredContacts((draft)=>draft.filter((c)=> c.fullname.toLowerCase().includes(query.toLowerCase()))
  )
 },1000);
  return (
    <ContactContext.Provider value={{
      loading,
      setLoading ,
      contacts ,
      setContacts,
      filteredContacts ,
      setFilteredContacts,
      groups , 
      contactSearch ,
      deleteContact : ConfirmDelete,
      createContact : createContactForm
    }}>
        <div className="App">
          <ToastContainer />
          <Navbar />
          <Routes>
            <Route path="/" element={<Navigate to="/contacts"/>}/>
            <Route path="contacts" element={<Contacts />}/>
            <Route path="contacts/:contactId" element={<ViewContact />}/>
            <Route path="contacts/add" element={<AddContact />}/>
            <Route path="contacts/edit/:contactId" element={<EditContact />}/>
          </Routes>
        </div>
    </ContactContext.Provider>
  );
}

export default App;
