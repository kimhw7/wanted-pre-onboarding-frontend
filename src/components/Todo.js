import styled from "styled-components";
import { useState } from "react";
import axios from "axios";

const Todo = ({ id, todo, isCompleted, userId, getTodos }) => {
  const accessToken = localStorage.getItem("accessToken");
  const [isOpenUpdate, setIsOpenUpdate] = useState(false);
  const [updateInputText, setUpdateInputText] = useState(todo);
  const [updateIsCompleted, setUpdateIsCompleted] = useState(isCompleted);

  const updateTodo = () => {
    axios
      .put(
        `https://pre-onboarding-selection-task.shop/todos/${id}`,
        {
          todo: updateInputText,
          isCompleted: updateIsCompleted,
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
      .catch((err) => {
        alert(`todo update failed. ${err.response.status} error`);
      });
  };

  const deleteTodo = () => {
    axios
      .delete(`https://pre-onboarding-selection-task.shop/todos/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then(() => {
        getTodos();
      })
      .catch((err) => {
        alert(`todo delete failed. ${err.response.status} error`);
      });
  };

  const cancelEdit = () => {
    setUpdateInputText(todo);
    setIsOpenUpdate(false);
    setUpdateIsCompleted(isCompleted)
  };

  return (
    <TodoLi>
      <input
        type={"checkbox"}
        defaultChecked={isCompleted}
        onClick={() => setUpdateIsCompleted(!updateIsCompleted)}
      />
      <input
        type={"text"}
        value={updateInputText}
        onChange={(e) => setUpdateInputText(e.target.value)}
        disabled={isOpenUpdate ? false : true}
        data-testid="modify-input"
      />
      {isOpenUpdate ? (
        <div className="buttonWrapper">
          <button
            data-testid="submit-button"
            onClick={() => {
              updateTodo();
              setIsOpenUpdate(false);
            }}
          >
            제출
          </button>
          <button data-testid="cancel-button" onClick={() => cancelEdit()}>
            취소
          </button>
        </div>
      ) : (
        <div className="buttonWrapper">
          <button
            data-testid="modify-button"
            onClick={() => setIsOpenUpdate(true)}
          >
            수정
          </button>
          <button data-testid="delete-button" onClick={() => deleteTodo()}>
            삭제
          </button>
        </div>
      )}
    </TodoLi>
  );
};

const TodoLi = styled.li`
  display: flex;
`;

export default Todo;
