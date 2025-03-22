import { useState, useEffect } from "react";
import './App.css';
import { Navbar } from "./component/Navbar";
import { v4 as uuidv4 } from 'uuid';

function App() {
    const [name, setname] = useState("Add");
    const [todo, setTodo] = useState("");
    const [todos, setTodos] = useState([]);
    const [showfinish, setshowfinish] = useState(true);

    // Load todos from localStorage when component mounts
    useEffect(() => {
        const storedTodos = localStorage.getItem("todos");
        if (storedTodos) {
            setTodos(JSON.parse(storedTodos)); 
        }
    }, []);

    // Save todos to localStorage whenever `todos` changes
    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos]); 

    const togglefinish = () => {
        setshowfinish(!showfinish);
    };

    const handleAdd = () => {
        if (todo.trim() === "") {
            alert("Todo cannot be empty!");
            return;
        }
        setTodos([...todos, { id: uuidv4(), todo, isComplated: false }]);
        setTodo("");
        setname("Add");
    };

    const handleEdit = (id) => {
        const targetTodo = todos.find(i => i.id === id);
        setTodo(targetTodo.todo);
        setTodos(todos.filter(item => item.id !== id));
        setname("Update");
    };

    const handleDelete = (id) => {
        if (!window.confirm("Are you sure you want to delete this todo?")) return;
        setTodos(todos.filter(item => item.id !== id));
    };

    const handleCheckbox = (id) => {
        setTodos(todos.map(item =>
            item.id === id ? { ...item, isComplated: !item.isComplated } : item
        ));
    };

    const handleReset = () => {
        if (!window.confirm("Are you sure you want to clear all todos?")) return;
        setTodos([]);
    };

    return (
        <div className='bg-gray-900 min-h-[100vh]'>
            <Navbar />
            <div className="md:mx-auto md:container mx-3 my-5 rounded-xl p-5 bg-slate-700 min-h-[80vh] md:w-1/2">
                <div className='addTodo'>
                    <h1 className='font-bold text-yellow-400 ml-1 font-rubikVinyl text-2xl'>Make Your </h1>
                    <div className="flex gap-4">
                        <input 
                            type='text' 
                            onChange={(e) => setTodo(e.target.value)} 
                            placeholder="Enter a task" 
                            value={todo} 
                            className='font-rubikVinyl text-center text-sm font-bold rounded-md text-yellow-400 w-1/2 bg-gray-400 border-yellow-400-solid px-5'/>
                        <button 
                            className='font-bold bg-yellow-400 rounded-md w-36 hover:bg-yellow-500 font-rubikVinyl' 
                            disabled={todo.trim() === ""} 
                            onClick={handleAdd}>
                            {name}
                        </button>
                    </div>
                </div>
                <div className="justify-center align-middle">
                    <button 
                        className="font-bold bg-red-500 font-rubikVinyl text-white rounded-md px-4 py-2 mt-4 hover:bg-red-600" 
                        onClick={handleReset}>
                        Clear All
                    </button>
                    <input 
                        type="checkbox" 
                        className="w-5 h-5 accent-yellow-500 cursor-pointer ml-12 text-center" 
                        checked={showfinish} 
                        onChange={togglefinish} 
                    />
                    <span className="ml-3 font-rubikVinyl text-yellow-400 font-bold">Show finished</span>
                </div>
                <p className="font-bold text-yellow-400 my-7 mt-10 mb-1.5 font-rubikVinyl text-xl w-1/2">Your Todos</p>
                <div className="todos text-yellow-400 font-bold font-rubikVinyl">
                    {todos.length === 0 && <div className="text-yellow-500 text-sm">No todos to display</div>}
                    {todos.map(item => (
                        (showfinish || !item.isComplated) && 
                        <div key={item.id} className="todo w-24 flex justify-between mt-7">
                            <input 
                                type="checkbox" 
                                checked={item.isComplated} 
                                onChange={() => handleCheckbox(item.id)} 
                                className="w-5 h-5 accent-yellow-500 cursor-pointer"
                            />
                            <div className={item.isComplated ? "line-through text-gray-500 ml-10" : "text-yellow-400 ml-10"}>
                                {item.todo}
                            </div>
                            <div className="flex gap-2 ml-20">
                                <button 
                                    className='font-bold bg-blue-400 text-yellow-950 rounded-md px-4 hover:bg-yellow-600 text-sm py-1' 
                                    onClick={() => handleEdit(item.id)}>
                                    Edit
                                </button>
                                <button 
                                    className='font-bold bg-red-400 text-yellow-950 rounded-md px-4 hover:bg-yellow-600 text-sm'
                                    onClick={() => handleDelete(item.id)}>
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default App;
