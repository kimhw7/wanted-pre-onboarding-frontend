import "./reset.css";
import { Routes, Route } from "react-router-dom";

import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import TodoList from "./pages/TodoList";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="signup" element={<Signup />} />
        <Route path="signin" element={<Signin />} />
        <Route path="todo" element={<TodoList />} />
      </Routes>
    </>
  );
}

export default App;
