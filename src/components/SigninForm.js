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
      <input
        type="text"
        placeholder="email"
        onChange={(e) => setEmail(e.target.value)}
        data-testid="email-input"
      />
      <input
        type="password"
        placeholder="password"
        onChange={(e) => setPassword(e.target.value)}
        data-testid="password-input"
      />
      <button
        onClick={handleClickSignin}
        disabled={isButtonDisabled}
        data-testid="signin-button"
      >
        sign in
      </button>
    </FormWrapper>
  );
};

const FormWrapper = styled.section`
  display: flex;
  flex-direction: column;
`;

export default SigninForm;
