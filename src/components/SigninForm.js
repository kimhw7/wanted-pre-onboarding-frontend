import styled from "styled-components";

const SigninForm = () => {
  return (
    <FormWrapper>
      <input type="text" placeholder="email" />
      <input type="password" placeholder="password" />
      <button>sign in</button>
    </FormWrapper>
  );
};

const FormWrapper = styled.section``;

export default SigninForm;
