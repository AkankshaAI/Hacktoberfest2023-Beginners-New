
import React, { useState } from 'react';



const AddTodo = (props) => {
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");

    const submit=(e) => {
        e.preventDefault();
        if(!title || !desc){
            alert("title or description cannot be blank");
        }
        else{
        props.addTodo(title, desc);
        setTitle(" ");
        setDesc("");
        }}
  return (
    <div className='container'>
        <h3 className='text-center'>Add Todo</h3>
        <form onSubmit={submit}>
  <div className="mb-3">
    <label forhtml="tittle" className="form-label">Todo Title</label>
    <input type="text" value={title} onChange={(e)=>{setTitle(e.target.value)}} className="form-control" id="title" aria-describedby="emailHelp"/>
    
  </div>
  <div className="mb-3">
    <label forhtml="desc" className="form-label">Todo Description</label>
    <input type="text" value={desc} onChange={(e)=>{setDesc(e.target.value)}} className="form-control" id="desc"/>
  </div>
  
  <button type="submit" className="btn btn-sm btn-success">Add Todo</button>
  
</form>
      
    </div>
  )
}

export default AddTodo
