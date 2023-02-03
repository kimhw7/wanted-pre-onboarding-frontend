import styled from "styled-components";
import { useState, useEffect } from "react";
import axios from "axios";

import TodoList from "../components/TodoList";

const Todo = () => {
  const accessToken = localStorage.getItem("accessToken");
  const [todoListData, setTodoListData] = useState(undefined);
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
    <TodoPageWrapper>
      <div className="addTodoWrapper">
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
      </div>
      <ul>
        {todoListData &&
          todoListData.map((el) => (
            <TodoList
              key={el.id}
              id={el.id}
              todo={el.todo}
              isCompleted={el.isCompleted}
              userId={el.userId}
              getTodos={getTodos}
            />
          ))}
      </ul>
    </TodoPageWrapper>
  );
};

const TodoPageWrapper = styled.main``;

export default Todo;
