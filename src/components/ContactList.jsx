import "./ContactList.css";
import ContactItem from "./ContactItem";
import { useContext } from "react";
import { ContactStateContext, ContactDispatchContext } from "../App";

export default function ContactList() {
  const contacts = useContext(ContactStateContext);
  const { onDelete } = useContext(ContactDispatchContext);

  const getFilterdData = () => {
    return contacts.filter((contact) => contact.content);
}

  const filteredContacts = getFilterdData();
  
  return (
    <div className="ContactList">
      <div className="title">Contact List</div>
      {filteredContacts.map((contact) => {
        return <ContactItem className="ContactItem" key={contacts.id} {...contact} onDelete={onDelete} />;
      })}
    </div>
  );
}
