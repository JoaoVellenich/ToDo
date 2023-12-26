import styled from "styled-components";

export const LoginPageContainer = styled.div`
  display: flex;
  height: 100vh;
  margin: 0;
`;

export const InputPartContainer = styled.div`
  width: 40%;
  /* background-color: blue; */
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const InputBoxContainer = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const LoginText = styled.h1``;

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
`;

export const ButtonArea = styled.div`
  margin: 5px;
  width: 100%;
`;

export const ErrorMessage = styled.span`
  margin: 3px;
  color: red;
  text-align: center;
`;
