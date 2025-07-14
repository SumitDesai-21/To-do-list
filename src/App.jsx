import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { v4 as uuidv4 } from "uuid";

const getInitialTheme = () => {
  if (typeof window !== "undefined" && window.localStorage) {
    const storedPrefs = window.localStorage.getItem("theme");
    if (typeof storedPrefs === "string") {
      return storedPrefs === "dark";
    }
  }
  return false;
};

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showFinished, setshowFinished] = useState(true);
  const [darkMode, setDarkMode] = useState(getInitialTheme);

  const toggleDarkMode = () => {
    setDarkMode((prev) => {
      const newMode = !prev;
      localStorage.setItem("theme", newMode ? "dark" : "light");
      return newMode;
    });
  };

  useEffect(() => {
    let todoString = localStorage.getItem("todos");
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"));
      setTodos(todos);
    }
  }, []);

  const saveToLS = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const toggleFinished = (e) => {
    setshowFinished(!showFinished);
  };

  const handleEdit = (e, id) => {
    let t = todos.filter((i) => i.id === id);
    setTodo(t[0].todo);
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodos);
    saveToLS();
  };

  const handleDelete = (e, id) => {
    const task = todos.find((item) => item.id === id);
    if (window.confirm(`Are you sure you want to delete this task?\n${task ? task.todo : ''}`)) {
      let newTodos = todos.filter((item) => {
        return item.id !== id;
      });
      setTodos(newTodos);
      saveToLS();
    }
  };

  const handleAdd = () => {
    // Check for duplicate task
    if (todos.some((item) => item.todo.trim().toLowerCase() === todo.trim().toLowerCase())) {
      window.alert('Task already exists!');
      return;
    }
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    setTodo("");
    saveToLS();
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex((item) => {
      return item.id === id;
    });
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    saveToLS();
  };

  return (
    <div className={darkMode ? "dark" : ""}>
      <div
        className={
          `min-h-screen transition-all duration-300 ` +
          (darkMode ? "bg-gray-900 text-black" : "bg-white text-black")
        }
      >
        <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <div className="mx-2 sm:mx-4 md:container md:mx-auto my-5 rounded-xl p-3 sm:p-5 bg-violet-100 min-h-[80vh] w-full max-w-lg md:w-[35%]">
          <h1 className="font-bold text-center text-2xl sm:text-3xl">
            Todo - A Modern App
          </h1>
          <div className="addTodo my-5 flex flex-col gap-4">
            <h2 className="text-xl sm:text-2xl font-bold">Add a Todo</h2>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-0">
              <input
                onChange={handleChange}
                value={todo}
                type="text"
                className="w-full rounded-full px-4 py-2 text-base"
              />
              <button
                onClick={handleAdd}
                disabled={todo.length <= 3}
                className="bg-blue-500 sm:mx-2 mt-2 sm:mt-0 rounded-full hover:bg-blue-700 disabled:bg-blue-500 px-4 py-2 text-sm font-bold text-white"
              >
                Save
              </button>
            </div>
          </div>
          <input
            className="my-4"
            id="show"
            onChange={toggleFinished}
            type="checkbox"
            checked={showFinished}
          />
          <label className="mx-2" htmlFor="show">
            Show Finished
          </label>
          <div className="h-[1px] bg-black opacity-15 w-[90%] mx-auto my-2"></div>
          <h2 className="text-2xl font-bold">Your Todos</h2>
          <div className="todos">
            {todos.length === 0 && (
              <div className="m-5 text-center">No Todos to display</div>
            )}
            {todos.map((item) => {
              return (
                (showFinished || !item.isCompleted) && (
                  <div
                    key={item.id}
                    className={"todo flex flex-col sm:flex-row my-3 justify-between items-start sm:items-center gap-2 sm:gap-0"}
                  >
                    <div className="flex gap-3 sm:gap-5 items-center">
                      <input
                        name={item.id}
                        onChange={handleCheckbox}
                        type="checkbox"
                        checked={item.isCompleted}
                        id=""
                      />
                      <div className={item.isCompleted ? "line-through" : ""}>
                        {item.todo}
                      </div>
                    </div>
                    <div className="buttons flex h-full gap-2">
                      <button
                        onClick={(e) => handleEdit(e, item.id)}
                        className="bg-blue-500 hover:bg-blue-700 p-2 py-1 text-sm font-bold text-white rounded-md"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={(e) => {
                          handleDelete(e, item.id);
                        }}
                        className="bg-blue-500 hover:bg-blue-700 p-2 py-1 text-sm font-bold text-white rounded-md"
                      >
                        <AiFillDelete />
                      </button>
                    </div>
                  </div>
                )
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
