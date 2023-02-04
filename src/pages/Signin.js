import styled from "styled-components";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import SigninForm from "../components/SigninForm";

const Signin = () => {
  const accessToken = localStorage.getItem("accessToken");
  const navigate = useNavigate();

  useEffect(() => {
    if (accessToken) {
      navigate("/todo");
    }
  }, []);
  return (
    <SigninWrapper>
      <SigninForm />
    </SigninWrapper>
  );
};

const SigninWrapper = styled.main``;

export default Signin;
