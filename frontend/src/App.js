import { useEffect, useState } from "react";
import Footer from "./components/partials/Footer";
import Header from "./components/partials/Header";
import ListTodo from "./components/partials/ListTodo";
import Toolbar from "./components/partials/Toolbar";
import { TodoContext } from "./contexts/TodoContext";
import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_BACKEND_URL;

function App() {
    const [todo, setTodo] = useState([]);
    useEffect(() => {
        const fetchTodos = async () => {
            try {
                const response = await axios.get(`/todo`);
                setTodo((_) => {
                    return response.data;
                });
            } catch (ex) {
                console.log(ex);
            }
        };
        fetchTodos();
    }, []);
    return (
        <div className="App">
            <div className="w-5/6 lg:w-2/3 mx-auto">
                <Header />
                <TodoContext.Provider value={[todo, setTodo]}>
                    <Toolbar />
                    <ListTodo />
                </TodoContext.Provider>
                <Footer />
            </div>
        </div>
    );
}

export default App;
