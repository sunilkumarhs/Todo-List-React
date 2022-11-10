import React, { useState } from "react";
import desapp from "./desapp.css";

const Todo = () =>{

    const [todo, setTodo] = useState("");
    const [todos, setTodos] = useState([]);
    const [editId, setEditId] = useState(0);

    const handleSubmit = (e) => {
        e.preventDefault();

        if(editId) {
            const editTodo = todos.find((i) => i.id === editId);
            const updatedTodos = todos.map((t) => 
                t.id === editTodo.id 
                ? (t = {id:t.id, todo}) 
                : {id:t.id, todo : t.todo}
            );
            setTodos(updatedTodos);
            setEditId(0);
            setTodo("");
            document.querySelector('#inputText').focus();
            return;
        }

        if(todo !== "") {
            setTodos([...todos,{id:`${todo}-${Date.now()}`, todo }]);
            setTodo("");
            document.querySelector('#inputText').focus();

        }
    };

    const handleDelete = (id) => {
        document.querySelector('#inputText').focus();
        const deleteTodo = todos.filter((it) => it.id !== id);
        setTodos([...deleteTodo]);
    };

    const handleEdit = (id) => {
        document.querySelector('#inputText').focus();
        const editTodo = todos.find((i) => i.id === id);
        setTodo(editTodo.todo);
        setEditId(id);
    };

    return(
        <div className="applist">
            <div className="container">
            <h1>Todo List Application</h1>
            <form className="inputlist" onSubmit={handleSubmit}>
                <input 
                    type="text"
                    id="inputText"
                    value={todo}
                    onChange={(e) =>setTodo(e.target.value)}
                />
                <button className="insert" type="submit">{editId ? "Save" : "Insert"}</button>
            </form>
                <ul type="none" className="alltodos">
                    {todos.map((t) => (
                            <li className="singletodo">
                            <span className="todotext" key={t.id}>
                                {t.todo}
                            </span>
                            <button className="edit"onClick={() => handleEdit(t.id)}>Edit</button>
                            <button  className="delete" onClick={() => handleDelete(t.id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Todo;