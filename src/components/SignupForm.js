import styled from "styled-components";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignupForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const handleClickSignup = () => {
    axios
      .post(
        "https://pre-onboarding-selection-task.shop/auth/signup",
        {
          email: email,
          password: password,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      )
      .then(() => navigate("/signin"))
      .catch((err) => {
        alert(`회원가입에 실패했습니다. ${err.response.status} error`);
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
        data-testid="email-input"
        type={"text"}
        placeholder="email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <label for="password-input">비밀번호</label>
      <input
        data-testid="password-input"
        type={"password"}
        placeholder="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        className="signupButton"
        data-testid="signup-button"
        onClick={handleClickSignup}
        disabled={isButtonDisabled}
      >
        회원가입
      </button>
      <p className="text">이미 계정이 있으신가요?</p>
      <p className="navigate" onClick={() => navigate("/signin")}>
        로그인 페이지로 이동하기
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

  > .signupButton {
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

export default SignupForm;
