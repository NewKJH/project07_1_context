import "./ContactItem.css";
import { memo, useContext } from "react";
import {ContactDispatchContext } from "../App";

function ContactItem({ id, name, content }) {
  
  const {onDelete} = useContext(ContactDispatchContext)

  const onClickDeleteButton = () => {
    onDelete(id)
  }

  return (
    <div className="ContactItem">
      <div className="name">{name}</div>
      <div className="contact">{content}</div>
      <button onClick={onClickDeleteButton}>🗑️ Remove</button>
    </div>
  );
}

export default memo(ContactItem);
