import styled from "styled-components";
import { useState } from "react";
import axios from "axios";

const TodoList = ({ id, todo, isCompleted, userId, getTodos }) => {
  const accessToken = localStorage.getItem("accessToken");
  const [isOpenUpdate, setIsOpenUpdate] = useState(false);
  const [updateInputText, setUpdateInputText] = useState("");

  const updateTodo = () => {
    // 현재 500error 나는 상황
    axios
      .put(
        `https://pre-onboarding-selection-task.shop/todos/:${id}`,
        {
          todo: updateInputText,
          isCompleted: true,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then(() => {
        getTodos();
      })
      .catch(() => {
        getTodos();
      });
  };

  const deleteTodo = () => {
    axios
      .delete(`https://pre-onboarding-selection-task.shop/todos/:${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then(() => {
        getTodos();
      });
  };

  return (
    <TodoLi>
      <input
        type={"text"}
        defaultValue={todo}
        onChange={(e) => {
          setUpdateInputText(e.target.value);
        }}
        disabled={isOpenUpdate ? false : true}
      />
      <div className="buttonWrapper">
        {isOpenUpdate ? (
          <button
            onClick={() => {
              updateTodo();
              setIsOpenUpdate(false);
            }}
          >
            완료
          </button>
        ) : (
          <button onClick={() => setIsOpenUpdate(true)}>수정</button>
        )}
        <button
          onClick={() => {
            deleteTodo();
          }}
        >
          삭제
        </button>
      </div>
    </TodoLi>
  );
};

const TodoLi = styled.li`
  display: flex;
`;

export default TodoList;
