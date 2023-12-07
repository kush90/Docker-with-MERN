import React, { useState, useEffect } from "react";
import axios from 'axios';
import "./App.css";

function App() {
  const [items, setItems] = useState([]);
  const [id,setId] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [editState,setEditState] = useState(false);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const response = await axios.get('http://127.0.0.1:4000/api/getAll');
    if(response.data.length > 0) setItems(response.data);
    else setItems([]);
  };

  const addItem =async function() {
      await axios.post('http://127.0.0.1:4000/api/post', { name, description });
      fetchItems();
      setName('');
      setDescription('');
  };

  const editItem =  async (id) => {
    let selectItem = items.filter(item=>item._id === id)[0];
    setId(id);
    setName(selectItem.name);
    setDescription(selectItem.description);
    setEditState(true);
  }
  const update = async()=>{
    await axios.patch(`http://127.0.0.1:4000/api/update/${id}`,{name,description});
    fetchItems();
    setId('');
    setName('');
    setDescription('');
    setEditState(false);
  }

  const cancel = ()=>{
    setName('');
    setDescription('');
    setEditState(false);
  }

  const deleteItem = async (id) => {
    let result= alert('Are you sure want to delete');
    console.log(result)
    await axios.delete(`http://127.0.0.1:4000/api/delete/${id}`);
    fetchItems();
  };

  return (
    <div>
      <h1>MERN STACK (Mongodb,ExpressJS,ReactJS,NodeJS)</h1>
      <div className="form">
        <input
          className="mr"
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
         className="mr"
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
       {editState == true
        ? <><button className="mr"onClick={update}> Update</button>
          <button  className="mr" onClick={cancel}>Cancel</button>
        </>
        : <button  className="mr" onClick={addItem}>Add</button>
      }
        
        
      
      </div>
      <ul className="list">
        {items.map((item) => (
          <li  key={item._id}>
            {item.name} - {item.description}
            <button className="delete" onClick={() => editItem(item._id)}>Edit</button>
            <button className="delete" onClick={() => deleteItem(item._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App