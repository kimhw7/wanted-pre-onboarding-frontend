import styled from "styled-components";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import SignupForm from "../components/SignupForm";

const Signup = () => {
  const accessToken = localStorage.getItem("accessToken");
  const navigate = useNavigate();

  useEffect(() => {
    if (accessToken) {
      navigate("/todo");
    }
  }, []);
  return (
    <SignupWrapper>
      <SignupForm />
    </SignupWrapper>
  );
};

const SignupWrapper = styled.main`
  height: 400px;
`;

export default Signup;
