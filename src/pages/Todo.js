import styled from "styled-components";
import { useState, useEffect } from "react";
import axios from "axios";

const Todo = () => {
  const accessToken = localStorage.getItem("accessToken");
  const [todoListData, setTodoListData] = useState([]);
  const [addTodoInput, setAddTodoInput] = useState("");

  const getTodos = () => {
    axios
      .get("https://pre-onboarding-selection-task.shop/todos", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => setTodoListData(res.data));
  };

  const createTodo = () => {
    axios
      .post(
        "https://pre-onboarding-selection-task.shop/todos",
        {
          todo: addTodoInput,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then(() => {
        setAddTodoInput("");
        getTodos();
      });
  };

  useEffect(() => {
    getTodos();
  }, []);
  return (
    <TodoWrapper>
      <input
        value={addTodoInput}
        type={"text"}
        data-testid="new-todo-input"
        placeholder="추가할 taodo를 입력하세요"
        onChange={(e) => {
          setAddTodoInput(e.target.value);
        }}
      />
      <button data-testid="new-todo-add-button" onClick={createTodo}>
        추가
      </button>
    </TodoWrapper>
  );
};

const TodoWrapper = styled.main``;

export default Todo;
