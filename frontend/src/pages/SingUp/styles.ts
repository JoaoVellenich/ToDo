import styled from "styled-components";

export const SingUpPageContainer = styled.div`
  height: 100vh;

  margin: 0px;

  display: flex;
`;

export const SingUpContainer = styled.div`
  width: 40%;
  /* background-color: Red; */

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const SingUpBox = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const SingUpText = styled.h1`
  text-align: center;
`;

export const InputArea = styled.div`
  margin: 5px;
  width: 100%;
`;
export const InputField = styled.input`
  box-sizing: border-box;
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 5px;
  font-size: 16px;
  width: 100%;
  text-align: center;
  margin-bottom: 5px;
  margin-top: 5px;
`;

export const ButtonBox = styled.div`
  margin: 5px;
  width: 100%;
`;

export const ErrorMessage = styled.span`
  margin: 3px;
  color: red;
  text-align: center;
`;
