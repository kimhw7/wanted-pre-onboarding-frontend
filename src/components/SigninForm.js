import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const SigninForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const handleClickSignin = () => {
    axios
      .post(
        "https://pre-onboarding-selection-task.shop/auth/signin",
        {
          email: email,
          password: password,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      )
      .then((res) => {
        localStorage.setItem("accessToken", res.data.access_token);
        navigate("/todo");
      })
      .catch((err) => {
        alert(`login failed. ${err.response.status} error`);
      });
  };

  // 유효성 검사
  useEffect(() => {
    if (email.includes("@") && password.length >= 8) {
      setIsButtonDisabled(false);
    }
  }, [email, password]);
  return (
    <FormWrapper>
      <label for="email-input">아이디</label>
      <input
        id="email-input"
        type="text"
        placeholder="email"
        onChange={(e) => setEmail(e.target.value)}
        data-testid="email-input"
      />
      <label for="password-input">비밀번호</label>
      <input
        id="password-input"
        type="password"
        placeholder="password"
        onChange={(e) => setPassword(e.target.value)}
        data-testid="password-input"
      />
      <button
        className="signinButton"
        onClick={handleClickSignin}
        disabled={isButtonDisabled}
        data-testid="signin-button"
      >
        sign in
      </button>
      <p className="text">아직 계정이 없으신가요?</p>
      <p className="navigate" onClick={() => navigate("/signup")}>
        회원가입 페이지로 이동하기
      </p>
    </FormWrapper>
  );
};

const FormWrapper = styled.section`
  display: flex;
  flex-direction: column;

  > input {
    margin: 4px 0 24px 0;
    padding: 4px;
  }

  > .signinButton {
    margin-bottom: 24px;
  }

  > p {
    color: gray;
  }
  > .navigate {
    :hover {
      color: blue;
      cursor: pointer;
    }
  }
`;

export default SigninForm;
