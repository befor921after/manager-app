import axios from "axios";


const URL_API = "http://localhost:9000";

//-------------------------------( contacts )------------------------------------------------------

// url: "http://localhost:9000/contacts"
// method GET to get all Contacts
export function getAllContacts(){
    let url = `${URL_API}/contacts`;
    return axios.get(url);
}

// url: "http://localhost:9000/:contactId"
// method GET to get one contact
export function getContact(contactId){
    let url = `${URL_API}/contacts/${contactId}`;
    return axios.get(url);
}

// url: "http://localhost:9000/:contactId"
// method DELETE to delete one contact by contactId
export function deleteContact(contactId){
    let url = `${URL_API}/contacts/${contactId}`;
    return axios.delete(url);
}

// url: "http://localhost:9000/:contactId"
// method PUT to uppdate one contact
export function uppdateContact(newContact , contactId){
    let url = `${URL_API}/contacts/${contactId}`
    return axios.put(url , newContact);
}

//url: "http://localhost:9000/contacts"
// method POST to create one contact
export function createContact(contact){
    let url = `${URL_API}/contacts`;
    return axios.post(url , contact);
}

//-------------------------------( groups )------------------------------------------------------

// url: "http://localhost:9000/groups"
// method GET to get all Groups
export function getAllGroups(){
    let url = `${URL_API}/groups`;
    return axios.get(url);
}

// url: "http://localhost:9000/:groupId"
// method GET to get one group
export function getGroup(grouptId){
    let url = `${URL_API}/groups/${grouptId}`;
    return axios.get(url);
}

// url: "http://localhost:9000/:grouptId"
// method DELETE to delete one group by groupId
export function deleteGroup(groupId){
    let url = `${URL_API}/groups/${groupId}`;
    return axios.delete(url);
}

// url: "http://localhost:9000/:grouptId"
// method PUT to uppdate one group
export function uppdateGroup(newGroup , groupId){
    let url = `${URL_API}/contacts/${groupId}`
    return axios.put(url , newGroup);
}

//url: "http://localhost:9000/groups"
// method POST to create one group
export function createGroup(group){
    let url = `${URL_API}/groups`;
    return axios.post(url , group);
}