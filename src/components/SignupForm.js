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
      <input
        data-testid="email-input"
        type={"text"}
        placeholder="email"
        onChange={(e) => setEmail(e.target.value)}
      />
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
      <div>hi</div>
    </FormWrapper>
  );
};

const FormWrapper = styled.section`
  display: flex;
  flex-direction: column;

  > .signupButton {
  }
`;

export default SignupForm;
