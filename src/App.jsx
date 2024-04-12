import "./App.css";
import { useState, useRef, useReducer } from "react";
import ContactEditor from "./components/ContactEditor";
import ContactList from "./components/ContactList";
import { useCallback, createContext, useMemo } from "react";

const mockData = [
  {
    id:0,
    name : "이정환",
    content: "king1997@gmail.com",
  },
  {
    id:1,
    name : "한입스튜디오",
    content: "onbite.fe@gmail.com",
  },
]

function reducer(state, action) {
  switch (action.type) {
    case 'CREATE' : return [action.data, ...state];
    case 'DELETE': return state.filter((item) => item.id !== action.targetId);
    default: return state;
  }
}

export const ContactStateContext = createContext();
export const ContactDispatchContext = createContext();

function App() {
  const [contacts, dispatch] = useReducer(reducer, mockData);
  const idRef = useRef(2);

  const onCreate = useCallback((name, content) => {
    dispatch({
      type: "CREATE",
      data: {
        id: idRef.current++,
        name:name,
        content: content,
      }
    })
  },[])

  const onDelete = useCallback((targetId) => {
    dispatch({
      type: "DELETE",
      targetId:targetId
    })
  }, [])
  
  const memoizedDispatches = useMemo(() => (
    { onCreate, onDelete })
  ,[]);

  return (
    <div className="App">
      <h2>Contact List</h2>
      <ContactStateContext.Provider value={contacts}>
        <ContactDispatchContext.Provider value={memoizedDispatches}>
          <section>
            <ContactEditor />
          </section>
          <section>
            <ContactList />
          </section>
        </ContactDispatchContext.Provider>
      </ContactStateContext.Provider>
    </div>
  );
}

export default App;
