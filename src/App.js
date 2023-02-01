import "./reset.css";
import { Routes, Route } from "react-router-dom";

import Signup from "./pages/Signin";
import Signin from "./pages/Signup";
import Todo from "./pages/Todo";

function App() {
  console.log(process.env.TODO_API_URL);
  return (
    <>
      <Routes>
        <Route path="signup" element={<Signup />} />
        <Route path="signip" element={<Signin />} />
        <Route path="todo" element={<Todo />} />
      </Routes>
    </>
  );
}

export default App;
