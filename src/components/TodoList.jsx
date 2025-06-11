import { useState} from "react"
import { FaRegCircleCheck } from "react-icons/fa6"
import { RiDeleteBinLine } from "react-icons/ri";
import "../style.css"

const TodoList = () => {
    const [todos, setTodos] = useState([]);
    const [inputValue, setInputValue] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (inputValue.trim() === "") return;
        setTodos([...todos, {text: inputValue, checked: false, id: todos.length}]);
        setInputValue("");
    };

    const toggleCheckbox = (index) => {
        const updatedTodos = [...todos];
        updatedTodos[index].checked = !updatedTodos[index].checked;
        setTodos(updatedTodos); 
    }

    const checkedCount = todos.filter(todo => todo.checked).length

    const deleteTask = (indexToDelete) => {
        setTodos((prevTodos) => prevTodos.filter((_, index) => index !== indexToDelete));
    };


    return (
        <div className="container">
            <div className="top">
                <h1 className="title">Todo List</h1>
                <p className="desc">Stay organized and get things done</p>
            </div>
            <div className="middle">
                <div className="mupper">
                    <h2 className="utitle">+ Add New Task</h2>
                    <p className="udesc">What would you like to accomplish today?</p>
                </div>
                <div className="mlower">
                    <form onSubmit={handleSubmit}>
                        <input type="text" value={inputValue} name="todoEntry" 
                        placeholder="Enter a new task..." onChange={(e) => setInputValue(e.target.value)}/>
                        <button type="submit">Add</button>
                    </form>
                </div>
            </div>
            <div className="bottom">
                <div className="bupper-container">
                    <div className="bupper">
                        <div className="left">
                            <section className="btitle-sec">
                                <FaRegCircleCheck className="task-list-icon"/>
                                <h2 className="btitle">Your Tasks</h2>
                            </section>
                        </div>
                        <div className="right">
                            <p>{String(checkedCount)} of {String(todos.length)} completed</p>
                        </div>
                    </div>
                    <div className="bupper-bottom">
                        {checkedCount === todos.length && todos.length != 0 ? (<p>🎉 All tasks completed! Great job! </p>) :
                            (<p>{todos.length ? `${todos.length - checkedCount} task${(todos.length - checkedCount) > 1 ? 's' : ''} remaining` : ""}</p>)
                        }
                    </div>
                </div>
                <div className="blower">
                    {todos.length === 0 ? 
                    (<div className="no-tasks">
                        <FaRegCircleCheck className="no-tasks-icon"/>
                        <h1 className="ntitle">No tasks yet</h1>
                        <p className="udesc">Add your first task above to get started!</p>
                    </div>) : 
                    (todos.map((todo, index) => (
                        <div className="task">
                            <label key={todo.id} onClick={() => toggleCheckbox(index)}>
                                <input 
                                type="checkbox"
                                checked={todo.checked}
                                onChange={() => {}} />
                                {todo.text}
                            </label>
                            <RiDeleteBinLine className="delete-btn" onClick={() => deleteTask(index)}/>
                        </div>
                    )))}
                </div>
            </div>
        </div>
    )
}

export default TodoList