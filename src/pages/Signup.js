import styled from "styled-components";

import SignupForm from "../components/SignupForm";

const Signup = () => {
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
