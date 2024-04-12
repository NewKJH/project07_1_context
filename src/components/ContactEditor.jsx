import "./ContactEditor.css";
import { useState, useRef, useContext } from "react";
import { ContactDispatchContext } from "../App";

export default function ContactEditor() {
  const {onCreate} = useContext(ContactDispatchContext)
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const nameRef = useRef();
  const contentRef = useRef();

  const onChangeName = (e) => {
      setName(e.target.value)
  }

  const onChangeContent = (e) => {
      setContent(e.target.value)
  }

  const onKeydown = (e) => {
      if (e.keyCode === 13) {
          onSubmit();
      }
  }

  const onSubmit = () => {
      if (name === "") {
        alert('이름을 입력해주세요');
        nameRef.current.focus();
        return;
      } else if (content === "") {
        alert('연락처(이메일)를 입력해주세요');
        contentRef.current.focus();
        return;
      }
    
      onCreate(name, content);
      setName("");
      setContent("");
  }

  return (
    <div className="ContactEditor">
      <div className="title">Add Contact</div>
      <div className="input_wrapper">
        <input ref={nameRef} value={name} onChange={onChangeName} onKeyDown={onKeydown} className="name" placeholder="이름 ..." />
        <input ref={contentRef} value={content} onChange={onChangeContent} onKeyDown={onKeydown} className="contact" placeholder="연락처(이메일) ..." />
      </div>
      <button onClick={onSubmit}>Add</button>
    </div>
  );
}
